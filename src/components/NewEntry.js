import React, { useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { Button, Col } from "react-bootstrap";
import { Form, useNavigate } from "react-router-dom";
import { faFaceAngry, faFaceFlushed, faFaceFrown, faFaceFrownOpen, faFaceGrimace, faFaceMeh, faFaceMehBlank, faFaceRollingEyes, faFaceTired, faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import MoodButton from "./MoodButton";
import MoodSlider from "./MoodSlider";

const SAD_TEXT = "Sad, depressed, down, unhappy";
const ANXIOUS_TEXT = "Anxious, worried, nervous";
const GUILTY_TEXT = "Guilty, remorseful, bad, ashamed";
const INFERIOR_TEXT = "Inferior, worthless, inadequate, incompetent";
const LONELY_TEXT = "Lonely, unloved, unwanted, rejected, alone, abandoned";
const EMBARRASSED_TEXT = "Embarrassed, foolish, humiliated, self-conscious";
const HOPELESS_TEXT = "Hopeless, discouraged, pessimistic, despairing";
const FRUSTRATED_TEXT = "Frustrated, stuck, thwarted, defeated";
const ANGRY_TEXT = "Angry, mad, annoyed, upset";
const OTHER_TEXT = "Other";

const NewEntry = () => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");

  const [isSad, setIsSad] = useState(false);
  const [isAnxious, setIsAnxious] = useState(false);
  const [isGuilty, setIsGuilty] = useState(false);
  const [isInferior, setIsInferior] = useState(false);
  const [isLonely, setIsLonely] = useState(false);
  const [isEmbarrassed, setIsEmbarrassed] = useState(false);
  const [isHopeless, setIsHopeless] = useState(false);
  const [isFrustrated, setIsFrustrated] = useState(false);
  const [isAngry, setIsAngry] = useState(false);
  const [isOther, setIsOther] = useState(false);
  
  const [sadLevelNow, setSadLevelNow] = useState(50);
  const [anxiousLevelNow, setAnxiousLevelNow] = useState(50);
  const [guiltyLevelNow, setGuiltyLevelNow] = useState(50);
  const [inferiorLevelNow, setInferiorLevelNow] = useState(50);
  const [lonelyLevelNow, setLonelyLevelNow] = useState(50);
  const [embarrassedLevelNow, setEmbarrassedLevelNow] = useState(50);
  const [hopelessLevelNow, setHopelessLevelNow] = useState(50);
  const [frustratedLevelNow, setFrustratedLevelNow] = useState(50);
  const [angryLevelNow, setAngryLevelNow] = useState(50);
  const [otherLevelNow, setOtherLevelNow] = useState(50);
  

  const navigate = useNavigate();

  const newTodo = async (event) => {
    event.preventDefault();
    if (code.trim() === "") {
      alert("Enter valid course code");
      return;
    }
    if (name.trim() === "") {
      alert("Enter valid course name");
      return;
    }

    const { uid } = auth.currentUser;
    await addDoc(collection(db, "entries"), {
      code: code,
      name: name,
      uid: uid,
    });
    navigate("/");
  };

  return (
    <div className="container bg-white card pt-1 my-4">
    <form onSubmit={(event) => newTodo(event)} className="new-todo input-group">
      <div className="row col-6 mx-auto">
        <h1 className="text-center mx-auto mt-3">New Journal Entry</h1>
        <div className="col-12 mx-auto mt-5 mb-2 text-start">
          <label htmlFor="codeInput" className="text-start">
            Describe the upsetting event
          </label>
          <input
            id="codeInput"
            name="codeInput"
            type="text"
            className="form-input__input form-control mb-3"
            placeholder="e.g. Fight with girlfriend, my boss yelled at me, etc."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <div className="col-12 mx-auto mb-4">

        <MoodButton faIcon={faFaceFrown} text={SAD_TEXT} state={isSad} setState={setIsSad}/>
        <MoodButton faIcon={faFaceGrimace} text={ANXIOUS_TEXT} state={isAnxious} setState={setIsAnxious}/>
        <MoodButton faIcon={faFaceRollingEyes} text={GUILTY_TEXT} state={isGuilty} setState={setIsGuilty}/>
        <MoodButton faIcon={faFaceMehBlank} text={INFERIOR_TEXT} state={isInferior} setState={setIsInferior}/>
        <MoodButton faIcon={faHeartBroken} text={LONELY_TEXT} state={isLonely} setState={setIsLonely}/>
        <MoodButton faIcon={faFaceFlushed} text={EMBARRASSED_TEXT} state={isEmbarrassed} setState={setIsEmbarrassed}/>
        <MoodButton faIcon={faFaceFrownOpen} text={HOPELESS_TEXT} state={isHopeless} setState={setIsHopeless}/>
        <MoodButton faIcon={faFaceTired} text={FRUSTRATED_TEXT} state={isFrustrated} setState={setIsFrustrated}/>
        <MoodButton faIcon={faFaceAngry} text={ANGRY_TEXT} state={isAngry} setState={setIsAngry}/>
        <MoodButton faIcon={faFaceMeh} text={OTHER_TEXT} state={isOther} setState={setIsOther}/>
        </div>
       
        {isSad ? <MoodSlider state={sadLevelNow} setState={setSadLevelNow} text={SAD_TEXT}/> : <></>}
        {isAnxious ? <MoodSlider state={anxiousLevelNow} setState={setAnxiousLevelNow} text={ANXIOUS_TEXT}/> : <></>}
        {isGuilty ? <MoodSlider state={guiltyLevelNow} setState={setGuiltyLevelNow} text={GUILTY_TEXT}/> : <></>}
        {isInferior ? <MoodSlider state={inferiorLevelNow} setState={setInferiorLevelNow} text={INFERIOR_TEXT}/> : <></>}
        {isLonely ? <MoodSlider state={lonelyLevelNow} setState={setLonelyLevelNow} text={LONELY_TEXT}/> : <></>}
        {isEmbarrassed ? <MoodSlider state={embarrassedLevelNow} setState={setEmbarrassedLevelNow} text={EMBARRASSED_TEXT}/> : <></>}
        {isHopeless ? <MoodSlider state={hopelessLevelNow} setState={setHopelessLevelNow} text={HOPELESS_TEXT}/> : <></>}
        {isFrustrated ? <MoodSlider state={frustratedLevelNow} setState={setFrustratedLevelNow} text={FRUSTRATED_TEXT}/> : <></>}
        {isAngry ? <MoodSlider state={angryLevelNow} setState={setAngryLevelNow} text={ANGRY_TEXT}/> : <></>}
        {isOther ? <MoodSlider state={otherLevelNow} setState={setOtherLevelNow} text={OTHER_TEXT}/> : <></>}

        <div className="col-12 mx-auto text-center">
          <Button type="submit" className="mx-auto px-5 mb-5">Add Course</Button>
        </div>
      </div>
    </form>
    </div>
  );
}

export default NewEntry;