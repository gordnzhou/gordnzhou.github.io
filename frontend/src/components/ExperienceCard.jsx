import "./ExperienceCard.css";

const ExperienceCard = ({title, duration, organization, bullets}) => {
    return (
        <div class="exp-card">
            <h3 class="title">{title}</h3>
            <div class="sub-title">
                <h4>{duration}</h4>
                <h4>{organization}</h4>
            </div>
            <ul class="bullets"> {bullets.map((item, index) => ( <li key={index}>{item}</li> ))} </ul> 
        </div>
    )
}

export default ExperienceCard;