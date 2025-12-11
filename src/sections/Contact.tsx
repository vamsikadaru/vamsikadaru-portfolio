import { SectionWrapper } from "@/components/section-wrapper"
import { personalDetails } from "@/data/portfolio"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false)
            setSubmitted(true)
        }, 1500)
    }

    return (
        <SectionWrapper id="contact" title="Get in Touch" subtitle="Have a question or want to work together?">
            <div className="mx-auto max-w-xl">
                {submitted ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center p-8 border border-border rounded-lg bg-card"
                    >
                        <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                        <p className="text-muted-foreground">Thanks for reaching out. I'll get back to you soon.</p>
                        <Button variant="outline" className="mt-6" onClick={() => setSubmitted(false)}>
                            Send another message
                        </Button>
                    </motion.div>
                ) : (
                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Name</label>
                            <Input id="name" required placeholder="Your name" className="bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-colors" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
                            <Input id="email" type="email" required placeholder="your.email@example.com" className="bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-colors" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Message</label>
                            <Textarea id="message" required placeholder="How can I help you?" className="min-h-[150px] bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-colors" />
                        </div>
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Sending..." : "Send Message"}
                        </Button>
                    </motion.form>
                )}

                <div className="mt-12 text-center text-muted-foreground">
                    <p>Or email me directly at</p>
                    <a href={`mailto:${personalDetails.socials.email}`} className="text-primary hover:underline font-medium">
                        {personalDetails.socials.email}
                    </a>
                </div>
            </div>
        </SectionWrapper>
    )
}
