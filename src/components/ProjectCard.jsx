import "./ProjectCard.css"

const ProjectCard = ({name, techStack, description, imageSrc, link}) => {
    return (
        <div class="project-card">
            <a class="project-link" href={link} target="_blank">
                <h3 class="name">{name}</h3>
                <h4 class="text-stack">{techStack}</h4>
                <p class="description">{description}</p>
            </a>
        </div>
    )
}

export default ProjectCard;