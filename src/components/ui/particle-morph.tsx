import { useEffect, useRef } from "react"
import { onThemeClassChange } from "@/lib/utils"

type Vec3 = [number, number, number]

// Per-shape drift amplitude and brightness, indexed by phase
const DRIFT = [0.11, 0.028, 0.012, 0.02]
const BRIGHT = [0.6, 1, 1.2, 1.3]
const HOLD_FIRST = 5.2
const HOLD = 3.4
const MORPH = 1.7

/** Chaos: random-walk filaments plus a loose halo. */
function chaosShape(n: number) {
    const out = new Float32Array(n * 3)
    const paths: Vec3[][] = []
    for (let k = 0; k < 16; k++) {
        let x = (Math.random() - 0.5) * 2.4
        let y = (Math.random() - 0.5) * 2.4
        let z = (Math.random() - 0.5) * 1.6
        const path: Vec3[] = [[x, y, z]]
        for (let s = 0; s < 9; s++) {
            x = Math.max(-2.5, Math.min(2.5, x + (Math.random() - 0.5) * 1.35))
            y = Math.max(-2.1, Math.min(2.1, y + (Math.random() - 0.5) * 1.35))
            z = Math.max(-1.3, Math.min(1.3, z + (Math.random() - 0.5) * 0.9))
            path.push([x, y, z])
        }
        paths.push(path)
    }
    for (let i = 0; i < n; i++) {
        if (i % 10 < 7) {
            const path = paths[(Math.random() * paths.length) | 0]
            const seg = (Math.random() * (path.length - 1)) | 0
            const t = Math.random()
            const [a, b] = [path[seg], path[seg + 1]]
            for (let d = 0; d < 3; d++) out[i * 3 + d] = a[d] + (b[d] - a[d]) * t + (Math.random() - 0.5) * 0.07
        } else {
            const r = 2.6 * Math.sqrt(Math.random())
            const th = Math.random() * Math.PI * 2
            const ph = Math.acos(2 * Math.random() - 1)
            out[i * 3] = Math.sin(ph) * Math.cos(th) * r
            out[i * 3 + 1] = Math.sin(ph) * Math.sin(th) * r * 0.8
            out[i * 3 + 2] = Math.cos(ph) * r * 0.55
        }
    }
    return out
}

/** Neural net: four layers of nodes with particles streaming along the edges. */
function networkShape(n: number) {
    const out = new Float32Array(n * 3)
    const xs = [-2.1, -0.7, 0.7, 2.1]
    const layers = [4, 6, 6, 3].map((count, li) =>
        Array.from({ length: count }, (_, k): Vec3 => [xs[li], count === 1 ? 0 : (k / (count - 1) - 0.5) * 3.1, 0])
    )
    for (let i = 0; i < n; i++) {
        if (i % 10 < 4) {
            const layer = layers[(Math.random() * layers.length) | 0]
            const node = layer[(Math.random() * layer.length) | 0]
            const r = 0.15 * Math.pow(Math.random(), 0.6)
            const th = Math.random() * Math.PI * 2
            const ph = Math.acos(2 * Math.random() - 1)
            out[i * 3] = node[0] + Math.sin(ph) * Math.cos(th) * r
            out[i * 3 + 1] = node[1] + Math.sin(ph) * Math.sin(th) * r
            out[i * 3 + 2] = node[2] + Math.cos(ph) * r
        } else {
            const li = (Math.random() * (layers.length - 1)) | 0
            const a = layers[li][(Math.random() * layers[li].length) | 0]
            const b = layers[li + 1][(Math.random() * layers[li + 1].length) | 0]
            const t = Math.random()
            out[i * 3] = a[0] + (b[0] - a[0]) * t + (Math.random() - 0.5) * 0.025
            out[i * 3 + 1] = a[1] + (b[1] - a[1]) * t + (Math.random() - 0.5) * 0.025
            out[i * 3 + 2] = (Math.random() - 0.5) * 0.06
        }
    }
    return out
}

/** Rasterise text to an offscreen canvas and scatter particles over its filled pixels. */
function textShape(text: string, fontPx: number, n: number, width: number, fontFamily: string) {
    const W = 900
    const H = 440
    const canvas = document.createElement("canvas")
    canvas.width = W
    canvas.height = H
    const ctx = canvas.getContext("2d")
    const pts: [number, number][] = []
    if (ctx) {
        ctx.fillStyle = "#fff"
        ctx.font = `900 ${fontPx}px ${fontFamily}`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(text, W / 2, H / 2 + fontPx * 0.05)
        const data = ctx.getImageData(0, 0, W, H).data
        for (let y = 0; y < H; y += 3) for (let x = 0; x < W; x += 3) if (data[(y * W + x) * 4 + 3] > 128) pts.push([x, y])
    }
    const out = new Float32Array(n * 3)
    if (!pts.length) return chaosShape(n)
    const k = width / W
    for (let i = 0; i < n; i++) {
        const [x, y] = pts[(Math.random() * pts.length) | 0]
        out[i * 3] = (x - W / 2) * k + (Math.random() - 0.5) * 0.03
        out[i * 3 + 1] = -(y - H / 2) * k + (Math.random() - 0.5) * 0.03
        out[i * 3 + 2] = (Math.random() - 0.5) * 0.26
    }
    return out
}

