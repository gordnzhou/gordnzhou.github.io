import "./Navbar.css"

const Navbar = () => {
    return (
        <nav id="navbar-top">
            <a href="#wave">
            <div id="left-section">
                    <div class="profile-photo small">
                        <img src="assets/myphotoALT.webp" alt="Gordon Photo"/>
                    </div>
                    <h2 class="name">Gordon Zhou</h2>
            </div>
            </a>
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
                    <button class="button-main resume-button"><a href="https://gordnzhou.github.io/resume/" target="_blank">Resume</a></button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;