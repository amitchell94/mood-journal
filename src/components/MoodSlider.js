import { Col } from "react-bootstrap";
import RangeSlider from 'react-bootstrap-range-slider';

const MoodSlider = ({text, state, setState}) => {
    return (
        <div className="col-12 mx-auto mb-4 text-start row">        
            <label htmlFor="sadInput" >
                How strongly do you feel: {text}
            </label>
            <Col xs="9">
            <RangeSlider
                value={state}
                onChange={e => setState(e.target.value)}
            />
            </Col>
            <Col xs="3">
                <input
                id="sadInput"
                name="titleInput"
                type="text"
                className="form-input__input form-control"
                value={state}
                onChange={(e) => setState(e.target.value)}
                />
            </Col>
        </div>
    )
}

export default MoodSlider;