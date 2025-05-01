import './App.css'
import ExperienceCard from "./components/ExperienceCard"
import ProjectCard from './components/ProjectCard';

const App = () => { 
    return (
        <>
        <section id="about">
            <div class="profile-photo">
                <img src="src/assets/myphoto.png" alt="Gordon's Profile Photo"/>
            </div>
            <h1>Hi, my name is Gordon</h1>
            <p class="p-about">I am a third-year Math and Computer Science student at the University of British Columbia. 
            I've always loved coding - from making silly Discord bots in Grade 9 to now exploring new technologies like game console emulation and web development.
            Beyond coding, I like gaming, hiking, experimenting in the kitchen, and learning a new languages.</p>
        </section>
        <section id="projects">
            <h2>Projects</h2>
            {/* make it kind of like a spotify playlist; current project on the left, 
            a scrollable panel list of projects with name and icon on the right */}
            <div id="project-list">
                <ProjectCard
                    name="Memora"
                    techStack="React, Python, MongoDB"
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
                    name="ImNES"
                    techStack="Rust, ImGUI"
                    link="https://github.com/gordnzhou/imnes-emulator"
                    description="ImNES is NES emulator implemented in Rust. It includes a debugging UI made using ImGui for desktop. The desktop UI has various features such as
                    inspect the CPU, PPU, and APU state, viewing cartridge details, and controlling each audio channel. You can also pause, stop, or restart the emulation, as well as adjust the game speed"
                />
            </div>
        </section>
        <section id="experience">
            <h2>Experience</h2>
            <div id="exp-list">
                <ExperienceCard
                    title="Teaching Assistant"
                    duration="September 2024 - Present"
                    organization="University of British Columbia"
                    bullets={[
                        "Taught and guided 500+ students in UBC's introductory computer science course CPSC 121, leading lab sections for 180+ students and instructing them in circuit design and simulation"
                    ]}
                />
                <ExperienceCard
                    title="VT Coding Club President"
                    duration="September 2022 - September 2023"
                    organization="Vancouver Technical Secondary"
                    bullets={[
                        "Produced and hosted educational workshops for our club's 50+ members, based on various topics in CS including Web Development, Competitive Programming and Game Design",
                        "Collaborated with a team of programmers and designers to develop our club's website using HTML/CSS and JavaScript",
                    ]}
                />
            </div>
        </section>
        <section id="skills">
            <h2>Skills</h2>
            <div class="skills-container">
                <b>Languages:</b> C, C++, JavaScript, Rust, SQL, Python, Java, PHP, Typescript, R, HTML/CSS <br/>
                <b>Tools/Frameworks: </b> VSCode, IntelliJ, Visual Studio, Pycharm, Git, MongoDB, FastAPI, Flask, Firebase, JUnit <br/>
                <b>Libraries: </b> React, Scikit-learn, Axios, ImGui, SDL2, OpenCV <br/>
            </div>
        </section>
        <section id="contact">
            <h2>Any questions or comments?</h2>
            <p>Feel free to shoot me an email at: gordonzhou223@gmail.com</p>
            <a href="mailto:gordonzhou223@gmail.com"> <button>Contact me here!</button></a>
        </section>
        </>
    )
}

export default App
