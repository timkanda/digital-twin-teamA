export function ContactSection() {
  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-primary font-mono text-sm mb-4">What&apos;s Next?</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Get In Touch</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            I&apos;m actively seeking <span className="text-primary">Graduate Software Developer</span> or{" "}
            <span className="text-primary">Junior Full-Stack Developer</span> opportunities. Whether you have a role that might be a good fit,
            want to discuss a project, or just want to connect — I&apos;d love to hear from you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="mailto:tmthkanda@gmail.com"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-mono text-sm rounded hover:bg-primary/90 transition-colors"
            >
              Say Hello
            </a>
            <a
              href="https://www.linkedin.com/in/timothy-kanda-aaa190b4"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 border border-primary text-primary font-mono text-sm rounded hover:bg-primary/10 transition-colors"
            >
              Connect on LinkedIn
            </a>
          </div>
          <p className="text-muted-foreground text-sm font-mono">
            📍 Sydney, NSW, Australia
          </p>
        </div>
      </div>
    </section>
  )
}
