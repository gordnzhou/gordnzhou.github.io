import "./ProjectCard.css"

const ProjectGallery = () => {
    {/* make it kind of like a spotify playlist; current project on the left, 
    a scrollable panel list of projects with name and icon on the right */}
    return (
        <div id="project-list">
            <ProjectCard
                name="Memora"
                techStack="React, Python, FastAPI, MongoDB"
                link="https://github.com/andrew-fenton/memora"
                description="A voice-powered journaling app built with a RAG retrieval system to gain insights from your journal entries"
            />
            <ProjectCard
                name="MelonGB"
                techStack="Rust, SDL2, HTMl/CSS, Javascript"
                link="https://github.com/gordnzhou/melon-gb"
                description="MelonGB is a Gameboy (DMG) and Gameboy Color (CGB) Emulator written in Rust. Visit this project's repository for a link to the emulator demo!"
            />
            <ProjectCard
                name="Moodplay"
                techStack="React, Tensorflow, Vercel, Spotify API"
                link="https://github.com/gordnzhou/mood-play"
                description="An interactive web app made using React that plays music, 
                which changes depending on your mood. Mood detection is done using a custom-trained emotion detection model that's served through a backend hosted on Vercel. 
                The site offers an easy-to-use layout, along with a clean and minimalist look designed to keep users engaged."
            />
            <ProjectCard
                name="ImNES"
                techStack="Rust, ImGUI"
                link="https://github.com/gordnzhou/imnes-emulator"
                description="ImNES is NES emulator implemented in Rust. It includes a debugging UI made using ImGui for desktop. The desktop UI has various features such as
                inspect the CPU, PPU, and APU state, viewing cartridge details, and controlling each audio channel. You can also pause, stop, or restart the emulation, as well as adjust the game speed"
            />
        </div>
    )
}

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

export default ProjectGallery;