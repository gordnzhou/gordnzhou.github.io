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
    "School": "#1f77b4",
    "Mobile": "#28a745",
    "AI": "#f67280",
    "Database": "#a29bfe"
};

const ProjectGallery = () => {
    const [currentProject, setCurrentProject] = useState(sortedProjects[0]);

    return (
        <div class="projects-container">
            <ProjectCard project={currentProject}/>
            <div class="right-container">
                <p class="sort-by-p">sorted by date..</p>
                <div class="project-minicards">
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


const MINI_TAG_LIMIT = 2;

const ProjectMinicard = ({project, currentProject, setCurrentProject}) => {
    return (
        <div class={"project-minicard " + (project.name === currentProject.name && "selected")} onClick={() => setCurrentProject(project)}>
            <div class="top">
                <h3 class="name">{project.name}</h3>
                <h4 class="text-stack">{project.tech_tags.reduce(
                    (acc, cur, i) => (i > MINI_TAG_LIMIT ? acc : (i == MINI_TAG_LIMIT ? acc + "..." : acc + cur + (i === project.tech_tags.length - 1 ? "" : " | "))),
                    ""
                )}</h4>
            </div>
            <div class="tags-container">
                {project.other_tags.map((tag, i) => {
                    return <div style={{backgroundColor: tagBackgrounds[tag]}} class="tag-circle" key={i}/>
                })}
            </div>
        </div>
    )
}

export default ProjectGallery;