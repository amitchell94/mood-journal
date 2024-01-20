import { Col } from "react-bootstrap";
import RangeSlider from 'react-bootstrap-range-slider';

const MoodSlider = ({text, state, setState, onValueChange, goal}) => {

    const handleChange = (value) => {
        setState(value);
        if (onValueChange) {
            onValueChange(value);
        }
    };
    return (
        <div className="col-12 mx-auto mb-4 text-start row">        
            <label htmlFor="sadInput" >
                {goal? <> How strongly <b>would you like</b> to feel</> : "How strongly do you feel"}: {text}?
            </label>
            <Col xs="9">
            <RangeSlider
                value={state}
                onChange={e => handleChange(e.target.value)}
            />
            </Col>
            <Col xs="3">
                <input
                id="sadInput"
                name="titleInput"
                type="text"
                className="form-input__input form-control"
                value={state}
                onChange={(e) => handleChange(e.target.value)}
                />
            </Col>
        </div>
    )
}

export default MoodSlider;