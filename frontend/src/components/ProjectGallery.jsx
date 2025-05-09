import { useState } from "react";
import "./ProjectGallery.css";
import projects from "./projects.json";

const sortedProjects = [...projects].sort((a, b) =>
    new Date(b.date_meta).getTime() - new Date(a.date_meta).getTime()
);

const tagBackgrounds = {
    "Hackathon": "#f2a65a ",
    "Full Stack": "#4d90a0",
    "Frontend": "#b475d8",
    "Emulator": "#d94f4f",
  };

const ProjectGallery = () => {
    const [currentProject, setCurrentProject] = useState(sortedProjects[0]);

    return (
        <div class="projects-container">
            <ProjectCard project={currentProject}/>
            <div class="project-minicards">
                <p>sorted by date..</p>
                {sortedProjects.map((project, i) => (
                    <ProjectMinicard 
                        key={i} 
                        project={project} 
                        currentProject={currentProject}
                        setCurrentProject={setCurrentProject} 
                    />
                ))}
            </div>
        </div>
    )
}

const ProjectCard = ({project}) => {
    return (
        <div class="project-card">
            <div class="top">
                <div class="header">
                    <h3 class="name">{project.name}</h3>
                    <h3 class="timeframe">{project.timeframe}</h3>
                </div>
                <h4 class="text-tags">{project.tech_tags.reduce(
                    (acc, cur, i) => acc + cur + (i === project.tech_tags.length - 1 ? "" : " | "),
                    ""
                )}</h4>
            </div>

            <div class="description">
                {project.description}
            </div>

            <div class="footer">
                <h3>Project links:</h3>
                <div class="project-links">
                    {   project.repo_link && 
                        <a class="icon-link" href={project.repo_link} target="_blank" aria-label="GitHub">
                            <i class="fab fa-github"></i>
                        </a>
                    }
                    {   project.website_link && 
                        <a class="icon-link" href={project.website_link} target="_blank" aria-label="Website">
                            <i class="fa fa-globe"></i>
                        </a>
                    }
                </div>
                <div class="tags-container">
                    {project.other_tags.map((tag, i) => {
                        return <p style={{backgroundColor: tagBackgrounds[tag]}} class="tag" key={i}>{tag}</p>
                    })}
                </div>
            </div>
        </div>
    )
}

const ProjectMinicard = ({project, currentProject, setCurrentProject}) => {
    return (
        <div class={"project-minicard " + (project.name === currentProject.name && "selected")} onClick={() => setCurrentProject(project)}>
            <h3 class="name">{project.name}</h3>
            <h4 class="text-stack">{project.tech_tags.reduce(
                (acc, cur, i) => (i > 3 ? acc : (i == 3 ? acc + "..." : acc + cur + (i === project.tech_tags.length - 1 ? "" : " | "))),
                ""
            )}</h4>
        </div>
    )
}

export default ProjectGallery;