import "./Navbar.css"

const Navbar = () => {
    return (
        <nav id="navbar-top">
            <div id="left-section">
                <div class="profile-photo small">
                    <img src="assets/myphoto.png" alt="Gordon's Profile Photo"/>
                </div>
                <p class="name">Gordon Zhou</p>
            </div>
            <div id="right-section">
                <div id="links-container">
                    <a class="icon-link" href="https://github.com/gordnzhou" target="_blank" aria-label="GitHub">
                        <i class="fab fa-github"></i>
                    </a>
                    <a class="icon-link" href="https://www.linkedin.com/in/gordon-zhou/" target="_blank" aria-label="LinkedIn">
                        <i class="fab fa-linkedin"></i>
                    </a>
                    <a class="icon-link" href="mailto:gordonzhou223@gmail.com" aria-label="Email">
                        <i class="fas fa-envelope"></i>
                    </a>
                    <button class="resume-button"><a href="https://gordnzhou.github.io/resume/" target="_blank">Resume</a></button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;