const skills = [
  "TypeScript",
  "React",
  "Next.js (App Router, SSR)",
  "Node.js",
  "PostgreSQL",
  "Prisma ORM",
  "AWS (EC2, S3, RDS)",
  "Tailwind CSS",
  "REST APIs",
  "OpenAI API",
  "Git & GitHub",
  "CI/CD Pipelines",
]

export function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="flex items-center gap-4 text-2xl font-bold text-foreground mb-10">
          About Me
          <span className="h-px bg-border flex-1 max-w-xs" />
        </h2>

        <div className="max-w-2xl space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Hello! I&apos;m Timothy, a Graduate Software Developer with a{" "}
            <span className="text-primary">Master of Information Technology</span> (Software Development specialisation) from{" "}
            <a href="https://www.swinburne.edu.au/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
              Swinburne University of Technology
            </a>.
          </p>
          <p>
            I have hands-on experience building full-stack, cloud-deployed applications across the entire SDLC. I&apos;ve worked on
            data-intensive systems, automation workflows, and AI-assisted applications. My focus is on{" "}
            <span className="text-primary">clean architecture, reliability, and real-world impact</span>.
          </p>
          <p>
            Recently, I completed a Full Stack Developer Internship with{" "}
            <a href="#experience" className="text-primary hover:underline">
              Employability Advantage × AusBiz Consulting
            </a>
            , where I built enterprise-level features using Next.js, TypeScript, and PostgreSQL.
          </p>
          <p>Here are some technologies I&apos;ve been working with:</p>
          <ul className="grid grid-cols-2 gap-2 mt-4">
            {skills.map((skill) => (
              <li key={skill} className="flex items-center gap-2 font-mono text-sm">
                <span className="text-primary">▹</span>
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
