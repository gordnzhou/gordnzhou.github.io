import './App.css'
import EmailForm from './components/EmailForm';
import ExperienceCard from "./components/ExperienceCard"
import Navbar from './components/Navbar';
import ThemeChanger from './components/ThemeChanger';
import ProjectGallery from './components/ProjectGallery';

const App = () => { 
    return (
        <>
        <Navbar/>
        <div id="wave">
            <svg viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet">
                <path d="M0, 80 C300, 0 400, 300 500, 50 L500, 00 L0, 0 Z"/>
            </svg>
        </div>

        <section id="about">
            <div class="left-section">
                <h1>Hello 👋 my name is Gordon</h1>
                <p class="p-about">I am a third-year Math and Computer Science student at the University of British Columbia. 
                I've always loved coding - from making silly Discord bots in Grade 9 to now exploring new technologies like game console emulation and web development.
                Beyond coding, I enjoy hiking, gaming, experimenting in the kitchen, and learning new languages.</p>
                <ThemeChanger/>
            </div>
            <div class="profile-photo">
                <img src="assets/myphoto.png" alt="Gordon's Profile Photo"/>
            </div>
        </section>
        <section id="projects">
            <h2>Technical Projects</h2>
            <ProjectGallery/>
        </section>
        <section id="experience">
            <h2>Relevant Experience</h2>
            <div id="exp-list">
                <ExperienceCard
                    title="Teaching Assistant"
                    duration="September 2024 - Present"
                    organization="University of British Columbia"
                    bullets={[
                        "Taught and guided 500+ students in UBC's introductory computer science course CPSC 121, leading lab sections for 180+ students and instructing them in circuit design and simulation",
                        "Led 108+ total hours of labs weekly to support students. Graded 200+ exams and assignments with personalized feedback on logical proofs and reasoning"
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
            <h2>Tech Stack</h2>
            <div class="skills-container">
                <b>Languages:</b> C, C++, JavaScript, Rust, SQL, Python, Java, PHP, Typescript, R, HTML/CSS <br/>
                <b>Tools/Frameworks: </b> VSCode, IntelliJ, Visual Studio, Pycharm, Git, MongoDB, FastAPI, Flask, Firebase, JUnit <br/>
                <b>Libraries: </b> React, Scikit-learn, Axios, ImGui, SDL2, OpenCV <br/>
            </div>
        </section>
        <section id="contact">
            <h2>Feedback </h2>        
            <EmailForm/>
            <p>Or shoot me an email at: gordonzhou223@gmail.com</p>
        </section>
        </>
    )
}

export default App
