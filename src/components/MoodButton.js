import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const MoodButton = ({faIcon, text, state, setState}) => {
    if (state) {
        return (
            <button type="button" class="btn btn-primary m-1" style={{width: "150px", height: "150px"}} onClick={ () => setState(!state)}> 
                <FontAwesomeIcon icon={faIcon}  size="2xl" className="mb-1"/>
                <br></br>
                <p>{text}</p>
            </button>
        )
    } else  {
        return (
            <button type="button" class="btn btn-outline-primary m-1" style={{width: "150px", height: "150px"}} onClick={ () => setState(!state)}> 
                <FontAwesomeIcon icon={faIcon}  size="2xl" className="mb-1"/>
                <br></br>
                <p>{text}</p>
            </button>
        )
    }
}

export default MoodButton;