import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiBootstrap,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiPhp,
  SiLaravel,
} from "react-icons/si";
import {
  TbBrandAdobePhotoshop,
  TbBrandAdobeIllustrator,
  TbBrandAdobeIndesign,
} from "react-icons/tb";

const skills = [
  { name: "HTML",        category: "Frontend", Icon: SiHtml5,      hoverBg: "rgba(227, 79, 38, 0.15)"   },
  { name: "CSS",         category: "Frontend", Icon: SiCss,        hoverBg: "rgba(21, 114, 182, 0.15)"  },
  { name: "JavaScript",  category: "Frontend", Icon: SiJavascript, hoverBg: "rgba(247, 223, 30, 0.15)"  },
  { name: "React",       category: "Frontend", Icon: SiReact,      hoverBg: "rgba(97, 218, 251, 0.15)"  },
  { name: "Bootstrap",   category: "Frontend", Icon: SiBootstrap,  hoverBg: "rgba(121, 82, 179, 0.15)"  },
  { name: "Node.js",     category: "Backend",  Icon: SiNodedotjs,  hoverBg: "rgba(51, 153, 51, 0.15)"   },
  { name: "Express",     category: "Backend",  Icon: SiExpress,    hoverBg: "rgba(150, 150, 150, 0.15)" },
  { name: "PHP",         category: "Backend",  Icon: SiPhp,        hoverBg: "rgba(119, 123, 179, 0.15)" },
  { name: "Laravel",     category: "Backend",  Icon: SiLaravel,    hoverBg: "rgba(255, 45, 32, 0.15)", wide: true },
  { name: "MySQL",       category: "Database", Icon: SiMysql,      hoverBg: "rgba(68, 121, 161, 0.15)", featured: true },
];

const toolbox = ["Git", "GitHub", "npm", "VS Code", "Postman", "Vite", "REST API"];

const designTools = [
  { name: "Adobe Photoshop",   Icon: TbBrandAdobePhotoshop },
  { name: "Adobe Illustrator", Icon: TbBrandAdobeIllustrator },
  { name: "Adobe InDesign",    Icon: TbBrandAdobeIndesign },
];

export default function ToolBoxSkills() {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-(--line)">
        {skills.map((skill) =>
          skill.featured ? (
            <div
              key={skill.name}
              style={{ "--hover-bg": skill.hoverBg }}
              className="md:col-span-2 flex flex-col justify-between md:flex-row md:justify-start md:items-center gap-10 md:gap-6 border-b border-r border-(--line) border-l-2 border-l-(--mustard) p-6 hover:bg-(--hover-bg) transition-colors duration-200 cursor-default"
            >
              <div className="border border-(--mustard) w-12 h-12 flex items-center justify-center shrink-0">
                <skill.Icon size={22} />
              </div>
              <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3">
                <p className="font-display text-[20px] md:text-[22px]">
                  {skill.name}
                </p>
                <p className="font-mono uppercase tracking-[0.08em] text-[10px] text-(--dim)">
                  {skill.category}
                </p>
              </div>
            </div>
          ) : (
            <div
              key={skill.name}
              style={{ "--hover-bg": skill.hoverBg }}
              className={`border-b border-r border-(--line) p-6 flex flex-col justify-between gap-10 hover:bg-(--hover-bg) transition-colors duration-200 cursor-default${
                skill.wide ? " md:col-span-2" : ""
              }`}
            >
              <div className="border border-(--line) w-12 h-12 flex items-center justify-center">
                <skill.Icon size={22} />
              </div>

              <div>
                <p className="font-display text-[20px] md:text-[22px]">
                  {skill.name}
                </p>
                <p className="font-mono uppercase tracking-[0.08em] text-[10px] text-(--dim) mt-1">
                  {skill.category}
                </p>
              </div>
            </div>
          )
        )}
      </div>

      <div className="flex flex-col gap-3">
        <span className="font-mono uppercase tracking-[0.08em] text-[11px] text-(--dim)">
          — Toolbox
        </span>
        <div className="flex flex-wrap gap-x-8 gap-y-2">
          {toolbox.map((tool) => (
            <span key={tool} className="font-body text-[15px] text-(--fg)">
              {tool}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <span className="font-mono uppercase tracking-[0.08em] text-[11px] text-(--dim)">
          — Design
        </span>
        <div className="flex flex-wrap gap-x-8 gap-y-2">
          {designTools.map(({ name, Icon }) => (
            <span
              key={name}
              className="inline-flex items-center gap-2 font-body text-[15px] text-(--fg)"
            >
              <Icon size={16} className="text-(--dim)" />
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
