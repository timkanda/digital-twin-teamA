import { Github, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-8">
      <div className="mx-auto max-w-6xl px-6">
        {/* Mobile social links */}
        <div className="flex justify-center gap-6 mb-6 lg:hidden">
          <a
            href="https://github.com/timkanda"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/timothy-kanda-aaa190b4"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>

        <div className="text-center">
          <p className="text-muted-foreground font-mono text-xs">Built with Next.js &amp; Tailwind CSS</p>
          <p className="text-muted-foreground font-mono text-xs mt-1">
            Designed &amp; Developed by{" "}
            <a
              href="https://github.com/timkanda"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Timothy Kanda
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
