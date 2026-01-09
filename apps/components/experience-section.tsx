"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const experiences = [
  {
    company: "Employability Advantage × AusBiz",
    title: "Full Stack Developer Intern",
    period: "Apr 2025 — Jul 2025",
    url: "https://ausbiz.com.au",
    points: [
      "Developed full-stack features using Next.js, TypeScript, Prisma, and PostgreSQL for enterprise applications",
      "Implemented authentication and role-based access control using NextAuth.js and OAuth",
      "Built interactive dashboards, reporting modules, and CSV data import/export workflows",
      "Integrated AI services (OpenAI API, AWS Bedrock) for automation and intelligent matching logic",
      "Worked in Agile sprints with industry mentors, participating in code reviews and sprint planning",
      "Deployed applications to Vercel and AWS with CI/CD pipelines",
    ],
  },
  {
    company: "The Kenyan Diaspora Media",
    title: "Website Manager & Web Developer",
    period: "Mar 2022 — Present",
    url: "https://kenyandiasporamedia.com",
    points: [
      "Maintain and extend a high-traffic production WordPress website serving the Kenyan diaspora community",
      "Develop custom plugins and backend features to enhance functionality and user experience",
      "Implement CMS workflows and training for non-technical content editors",
      "Monitor site performance, SEO, and analytics to drive traffic growth",
      "Collaborate with design and marketing teams on feature development and content strategy",
    ],
  },
  {
    company: "Kipdev WP Solutions",
    title: "Web Developer Intern",
    period: "Mar 2022 — Oct 2022",
    url: "#",
    points: [
      "Worked across the full web development lifecycle from requirements to deployment",
      "Implemented user registration, authentication, and profile management features",
      "Integrated WordPress CMS solutions for various client projects",
      "Assisted with debugging, testing, and production deployments",
    ],
  },
]

export function ExperienceSection() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="flex items-center gap-4 text-2xl font-bold text-foreground mb-10">
          Where I&apos;ve Worked
          <span className="h-px bg-border flex-1 max-w-xs" />
        </h2>

        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          {/* Tab list */}
          <div className="flex md:flex-col overflow-x-auto md:overflow-visible border-b md:border-b-0 md:border-l border-border">
            {experiences.map((exp, index) => (
              <button
                key={exp.company}
                onClick={() => setActiveTab(index)}
                className={cn(
                  "px-4 py-3 text-sm font-mono text-left whitespace-nowrap transition-all",
                  "hover:bg-secondary hover:text-primary",
                  "border-b-2 md:border-b-0 md:border-l-2 -mb-px md:mb-0 md:-ml-px",
                  activeTab === index
                    ? "border-primary text-primary bg-secondary"
                    : "border-transparent text-muted-foreground",
                )}
              >
                {exp.company}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="py-2 md:py-0 min-h-[300px]">
            <h3 className="text-xl font-medium text-foreground mb-1">
              {experiences[activeTab].title}{" "}
              <a
                href={experiences[activeTab].url}
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                @ {experiences[activeTab].company}
              </a>
            </h3>
            <p className="text-muted-foreground font-mono text-sm mb-6">{experiences[activeTab].period}</p>
            <ul className="space-y-3">
              {experiences[activeTab].points.map((point, i) => (
                <li key={i} className="flex gap-3 text-muted-foreground leading-relaxed">
                  <span className="text-primary mt-1.5 flex-shrink-0">▹</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
