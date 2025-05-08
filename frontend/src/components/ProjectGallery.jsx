import { useState } from "react";
import "./ProjectGallery.css";
import projects from "./projects.json";

const sortedProjects = [...projects].sort((a, b) =>
    new Date(b.date_meta).getTime() - new Date(a.date_meta).getTime()
);

const ProjectGallery = () => {
    const [currentProject, setCurrentProject] = useState(projects[0]);

    return (
        <div class="project-container">
            <div class="project-minicard-container">
                {sortedProjects.map((project, i) => (
                    <ProjectMinicard key={i} project={project} setCurrentProject={setCurrentProject} />
                ))}
            </div>
            <div class="current-project-container">
                <ProjectCard project={currentProject}/>
            </div>
        </div>
    )
}

const ProjectCard = ({project}) => {
    // add link icons for github repo, and website
    return (
        <div class="project-card">
            <a class="project-link" href={project.repo_link} target="_blank">
                <h3 class="name">{project.name}</h3>
                <h4 class="text-stack">{project.tech_stack.reduce(
                    (acc, cur, i) => acc + cur + (i === project.tech_stack.length - 1 ? "" : " | "),
                    ""
                )}</h4>
                <p class="description">{project.description}</p>
                <p class="hover-text">Visit Project Repository {">>>"}</p>
            </a>
        </div>
    )
}

const ProjectMinicard = ({project, setCurrentProject}) => {
    return (
        <div class="project-minicard" onClick={() => setCurrentProject(project)}>
            <h3 class="name">{project.name}</h3>
        </div>
    )
}

export default ProjectGallery;