import { MotionConfig } from "framer-motion"
import { ThemeProvider } from "@/components/theme-provider"
import { Layout } from "@/components/layout"
import { Hero } from "@/sections/Hero"
import { About } from "@/sections/About"
import { Approach } from "@/sections/Approach"
import { Skills } from "@/sections/Skills"
import { Experience } from "@/sections/Experience"
import { Projects } from "@/sections/Projects"
import { Publications } from "@/sections/Publications"
import { Contact } from "@/sections/Contact"
import { CustomCursor } from "@/components/ui/custom-cursor"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"

function App() {
  useSmoothScroll()

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <MotionConfig reducedMotion="user">
        <CustomCursor />
        <Layout>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Approach />
          <Publications />
          <Contact />
        </Layout>
      </MotionConfig>
    </ThemeProvider>
  )
}

export default App
