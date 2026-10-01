import { useEffect, useState, type FormEvent } from "react"
import { Check, Copy, Github, Linkedin, Loader2, Mail, Send } from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionLabel } from "@/components/ui/section-label"
import { Reveal } from "@/components/ui/reveal"
import { MaskLines } from "@/components/ui/mask-lines"
import { personalDetails } from "@/data/portfolio"

const fields = [
    { id: "name", label: "Name", type: "text", placeholder: "Your name", autoComplete: "name" },
    { id: "email", label: "Email", type: "email", placeholder: "your@email.com", autoComplete: "email" },
    { id: "subject", label: "Subject", type: "text", placeholder: "What's this about?", autoComplete: "off" },
] as const

// Public Web3Forms access key (designed to ship in client code). Without it the
// form falls back to opening the visitor's mail app.
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined

type Status = "idle" | "sending" | "sent" | "error" | "mailto"

const statusText: Record<Exclude<Status, "error">, string> = {
    idle: "",
    sending: "Sending…",
    sent: "Thanks — your message is on its way. I'll reply soon.",
    mailto: "Your email app should open with the message ready to send.",
}

export function Contact() {
    const { email, github, linkedin } = personalDetails.socials
    const [status, setStatus] = useState<Status>("idle")
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        if (!copied) return
        const t = setTimeout(() => setCopied(false), 1800)
        return () => clearTimeout(t)
    }, [copied])

    const copyEmail = () => {
        navigator.clipboard?.writeText(email).then(() => setCopied(true), () => {})
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const data = new FormData(form)
        const subject = String(data.get("subject") || "Hello from your portfolio")

        // No key configured: compose the message in the visitor's mail client instead
        if (!WEB3FORMS_KEY) {
            const body = `${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`
            window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
            setStatus("mailto")
            return
        }

        setStatus("sending")
        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({
                    access_key: WEB3FORMS_KEY,
                    subject: `Portfolio: ${subject}`,
                    from_name: `${data.get("name")} via portfolio`,
                    name: data.get("name"),
                    email: data.get("email"), // Web3Forms sets this as the reply-to
                    message: data.get("message"),
                    botcheck: data.get("botcheck"),
                }),
            })
            const json = await res.json()
            if (!res.ok || !json.success) throw new Error(json.message)
            form.reset()
            setStatus("sent")
        } catch {
            setStatus("error")
        }
    }

    return (
        <section id="contact" className="mx-auto grid max-w-[1440px] border-t border-border md:grid-cols-[38%_1fr]">
            <div className="border-border px-6 py-24 md:border-r md:px-20 md:py-36">
                <SectionLabel index="07" label="Contact" />
                <MaskLines
                    className="display mt-10 text-6xl md:text-7xl"
                    lines={["Let's build", "something", <span className="text-gradient">great.</span>]}
                />

                <dl className="mt-14 space-y-7">
                    <div>
                        <dt className="eyebrow text-[9px] font-semibold">Email</dt>
                        <dd className="mt-2 flex items-center gap-3">
                            <a href={`mailto:${email}`} className="text-[15px] text-muted-foreground transition-colors hover:text-primary">
                                {email}
                            </a>
                            <button
                                type="button"
                                onClick={copyEmail}
                                aria-label={copied ? "Email copied" : "Copy email address"}
                                className="grid h-8 w-8 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                            >
                                {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
                            </button>
                            <span role="status" className="eyebrow text-[9px] text-primary">
                                {copied && "Copied"}
                            </span>
                        </dd>
                    </div>
                    <div>
                        <dt className="eyebrow text-[9px] font-semibold">Location</dt>
                        <dd className="mt-2 text-[15px] text-muted-foreground">{personalDetails.location}, USA</dd>
                    </div>
                    <div>
                        <dt className="eyebrow text-[9px] font-semibold">Social</dt>
                        <dd className="mt-3 flex gap-5">
                            <a href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition-colors hover:text-primary">
                                <Github className="h-5 w-5" />
                            </a>
                            <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-primary">
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a href={`mailto:${email}`} aria-label="Email" className="transition-colors hover:text-primary">
                                <Mail className="h-5 w-5" />
                            </a>
                        </dd>
                    </div>
                </dl>
            </div>

            <div className="flex items-center px-6 pb-24 md:px-20 md:py-36">
                <Reveal className="w-full max-w-xl">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Honeypot: hidden from people; bots fill it and Web3Forms drops the submission */}
                        <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
                        {fields.map((f) => (
                            <div key={f.id}>
                                <label htmlFor={f.id} className="eyebrow text-[9px] font-semibold">
                                    {f.label}
                                </label>
                                <input
                                    id={f.id}
                                    name={f.id}
                                    type={f.type}
                                    required={f.id !== "subject"}
                                    autoComplete={f.autoComplete}
                                    placeholder={f.placeholder}
                                    className="mt-3 w-full border-b border-border bg-transparent pb-3 text-[15px] outline-none transition-colors placeholder:text-muted-foreground/40 focus:border-primary"
                                />
                            </div>
                        ))}
                        <div>
                            <label htmlFor="message" className="eyebrow text-[9px] font-semibold">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={5}
                                placeholder="Tell me about your project or opportunity..."
                                className="mt-3 w-full resize-none border-b border-border bg-transparent pb-3 text-[15px] outline-none transition-colors placeholder:text-muted-foreground/40 focus:border-primary"
                            />
                        </div>

                        <div className="flex flex-wrap items-center gap-5 pt-2">
                            <button
                                type="submit"
                                disabled={status === "sending"}
                                className="eyebrow group inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-4 font-bold text-background transition-transform hover:scale-[1.03] disabled:pointer-events-none disabled:opacity-60"
                            >
                                {status === "sending" ? "Sending" : "Send message"}
                                {status === "sending" ? (
                                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                                ) : (
                                    <Send className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                                )}
                            </button>
                            <p role="status" className={cn("text-sm text-muted-foreground", status === "sent" && "text-primary", status === "error" && "text-red-500")}>
                                {status === "error" ? (
                                    <>
                                        Something went wrong. Please email me at{" "}
                                        <a href={`mailto:${email}`} className="underline underline-offset-4">
                                            {email}
                                        </a>
                                        .
                                    </>
                                ) : (
                                    statusText[status]
                                )}
                            </p>
                        </div>
                    </form>
                </Reveal>
            </div>
        </section>
    )
}
