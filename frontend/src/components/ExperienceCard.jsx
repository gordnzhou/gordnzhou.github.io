import "./ExperienceCard.css";

const ExperienceCard = ({title, duration, organization, bullets}) => {
    return (
        <div class="exp-card">
            <h3 class="title">{title}</h3>
            <div class="sub-title">
                <h4 class="org-text">{organization}</h4>
                <h4 class="dur-text">{duration}</h4>
            </div>
            <ul class="bullets"> {bullets.map((item, index) => ( <li key={index}>{item}</li> ))} </ul> 
        </div>
    )
}

export default ExperienceCard;