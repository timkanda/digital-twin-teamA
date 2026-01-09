import { Github, ExternalLink, Zap, Users, Clock, CheckCircle } from "lucide-react"

const featuredProjects = [
  {
    title: "AI Participation Management System",
    description:
      "AI-driven enterprise platform for managing student participation and automating project allocation. Features deterministic and fuzzy matching with human-in-the-loop confirmation, dashboards, and compliance reporting.",
    image: null,
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "OpenAI API"],
    github: "https://github.com/timkanda",
    live: null,
    featured: true,
    metrics: [
      { icon: Clock, value: "20hrs/week", label: "Manual work reduced" },
      { icon: Zap, value: "90%", label: "Admin tasks automated" },
      { icon: Users, value: "85%", label: "Allocation satisfaction" },
      { icon: CheckCircle, value: "99.9%", label: "System uptime" },
    ],
  },
  {
    title: "Digital Twin Portfolio",
    description:
      "AI-powered professional portfolio with RAG architecture using Upstash Vector for semantic search. Enables recruiters to ask natural language questions and receive personalized, metric-rich responses about my experience.",
    image: null,
    tech: ["Next.js 16", "TypeScript", "Upstash Vector", "Claude API", "Tailwind"],
    github: "https://github.com/timkanda",
    live: null,
    featured: true,
  },
  {
    title: "Enterprise Dashboard System",
    description:
      "Full-stack dashboard with role-based access control, CSV data workflows, and AI-assisted automation. Built during industry internship with Agile methodology and CI/CD deployment pipelines.",
    image: null,
    tech: ["Next.js", "NextAuth.js", "PostgreSQL", "AWS", "Vercel"],
    github: "https://github.com/timkanda",
    live: null,
    featured: true,
  },
]

const otherProjects = [
  {
    title: "WordPress Custom Plugins",
    description: "Custom plugins and backend features for high-traffic media website serving the Kenyan diaspora community.",
    tech: ["PHP", "WordPress", "MySQL", "JavaScript"],
    github: "https://github.com/timkanda",
    live: "https://kenyandiasporamedia.com",
  },
  {
    title: "AWS Cloud Bootcamp Projects",
    description: "Full-stack applications deployed on AWS with EC2, S3, RDS, and Amplify during intensive bootcamp.",
    tech: ["AWS", "Node.js", "React", "PostgreSQL"],
    github: "https://github.com/timkanda",
  },
  {
    title: "Authentication System",
    description: "Secure authentication implementation with OAuth, role-based access control, and session management.",
    tech: ["NextAuth.js", "OAuth", "TypeScript", "Prisma"],
    github: "https://github.com/timkanda",
  },
  {
    title: "Data Import Pipeline",
    description: "CSV import workflow with validation, error handling, and human-in-the-loop confirmation for data integrity.",
    tech: ["TypeScript", "PostgreSQL", "Prisma", "React"],
    github: "https://github.com/timkanda",
  },
  {
    title: "AI Matching Engine",
    description: "Intelligent matching system using deterministic and fuzzy algorithms with confidence scoring.",
    tech: ["TypeScript", "OpenAI API", "PostgreSQL"],
    github: "https://github.com/timkanda",
  },
  {
    title: "Reporting Module",
    description: "Compliance reporting and analytics dashboards with data visualization and export capabilities.",
    tech: ["React", "Chart.js", "TypeScript", "REST API"],
    github: "https://github.com/timkanda",
  },
]

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="flex items-center gap-4 text-2xl font-bold text-foreground mb-10">
          Some Things I&apos;ve Built
          <span className="h-px bg-border flex-1 max-w-xs" />
        </h2>

        {/* Featured Projects */}
        <div className="space-y-24 mb-24">
          {featuredProjects.map((project, index) => (
            <div
              key={project.title}
              className={`relative grid md:grid-cols-12 items-center gap-4 ${index % 2 === 1 ? "md:text-right" : ""}`}
            >
              {/* Project Image / Metrics */}
              <div
                className={`md:col-span-7 relative rounded overflow-hidden ${index % 2 === 1 ? "md:col-start-6" : ""}`}
              >
                {project.metrics ? (
                  <div className="bg-card border border-border p-6 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      {project.metrics.map((metric, i) => (
                        <div key={i} className="flex items-center gap-3 p-4 bg-background rounded-lg">
                          <metric.icon className="w-8 h-8 text-primary" />
                          <div>
                            <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                            <p className="text-xs text-muted-foreground">{metric.label}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video bg-card border border-border rounded-lg flex items-center justify-center">
                    <div className="text-center p-8">
                      <svg className="w-16 h-16 text-primary mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      <p className="text-muted-foreground font-mono text-sm">Industry Project</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Project Info */}
              <div
                className={`md:col-span-6 md:absolute md:top-1/2 md:-translate-y-1/2 ${index % 2 === 1 ? "md:left-0 md:text-left" : "md:right-0 md:text-right"} z-10`}
              >
                <p className="text-primary font-mono text-sm mb-2">Featured Project</p>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {project.live ? (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                      {project.title}
                    </a>
                  ) : (
                    project.title
                  )}
                </h3>
                <div className="bg-card p-6 rounded shadow-lg mb-4 border border-border">
                  <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                </div>
                <ul
                  className={`flex flex-wrap gap-3 font-mono text-sm text-muted-foreground mb-4 ${index % 2 === 1 ? "" : "md:justify-end"}`}
                >
                  {project.tech.map((tech) => (
                    <li key={tech} className="bg-secondary px-2 py-1 rounded">{tech}</li>
                  ))}
                </ul>
                <div className={`flex gap-4 ${index % 2 === 1 ? "" : "md:justify-end"}`}>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-primary transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-primary transition-colors"
                      aria-label="Live Demo"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects */}
        <h3 className="text-xl font-bold text-foreground text-center mb-10">Other Noteworthy Projects</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherProjects.map((project) => (
            <div
              key={project.title}
              className="bg-card p-6 rounded hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-6">
                <svg className="w-10 h-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  />
                </svg>
                <div className="flex gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label="Live Demo"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2 hover:text-primary">
                <a href={project.live || project.github} target="_blank" rel="noopener noreferrer">
                  {project.title}
                </a>
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed flex-1">{project.description}</p>
              <ul className="flex flex-wrap gap-2 mt-4 font-mono text-xs text-muted-foreground">
                {project.tech.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