const vertexShader = /* glsl */ `
  attribute vec3  aColor;
  attribute float aSeed;
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uDrift;
  varying vec3  vColor;
  varying float vAlpha;

  void main() {
    vColor = aColor;
    vec3 p = position;
    float s = aSeed * 6.2831853;
    p.x += sin(uTime * 0.9  + s)       * uDrift;
    p.y += cos(uTime * 0.75 + s * 1.3) * uDrift;
    p.z += sin(uTime * 0.6  + s * 0.7) * uDrift;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float dist = -mv.z;
    vAlpha = clamp(smoothstep(11.0, 1.5, dist), 0.4, 1.0);
    gl_PointSize = uSize * uPixelRatio * (0.6 + aSeed * 0.9) / dist;
    gl_Position  = projectionMatrix * mv;
  }
`

// Dark: additive glow with a hot white core. Light: plain ink dots (additive is invisible on white).
const fragmentShader = /* glsl */ `
  precision highp float;
  uniform float uBright;
  uniform float uLight;
  varying vec3  vColor;
  varying float vAlpha;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float glow = smoothstep(0.5, 0.05, d);
    float core = smoothstep(0.30, 0.0, d);

    if (uLight > 0.5) {
      gl_FragColor = vec4(vColor, glow * vAlpha * min(uBright, 1.0) * 0.9);
    } else {
      vec3 col = (vColor * (glow * 1.15) + vec3(1.0) * core * 0.85) * uBright;
      gl_FragColor = vec4(col, glow * vAlpha);
    }
  }
`

interface ParticleMorphProps {
    className?: string
    isMobile?: boolean
    /** Called with the index of the shape being morphed to. */
    onPhase?: (phase: number) => void
}

/**
 * WebGL particle cloud that morphs chaos -> neural net -> </> -> HIRE ME on a loop.
 * Particles swirl around the cursor and burst on click. three.js is loaded lazily.
 */
