import './App.css'
import EmailForm from './components/EmailForm';
import ExperienceCard from "./components/ExperienceCard"
import Navbar from './components/Navbar';
import ThemeChanger from './components/ThemeChanger';
import ProjectGallery from './components/ProjectGallery';

const App = () => { 
    return (
        <>
        <div id="wave">
            <svg viewBox="0 0 500 500" preserveAspectRatio="none" width="100%" height="150px">
                <path d="M0,0 L0,200 C125,100 375,300 500,200 L500,0 Z"s/>
            </svg>
        </div>
        <Navbar/>
        <section id="about" class="header-main">
            <pre class="name-ascii">
            {`
╭━━━╮╱╱╱╱╱╱╭╮╱╱╱╱╱╱╭━━━━┳╮
┃╭━╮┃╱╱╱╱╱╱┃┃╱╱╱╱╱╱╰━━╮━┃┃
┃┃╱╰╋━━┳━┳━╯┣━━┳━╮╱╱╱╭╯╭┫╰━┳━━┳╮╭╮
┃┃╭━┫╭╮┃╭┫╭╮┃╭╮┃╭╮╮╱╭╯╭╯┃╭╮┃╭╮┃┃┃┃
┃╰┻━┃╰╯┃┃┃╰╯┃╰╯┃┃┃┃╭╯━╰━┫┃┃┃╰╯┃╰╯┃
╰━━━┻━━┻╯╰━━┻━━┻╯╰╯╰━━━━┻╯╰┻━━┻━━╯`}
            </pre>
            <h2 class="big-hello">Hello! About me:</h2>
            <p class="p-about">Combined Math + CS major at UBC trying to learn Vim. Currently interested in web dev, and cloud technologies and always eager to learn more.</p>
            <ThemeChanger/>
        </section>
        <section id="projects" class="header-main">
            <h2>Technical Projects</h2>
            <ProjectGallery/>
        </section>
        <section id="experience" class="header-main">
            <h2>Relevant Experience</h2>
            <div id="exp-list">
                <ExperienceCard
                    title="Performance Test Engineer"
                    duration="September 2025 - April 2025"
                    organization="Optum"
                    bullets={[
                        "Engineered and maintained performance testing tools and automation scripts using C# and Python across both on-premise and GCP cloud environments",
                        "Designed, documented, and integrated a C# script using Selenium and Microsoft UI Automation that automated existing stopwatch tests, reducing manual testing workflow by 80%",
                    ]}
                />
                <ExperienceCard
                    title="Teaching Assistant"
                    duration="September 2024 - January 2025"
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
        <section id="skills" class="header-main">
            <h2>Tech Stack</h2>
            <div class="skills-container">
                <b>Languages:</b> C; C++; JavaScript; Python; C# Rust; SQL; Java; PHP; TypeScript <br/>
                <b>Tools/Frameworks: </b> Git; Docker; Express; VSCode; Vim; IntelliJ; MongoDB; FastAPI; Flask; Firebase; JUnit <br/>
                <b>Libraries: </b> React; Pandas; NumPy; Scikit-learn; SDL2; ImGui <br/>
            </div>
        </section>
        <section id="contact" class="header-main">
            <h2>Direct Contact</h2>        
            <EmailForm/>
            <p>Or shoot me an email at: <u><a href="mailto:gordonzhou223@gmail.com" target="_blank" >gordonzhou223@gmail.com</a></u></p>
        </section>
        <footer></footer>
        </>
    )
}

export default App
