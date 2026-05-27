import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMysql,
} from "react-icons/si";

const skills = [
  { name: "HTML",        category: "Frontend", Icon: SiHtml5,      hoverBg: "rgba(227, 79, 38, 0.15)"   },
  { name: "CSS",         category: "Frontend", Icon: SiCss,        hoverBg: "rgba(21, 114, 182, 0.15)"  },
  { name: "JavaScript",  category: "Frontend", Icon: SiJavascript, hoverBg: "rgba(247, 223, 30, 0.15)"  },
  { name: "React",       category: "Frontend", Icon: SiReact,      hoverBg: "rgba(97, 218, 251, 0.15)"  },
  { name: "Node.js",     category: "Backend",  Icon: SiNodedotjs,  hoverBg: "rgba(51, 153, 51, 0.15)"   },
  { name: "Express",     category: "Backend",  Icon: SiExpress,    hoverBg: "rgba(150, 150, 150, 0.15)" },
  { name: "MySQL",       category: "Database", Icon: SiMysql,      hoverBg: "rgba(68, 121, 161, 0.15)"  },
];

const toolbox = ["Git", "GitHub", "Figma", "VS Code", "Postman", "Vite", "REST API"];

export default function ToolBoxSkills() {
  return (
    <div className="flex flex-col gap-10">

      {/* Griglia delle skill */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-(--line)">

        {skills.map((skill) => (
          <div
            key={skill.name}
            style={{ "--hover-bg": skill.hoverBg }}
            className="border-b border-r border-(--line) p-6 flex flex-col justify-between gap-10 hover:bg-(--hover-bg) transition-colors duration-200 cursor-default"
          >
            {/* Icona dentro un box con bordo */}
            <div className="border border-(--line) w-12 h-12 flex items-center justify-center">
              <skill.Icon size={22} />
            </div>

            {/* Nome e categoria */}
            <div>
              <p className="font-display text-[20px] md:text-[22px]">
                {skill.name}
              </p>
              <p className="font-mono uppercase tracking-[0.08em] text-[10px] text-(--dim) mt-1">
                {skill.category}
              </p>
            </div>
          </div>
        ))}

      </div>

      {/* Toolbox strip */}
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

    </div>
  );
}
