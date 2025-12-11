import { ThemeProvider } from "@/components/theme-provider"
import { Layout } from "@/components/layout"
import { Hero } from "@/sections/Hero"
import { About } from "@/sections/About"
import { Skills } from "@/sections/Skills"
import { Experience } from "@/sections/Experience"
import { Projects } from "@/sections/Projects"
import { Publications } from "@/sections/Publications"
import { Contact } from "@/sections/Contact"


import { CustomCursor } from "@/components/ui/custom-cursor"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <CustomCursor />
      <Layout>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Publications />
        <Contact />
      </Layout>
    </ThemeProvider>
  )
}

export default App
