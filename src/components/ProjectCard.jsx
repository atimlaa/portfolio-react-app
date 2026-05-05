import React from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";

const parseTechStack = (description) => {
  const match = description.match(/Tech Stack:\s*([\s\S]+?)(?:\n\n|\n$|$)/);
  if (!match) return { tech: [], body: description.trim() };
  const tech = match[1]
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const body = description.replace(/Tech Stack:[\s\S]+/, "").trim();
  return { tech, body };
};

const ProjectCard = ({ title, imageSrc, description, showGithub = true, githubUrl }) => {
  const { tech, body } = parseTechStack(description);
  const lines = body.split("\n").filter((l) => l.trim());
  const subtitle = lines[0] || "";
  const detail = lines.slice(1).join(" ").trim();

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      className="bg-[#112240] border border-white/10 hover:border-red-500/40 rounded-xl overflow-hidden group transition-colors duration-300 flex flex-col h-full"
    >
      {/* Image area */}
      <div className="overflow-hidden h-44 bg-[#0d1f38] flex items-center justify-center p-4 border-b border-white/5">
        <img
          src={imageSrc}
          alt={title}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Card body */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-2">
          <p className="text-red-400 text-xs font-mono tracking-wider uppercase">
            {subtitle}
          </p>
          {showGithub && (
            githubUrl ? (
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                <FaGithub
                  className="text-gray-600 hover:text-red-400 transition-colors duration-300 shrink-0"
                  size={18}
                />
              </a>
            ) : (
              <FaGithub
                className="text-gray-600 group-hover:text-red-400 transition-colors duration-300 shrink-0"
                size={18}
              />
            )
          )}
        </div>

        <h3 className="text-[#ccd6f6] font-bold text-lg leading-snug mb-3">
          {title}
        </h3>

        <p className="text-[#8892b0] text-sm leading-relaxed flex-1 mb-4">
          {detail.length > 160 ? detail.slice(0, 160) + "…" : detail}
        </p>

        {/* Tech stack chips */}
        {tech.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
            {tech.slice(0, 5).map((t) => (
              <span
                key={t}
                className="text-[10px] text-red-400/80 font-mono bg-red-500/10 px-2 py-1 rounded"
              >
                {t.length > 14 ? t.slice(0, 14) + "…" : t}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
