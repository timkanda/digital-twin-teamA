import { Github, Linkedin, Mail } from "lucide-react"

const socialLinks = [
  { icon: Github, href: "https://github.com/timkanda", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/timothy-kanda-aaa190b4", label: "LinkedIn" },
  { icon: Mail, href: "mailto:tmthkanda@gmail.com", label: "Email" },
]

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center relative">
      {/* Social links - fixed left sidebar */}
      <div className="fixed left-6 bottom-0 hidden lg:flex flex-col items-center gap-6 after:content-[''] after:w-px after:h-24 after:bg-muted-foreground/50">
        {socialLinks.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary hover:-translate-y-1 transition-all"
            aria-label={label}
          >
            <Icon className="w-5 h-5" />
          </a>
        ))}
      </div>

      {/* Email - fixed right sidebar */}
      <div className="fixed right-6 bottom-0 hidden lg:flex flex-col items-center gap-6 after:content-[''] after:w-px after:h-24 after:bg-muted-foreground/50">
        <a
          href="mailto:tmthkanda@gmail.com"
          className="text-muted-foreground hover:text-primary transition-colors text-sm font-mono tracking-widest"
          style={{ writingMode: "vertical-rl" }}
        >
          tmthkanda@gmail.com
        </a>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-3xl">
          <p className="text-primary font-mono text-sm mb-5 animate-fade-in">Hi, my name is</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 text-balance animate-slide-up">
            Timothy Kanda.
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-muted-foreground mb-6 text-balance animate-slide-up delay-100">
            I build full-stack applications.
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mb-12 leading-relaxed animate-fade-in delay-200">
            I&apos;m a Graduate Software Developer with a Master&apos;s in IT, specializing in building data-intensive, cloud-deployed applications. Currently based in{" "}
            <span className="text-primary">Sydney, Australia</span> and open to new opportunities.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in delay-300">
            <a
              href="#projects"
              className="inline-flex items-center px-7 py-4 border border-primary text-primary font-mono text-sm rounded hover:bg-primary/10 transition-colors"
            >
              View My Projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center px-7 py-4 bg-primary text-primary-foreground font-mono text-sm rounded hover:bg-primary/90 transition-colors"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