export function ParticleMorph({ className, isMobile = false, onPhase }: ParticleMorphProps) {
    const hostRef = useRef<HTMLDivElement>(null)
    const onPhaseRef = useRef(onPhase)
    useEffect(() => {
        onPhaseRef.current = onPhase
    }, [onPhase])

    useEffect(() => {
        const host = hostRef.current
        if (!host) return
        let cleanup: (() => void) | undefined
        let cancelled = false

        Promise.all([import("three"), document.fonts.ready]).then(([THREE]) => {
            if (cancelled) return
            const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
            let w = host.clientWidth
            let h = host.clientHeight

            const scene = new THREE.Scene()
            const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100)
            camera.position.z = 5.4
            const pixelRatio = Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2)
            const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true })
            renderer.setPixelRatio(pixelRatio)
            renderer.setSize(w, h)
            renderer.setClearColor(0, 0)
            host.appendChild(renderer.domElement)

            const N = isMobile ? 4200 : 9000
            const font = getComputedStyle(document.body).fontFamily
            const shapes = [chaosShape(N), networkShape(N), textShape("</>", 300, N, 5.4, font), textShape("HIRE ME", 190, N, 6.2, font)]

            const base = new Float32Array(shapes[0]) // current morph target blend
            const offset = new Float32Array(N * 3) // displacement from cursor / clicks
            const vel = new Float32Array(N * 3)
            const pos = new Float32Array(N * 3)
            // Start scattered far out so the first frame implodes into shape
            for (let i = 0; i < N; i++) {
                const th = Math.random() * Math.PI * 2
                const ph = Math.acos(2 * Math.random() - 1)
                const r = 6 + Math.random() * 9
                offset[i * 3] = Math.sin(ph) * Math.cos(th) * r
                offset[i * 3 + 1] = Math.sin(ph) * Math.sin(th) * r
                offset[i * 3 + 2] = Math.cos(ph) * r * 0.6
            }

            // Colour mix: mostly primary, some foreground, a few azure / violet
            const pick = new Float32Array(N)
            const shade = new Float32Array(N)
            const seeds = new Float32Array(N)
            for (let i = 0; i < N; i++) {
                pick[i] = Math.random()
                shade[i] = 0.6 + Math.random() * 0.4
                seeds[i] = Math.random()
            }
            const colors = new Float32Array(N * 3)
            const colorAttr = new THREE.BufferAttribute(colors, 3)

            const geometry = new THREE.BufferGeometry()
            const posAttr = new THREE.BufferAttribute(pos, 3)
            posAttr.setUsage(THREE.DynamicDrawUsage)
            geometry.setAttribute("position", posAttr)
            geometry.setAttribute("aColor", colorAttr)
            geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1))

            const material = new THREE.ShaderMaterial({
                uniforms: {
                    uTime: { value: 0 },
                    uSize: { value: isMobile ? 24 : 20 },
                    uPixelRatio: { value: pixelRatio },
                    uDrift: { value: DRIFT[0] },
                    uBright: { value: BRIGHT[0] },
                    uLight: { value: 0 },
                },
                vertexShader,
                fragmentShader,
                transparent: true,
                depthWrite: false,
                depthTest: false,
            })

            const applyTheme = () => {
                const styles = getComputedStyle(document.documentElement)
                const read = (v: string) => new THREE.Color().setStyle(`hsl(${styles.getPropertyValue(v).trim().split(" ").join(", ")})`)
                const light = !document.documentElement.classList.contains("dark")
                const primary = read("--primary")
                const fg = light ? read("--foreground") : new THREE.Color(1, 1, 1)
                const azure = read("--accent-2")
                const violet = read("--accent-3")
                for (let i = 0; i < N; i++) {
                    const p = pick[i]
                    const c = p < 0.55 ? primary.clone().multiplyScalar(light ? 1 : shade[i]) : p < 0.78 ? fg : p < 0.92 ? azure : violet
                    colors[i * 3] = c.r
                    colors[i * 3 + 1] = c.g
                    colors[i * 3 + 2] = c.b
                }
                colorAttr.needsUpdate = true
                material.uniforms.uLight.value = light ? 1 : 0
                material.blending = light ? THREE.NormalBlending : THREE.AdditiveBlending
                material.needsUpdate = true
            }
            applyTheme()

            const points = new THREE.Points(geometry, material)
            const group = new THREE.Group()
            group.add(points)
            scene.add(group)

            // Wide screens: cloud sits right of the headline. Portrait: shrink it to the
            // viewport width and lift it into the empty space above the headline.
            const place = () => {
                const wide = w / h > 1.2 && !isMobile
                const visibleH = 2 * camera.position.z * Math.tan((camera.fov * Math.PI) / 360)
                const scale = wide ? 1 : Math.min(1, (visibleH * (w / h)) / 6.6)
                group.scale.setScalar(scale)
                group.position.x = wide ? 1.5 : 0
                group.position.y = wide ? 0.3 : visibleH * 0.25
            }
            place()

            // Pointer in NDC, projected onto the z=0 plane in group space
            let nx = 10
            let ny = 10
            let tiltX = 0
            let tiltY = 0
            const cursor = new THREE.Vector3(999, 999, 0)
            const ray = new THREE.Vector3()
            const toNdc = (e: PointerEvent) => {
                const rect = host.getBoundingClientRect()
                nx = ((e.clientX - rect.left) / rect.width) * 2 - 1
                ny = -((e.clientY - rect.top) / rect.height) * 2 + 1
            }
            const projectCursor = () => {
                if (nx > 5) return
                ray.set(nx, ny, 0.5).unproject(camera).sub(camera.position).normalize()
                if (Math.abs(ray.z) < 1e-4) return
                const t = -camera.position.z / ray.z
                cursor.copy(camera.position).addScaledVector(ray, t).sub(group.position).divideScalar(group.scale.x)
            }

            const section = host.closest("section") ?? host
            const onMove = (e: PointerEvent) => {
                toNdc(e)
                tiltX = -ny * 0.11
                tiltY = nx * 0.15
            }
            const onLeave = () => {
                nx = ny = 10
                tiltX = tiltY = 0
                cursor.set(999, 999, 0)
            }
            const onDown = (e: PointerEvent) => {
                // Let buttons and links behave normally
                if ((e.target as HTMLElement).closest("a, button")) return
                toNdc(e)
                projectCursor()
                for (let i = 0; i < N; i++) {
                    const dx = base[i * 3] + offset[i * 3] - cursor.x
                    const dy = base[i * 3 + 1] + offset[i * 3 + 1] - cursor.y
                    const dz = base[i * 3 + 2] + offset[i * 3 + 2] - cursor.z
                    const d = Math.sqrt(dx * dx + dy * dy + dz * dz) + 1e-4
                    if (d < 2.6) {
                        const f = (26 * (1 - d / 2.6)) / d
                        vel[i * 3] += dx * f
                        vel[i * 3 + 1] += dy * f
                        vel[i * 3 + 2] += dz * f * 0.5
                    }
                }
            }
            section.addEventListener("pointermove", onMove as EventListener, { passive: true })
            section.addEventListener("pointerleave", onLeave)
            section.addEventListener("pointerdown", onDown as EventListener, { passive: true })

            const onResize = () => {
                w = host.clientWidth
                h = host.clientHeight
                renderer.setSize(w, h)
                camera.aspect = w / h
                camera.updateProjectionMatrix()
                place()
            }
            window.addEventListener("resize", onResize)
            const stopThemeWatch = onThemeClassChange(() => {
                applyTheme()
                if (reduced) renderer.render(scene, camera)
            })

            let state: "hold" | "morph" = "hold"
            let phaseT = 0
            let from = 0
            let to = 1
            let first = true
            let last = -1
            let clock = 0
            let raf = 0
            let visible = true

            const frame = (now: number) => {
                if (last < 0) last = now
                const dt = Math.min((now - last) / 1000, 0.05)
                last = now
                clock += dt
                phaseT += dt
                material.uniforms.uTime.value = clock

                if (state === "hold") {
                    material.uniforms.uDrift.value = DRIFT[from]
                    material.uniforms.uBright.value = BRIGHT[from]
                    if (!reduced && phaseT >= (first ? HOLD_FIRST : HOLD)) {
                        state = "morph"
                        phaseT = 0
                        first = false
                        onPhaseRef.current?.(to)
                    }
                } else {
                    const p = Math.min(phaseT / MORPH, 1)
                    const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2
                    const a = shapes[from]
                    const b = shapes[to]
                    for (let i = 0; i < base.length; i++) base[i] = a[i] + (b[i] - a[i]) * e
                    material.uniforms.uDrift.value = DRIFT[from] + (DRIFT[to] - DRIFT[from]) * e
                    material.uniforms.uBright.value = BRIGHT[from] + (BRIGHT[to] - BRIGHT[from]) * e
                    if (p >= 1) {
                        state = "hold"
                        phaseT = 0
                        from = to
                        to = (to + 1) % shapes.length
                    }
                }

                // Cursor swirl + spring back to shape
                projectCursor()
                const damp = Math.exp(-5.5 * dt)
                const active = nx <= 5
                for (let i = 0; i < N; i++) {
                    const k = i * 3
                    if (active) {
                        const dx = base[k] + offset[k] - cursor.x
                        const dy = base[k + 1] + offset[k + 1] - cursor.y
                        const d2 = dx * dx + dy * dy
                        if (d2 < 1.35 * 1.35) {
                            const d = Math.sqrt(d2) + 1e-4
                            const fall = 1 - d / 1.35
                            const f = (34 * fall * fall) / d
                            vel[k] += (dx * f - dy * f * 0.55) * dt
                            vel[k + 1] += (dy * f + dx * f * 0.55) * dt
                            vel[k + 2] += (Math.random() - 0.5) * f * 0.2 * dt
                        }
                    }
                    for (let d = 0; d < 3; d++) {
                        vel[k + d] = (vel[k + d] - 16 * offset[k + d] * dt) * damp
                        offset[k + d] += vel[k + d] * dt
                        pos[k + d] = base[k + d] + offset[k + d]
                    }
                }
                posAttr.needsUpdate = true

                points.rotation.y = 0.12 * Math.sin(clock * 0.24)
                points.rotation.x = 0.045 * Math.sin(clock * 0.18)
                group.rotation.x += (tiltX - group.rotation.x) * 0.045
                group.rotation.y += (tiltY - group.rotation.y) * 0.045
                renderer.render(scene, camera)

                if (visible) raf = requestAnimationFrame(frame)
            }

            if (reduced) {
                // Settle the opening shape without the implosion, then hold still
                offset.fill(0)
                visible = false
                frame(performance.now())
            } else {
                raf = requestAnimationFrame(frame)
            }

            // Pause the loop while the hero is off screen
            const io = new IntersectionObserver(([entry]) => {
                if (reduced) return
                visible = entry.isIntersecting
                cancelAnimationFrame(raf)
                last = -1
                if (visible) raf = requestAnimationFrame(frame)
            })
            io.observe(host)

            cleanup = () => {
                cancelAnimationFrame(raf)
                io.disconnect()
                stopThemeWatch()
                window.removeEventListener("resize", onResize)
                section.removeEventListener("pointermove", onMove as EventListener)
                section.removeEventListener("pointerleave", onLeave)
                section.removeEventListener("pointerdown", onDown as EventListener)
                geometry.dispose()
                material.dispose()
                renderer.dispose()
                renderer.domElement.remove()
            }
        })

        return () => {
            cancelled = true
            cleanup?.()
        }
    }, [isMobile])

    return <div ref={hostRef} aria-hidden className={className} />
}
