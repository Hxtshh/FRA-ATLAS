"use client"
import {
  TreePine,
  MapPin,
  Brain,
  Globe,
  Phone,
  Mail,
  Target,
  Eye,
  Cpu,
  Monitor,
  Lightbulb,
  FileText,
  Satellite,
} from "lucide-react"

const About = () => {
  // Data arrays
  const objectives = [
    {
      id: 1,
      title: "Data Digitization",
      description: "Digitize and standardize legacy FRA data, integrate with Atlas and patta holders' shapefiles.",
      bgColor: "bg-blue-50",
      titleColor: "text-blue-800",
      icon: FileText,
    },
    {
      id: 2,
      title: "FRA Atlas Creation",
      description: "Create comprehensive atlas showing potential and granted FRA areas using AI and satellite data.",
      bgColor: "bg-teal-50",
      titleColor: "text-teal-800",
      icon: MapPin,
    },
    {
      id: 3,
      title: "WebGIS Integration",
      description: "Build interactive portal to visualize and manage spatial and socio-economic data.",
      bgColor: "bg-teal-50",
      titleColor: "text-teal-800",
      icon: Monitor,
    },
    {
      id: 4,
      title: "AI Asset Mapping",
      description: "Use Remote Sensing and AI/ML to map capital and social assets of FRA villages.",
      bgColor: "bg-teal-50",
      titleColor: "text-teal-800",
      icon: Satellite,
    },
    {
      id: 5,
      title: "Decision Support System",
      description: "Build DSS to recommend and layer CSS schemes for targeted development.",
      bgColor: "bg-teal-50",
      titleColor: "text-teal-800",
      icon: Lightbulb,
    },
  ]

  const techComponents = [
    {
      id: 1,
      title: "Data Digitization",
      icon: FileText,
      bgColor: "bg-blue-50",
      titleColor: "text-blue-800",
      items: [
        "OCR models for scanned FRA documents",
        "NER for extracting village names, patta holders, coordinates",
        "Automated claim status identification",
      ],
    },
    {
      id: 2,
      title: "AI-based Asset Mapping",
      icon: Cpu,
      bgColor: "bg-teal-50",
      titleColor: "text-teal-800",
      items: [
        "Computer Vision on satellite imagery",
        "ML models (Random Forest, CNN) for land classification",
        "Detection of agricultural land, forest cover, water bodies",
        "Integration with PM Gati Shakti infrastructure data",
      ],
    },
    {
      id: 3,
      title: "WebGIS Integration",
      icon: Globe,
      bgColor: "bg-teal-50",
      titleColor: "text-teal-800",
      items: [
        "Interactive layers (IFR/CR, boundaries, land-use)",
        "Multi-level filters (state/district/village/tribal group)",
        "Real-time FRA progress tracking",
      ],
    },
    {
      id: 4,
      title: "Decision Support System",
      icon: Brain,
      bgColor: "bg-teal-50",
      titleColor: "text-teal-800",
      items: [
        "Rule-based + AI-enhanced DSS engine",
        "Cross-linking with CSS schemes (PM-KISAN, MGNREGA, DAJGUA)",
        "Priority-based intervention recommendations",
      ],
    },
  ]

  const contacts = [
    {
      id: 1,
      state: "Madhya Pradesh",
      email: "dirtadp@mp.gov.in, ctd.tribal@mp.gov.in",
      bgColor: "bg-blue-50",
      titleColor: "text-blue-800",
    },
    {
      id: 2,
      state: "Odisha",
      email: "stscdev@gmail.com, directorstoffice@gmail.com",
      bgColor: "bg-teal-50",
      titleColor: "text-teal-800",
    },
    {
      id: 3,
      state: "Tripura",
      email: "twdtripura@gmail.com, director.twd-tr@gov.in",
      bgColor: "bg-teal-50",
      titleColor: "text-teal-800",
    },
    {
      id: 4,
      state: "Telangana",
      email: "secretary_tw@telangana.gov.in, ctwtgs@gmail.com",
      bgColor: "bg-teal-50",
      titleColor: "text-teal-800",
    },
  ]

  const futureScope = [
    "Real-time satellite monitoring of CFR forests",
    "IoT sensors for soil health and water quality",
    "Mobile-based feedback from patta holders",
  ]

  const workflowSteps = [
    {
      id: 1,
      title: "Ingest & Digitize",
      description:
        "Collect legacy FRA records, scan documents, and use OCR + NER to extract claimant details, village names, and coordinates.",
      icon: FileText,
    },
    {
      id: 2,
      title: "Geo-standardize & Integrate",
      description:
        "Normalize boundaries and shapefiles, reconcile with patta holder polygons, and align with administrative units.",
      icon: MapPin,
    },
    {
      id: 3,
      title: "Satellite Processing",
      description:
        "Process multi-temporal imagery; run CV/ML pipelines to detect land-use features such as agriculture, forest cover, and water bodies.",
      icon: Satellite,
    },
    {
      id: 4,
      title: "AI Asset Mapping",
      description:
        "Combine remote sensing outputs with socio-economic layers to map capital and social assets across FRA villages.",
      icon: Cpu,
    },
    {
      id: 5,
      title: "WebGIS Visualization",
      description:
        "Publish interactive layers (IFR/CR/CFR, land-use, boundaries) with filters and real-time progress dashboards.",
      icon: Globe,
    },
    {
      id: 6,
      title: "Decision Support & Delivery",
      description:
        "Use DSS to layer relevant schemes and produce prioritized recommendations; deliver insights and capture feedback loops.",
      icon: Lightbulb,
    },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-emerald-50 via-sky-50 to-white">
      {/* subtle grid/spotlight background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-40 bg-ornament" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in will-change-transform">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium mb-4 shadow-sm animate-shimmer">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse-glow" />
            Official FRA Initiative
          </div>
          <div className="group flex items-center justify-center mb-6 transition-transform duration-300">
            <TreePine className="h-16 w-16 text-emerald-600 mr-4 group-hover:animate-float" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
              FRA Atlas
            </h1>
          </div>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed opacity-0 animate-slide-up">
            A comprehensive digital platform for Forest Rights Act (FRA) 2006 implementation, empowering forest-dwelling
            communities through technology and data-driven insights.
          </p>
        </div>

        {/* Project Objectives */}
        <section className="mb-16" aria-labelledby="project-objectives">
          <h2
            id="project-objectives"
            className="text-4xl font-bold text-gray-800 mb-8 flex items-center justify-center animate-fade-in"
          >
            <Target className="h-10 w-10 text-emerald-600 mr-4" />
            Project Objectives
          </h2>
          <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8">
            {objectives.map((objective, index) => {
              const IconComponent = objective.icon
              const bg = objective.bgColor === "bg-purple-50" ? "bg-teal-50" : objective.bgColor
              const title = objective.titleColor === "text-purple-800" ? "text-teal-800" : objective.titleColor
              return (
                <div
                  key={objective.id}
                  className={`${bg} p-8 rounded-xl shadow-lg cursor-pointer transform transition-all duration-300 hover:translate-y-[-0.5rem] hover:shadow-2xl animate-slide-up card-hover ring-1 ring-sky-100 hover:ring-sky-300`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center mb-4">
                    <IconComponent className={`h-10 w-10 ${title} mr-3`} />
                    <h3 className={`text-xl font-bold ${title}`}>
                      {index + 1}. {objective.title}
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base">{objective.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* AI & Tech Components */}
        <section className="mb-16" aria-labelledby="ai-tech">
          <h2
            id="ai-tech"
            className="text-4xl font-bold text-gray-800 mb-8 flex items-center justify-center animate-fade-in"
          >
            <Brain className="h-10 w-10 text-teal-600 mr-4" />
            AI & Technology Components
          </h2>
          <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8">
            {techComponents.map((component, index) => {
              const IconComponent = component.icon
              const bg = component.bgColor === "bg-purple-50" ? "bg-teal-50" : component.bgColor
              const title = component.titleColor === "text-purple-800" ? "text-teal-800" : component.titleColor
              return (
                <div
                  key={component.id}
                  className={`${bg} p-8 rounded-xl shadow-lg cursor-pointer transform transition-all duration-300 hover:translate-y-[-0.5rem] hover:shadow-2xl animate-slide-up card-hover ring-1 ring-emerald-100 hover:ring-emerald-300`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center mb-4">
                    <IconComponent className={`h-10 w-10 ${title} mr-3`} />
                    <h3 className={`text-xl font-bold ${title}`}>{component.title}</h3>
                  </div>
                  <ul className="space-y-2" role="list">
                    {component.items.map((item, index) => (
                      <li key={index} className="text-gray-700 flex items-start text-base">
                        <span className="text-gray-500 mr-2" aria-hidden="true">
                          •
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </section>

        {/* Project Workflow */}
        <section className="mb-16" aria-labelledby="project-workflow">
          <h2
            id="project-workflow"
            className="text-4xl font-bold text-gray-800 mb-8 flex items-center justify-center animate-fade-in"
          >
            <Target className="h-10 w-10 text-emerald-600 mr-4" />
            Project Workflow
          </h2>

          <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8">
            {workflowSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <div
                  key={step.id}
                  className="bg-white p-8 rounded-xl shadow-lg ring-1 ring-slate-100 cursor-pointer transform transition-all duration-300 hover:translate-y-[-0.5rem] hover:shadow-2xl animate-slide-up card-hover"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center mb-4">
                    <Icon className="h-10 w-10 text-teal-700 mr-3" />
                    <h3 className="text-xl font-bold text-teal-800">
                      {index + 1}. {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-base">{step.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Contact Information & Future Scope */}
        <section className="mb-16" aria-labelledby="contact-future">
          <h2
            id="contact-future"
            className="text-4xl font-bold text-gray-800 mb-8 flex items-center justify-center animate-fade-in"
          >
            <Phone className="h-10 w-10 text-emerald-600 mr-4" />
            Contact & Future Scope
          </h2>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 animate-slide-up">
                State Tribal Welfare Departments
              </h3>
              <div className="space-y-4">
                {contacts.map((contact, index) => (
                  <div
                    key={contact.id}
                    className={`${contact.bgColor} p-4 rounded-xl shadow-lg cursor-pointer transform transition-all duration-300 hover:translate-y-[-0.25rem] hover:shadow-2xl animate-slide-up ring-1 ring-slate-100 hover:ring-emerald-300`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <h4 className={`font-bold text-lg ${contact.titleColor} mb-2`}>{contact.state}</h4>
                    <div className="flex items-start">
                      <Mail className="h-4 w-4 text-gray-600 mr-2 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700 break-all">{contact.email}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* General Contact */}
              <div className="bg-white p-6 rounded-xl shadow-lg mt-6 transform transition-all duration-300 hover:translate-y-[-0.25rem] hover:shadow-2xl animate-slide-up ring-1 ring-slate-100 hover:ring-sky-300">
                <h4 className="font-bold text-lg text-gray-800 mb-4">General Inquiries</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-sky-600 mr-3" />
                    <span className="text-gray-700">fra-tribal@gov.in</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-emerald-600 mr-3" />
                    <span className="text-gray-700">+011-23340513 / 23340473</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 text-teal-600 mr-3" />
                    <a
                      href="https://tribal.nic.in/FRA.aspx"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-600 hover:text-sky-800 underline"
                    >
                      FRA Guidelines & Clarifications
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Future Scope */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 animate-slide-up">Future Scope</h3>
              <div className="space-y-4">
                {futureScope.map((scope, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-teal-50 to-sky-50 p-6 rounded-xl shadow-lg cursor-pointer transform transition-all duration-300 hover:translate-y-[-0.25rem] hover:shadow-2xl animate-slide-up card-hover ring-1 ring-emerald-100 hover:ring-emerald-300"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start">
                      <Eye className="h-6 w-6 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800 font-medium">{scope}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-gray-200 animate-fade-in">
          <p className="text-gray-600 text-lg hover:translate-y-[-0.1rem] transition-transform duration-300">
            © 2025 FRA Atlas - Empowering Forest Communities Through Technology
          </p>
        </footer>
      </div>

      {/* Motion & visual enhancements */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.35); }
          50% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
        }

        .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
        .animate-slide-up { animation: slideUp 0.6s ease-out forwards; animation-fill-mode: both; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-shimmer {
          background-image: linear-gradient(90deg, rgba(16,185,129,0.12), rgba(2,132,199,0.12), rgba(16,185,129,0.12));
          background-size: 200% 100%;
          animation: shimmer 3s linear infinite;
        }
        .animate-pulse-glow { animation: pulseGlow 2.4s ease-in-out infinite; }

        /* Decorative grid/spotlight background */
        .bg-ornament {
          background:
            radial-gradient(600px 300px at 10% -10%, rgba(16,185,129,0.15), transparent 60%),
            radial-gradient(500px 250px at 90% 10%, rgba(2,132,199,0.15), transparent 60%),
            linear-gradient(to right, rgba(15,23,42,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15,23,42,0.06) 1px, transparent 1px);
          background-size: auto, auto, 40px 40px, 40px 40px;
          background-position: 0 0, 0 0, 0 0, 0 0;
        }

        /* Card hover glow */
        .card-hover {
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .card-hover:hover {
          box-shadow: 0 10px 30px rgba(2, 132, 199, 0.12), 0 2px 10px rgba(16, 185, 129, 0.08);
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in,
          .animate-slide-up,
          .animate-float,
          .animate-shimmer,
          .animate-pulse-glow {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}

export default About