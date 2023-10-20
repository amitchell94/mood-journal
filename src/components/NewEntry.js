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
  const [currentStep, setCurrentStep] = useState(1);
  const [eventDescription, setEventDescription] = useState("");
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

  const [emotions, setEmotions] = useState([]); // Initialize as empty array


  const handleEmotionToggle = (emotionType, newState) => {
    if (newState) {
        setEmotions([...emotions, { type: emotionType, level: 50 }]);
    } else {
        setEmotions(emotions.filter(emotion => emotion.type !== emotionType));
    }

  }

  const handleEmotionLevelChange = (emotionType, newLevel) => {
      const updatedEmotions = emotions.map(emotion => {
        if (emotion.type === emotionType) {
            return { ...emotion, level: parseInt(newLevel, 10) };
        }
        return emotion;
    });

    setEmotions(updatedEmotions);
  };
  
  const navigate = useNavigate();

  const newEntry = async (event) => {
    event.preventDefault();
    if (eventDescription.trim() === "") {
      alert("Please describe the upsetting event.");
      return;
    }

    const { uid } = auth.currentUser;


    const dateNow = new Date().toISOString();  // Current ISO date string

    await addDoc(collection(db, "entries"), {
      userId: uid,
      date: dateNow,
      eventDescription: eventDescription,
      emotions: emotions,
      createdAt: dateNow,
      updatedAt: dateNow
    });
    
    navigate("/");
  };

  return (
    <div className="container bg-white card pt-1 my-4">
    <form onSubmit={(event) => newEntry(event)} className="new-todo input-group">
      <div className="row col-6 mx-auto">
        <h1 className="text-center mx-auto mt-3">New Journal Entry</h1>
        {currentStep === 1 && (
          <div className="col-12 mx-auto mt-5 mb-2 text-start">
            <label htmlFor="codeInput" className="text-start">
              Describe the upsetting event
            </label>
            <input
              id="codeInput"
              name="codeInput"
              type="text"
              className="form-input__input form-control mb-3"
              placeholder="e.g. Fight with friend, my boss yelled at me, etc."
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
            />
          </div>
        )}

        {currentStep === 2 && (
        <div className="col-12 mx-auto mb-4">
          <MoodButton faIcon={faFaceFrown} text={SAD_TEXT} state={isSad} setState={setIsSad} onToggle={(newState) => handleEmotionToggle("sad", newState)}/>
          <MoodButton faIcon={faFaceGrimace} text={ANXIOUS_TEXT} state={isAnxious} setState={setIsAnxious} onToggle={(newState) => handleEmotionToggle("anxious", newState)}/>
          <MoodButton faIcon={faFaceRollingEyes} text={GUILTY_TEXT} state={isGuilty} setState={setIsGuilty} onToggle={(newState) => handleEmotionToggle("guilty", newState)}/>
          <MoodButton faIcon={faFaceMehBlank} text={INFERIOR_TEXT} state={isInferior} setState={setIsInferior} onToggle={(newState) => handleEmotionToggle("inferior", newState)}/>
          <MoodButton faIcon={faHeartBroken} text={LONELY_TEXT} state={isLonely} setState={setIsLonely} onToggle={(newState) => handleEmotionToggle("lonely", newState)}/>
          <MoodButton faIcon={faFaceFlushed} text={EMBARRASSED_TEXT} state={isEmbarrassed} setState={setIsEmbarrassed} onToggle={(newState) => handleEmotionToggle("embarrassed", newState)}/>
          <MoodButton faIcon={faFaceFrownOpen} text={HOPELESS_TEXT} state={isHopeless} setState={setIsHopeless} onToggle={(newState) => handleEmotionToggle("hopeless", newState)}/>
          <MoodButton faIcon={faFaceTired} text={FRUSTRATED_TEXT} state={isFrustrated} setState={setIsFrustrated} onToggle={(newState) => handleEmotionToggle("frustrated", newState)}/>
          <MoodButton faIcon={faFaceAngry} text={ANGRY_TEXT} state={isAngry} setState={setIsAngry} onToggle={(newState) => handleEmotionToggle("angry", newState)}/>
          <MoodButton faIcon={faFaceMeh} text={OTHER_TEXT} state={isOther} setState={setIsOther} onToggle={(newState) => handleEmotionToggle("other", newState)}/>
        </div>
        )}
       
        {currentStep === 3 && (
          <div className="col-12 mx-auto mb-4">
            {isSad ? <MoodSlider state={sadLevelNow} setState={setSadLevelNow} text={SAD_TEXT} onValueChange={(newLevel) => handleEmotionLevelChange("sad", newLevel)} /> : <></>}
            {isAnxious ? <MoodSlider state={anxiousLevelNow} setState={setAnxiousLevelNow} text={ANXIOUS_TEXT} onValueChange={(newLevel) => handleEmotionLevelChange("anxious", newLevel)} /> : <></>}
            {isGuilty ? <MoodSlider state={guiltyLevelNow} setState={setGuiltyLevelNow} text={GUILTY_TEXT} onValueChange={(newLevel) => handleEmotionLevelChange("guilty", newLevel)} /> : <></>}
            {isInferior ? <MoodSlider state={inferiorLevelNow} setState={setInferiorLevelNow} text={INFERIOR_TEXT} onValueChange={(newLevel) => handleEmotionLevelChange("inferior", newLevel)} /> : <></>}
            {isLonely ? <MoodSlider state={lonelyLevelNow} setState={setLonelyLevelNow} text={LONELY_TEXT} onValueChange={(newLevel) => handleEmotionLevelChange("lonely", newLevel)} /> : <></>}
            {isEmbarrassed ? <MoodSlider state={embarrassedLevelNow} setState={setEmbarrassedLevelNow} text={EMBARRASSED_TEXT} onValueChange={(newLevel) => handleEmotionLevelChange("embarrassed", newLevel)} /> : <></>}
            {isHopeless ? <MoodSlider state={hopelessLevelNow} setState={setHopelessLevelNow} text={HOPELESS_TEXT} onValueChange={(newLevel) => handleEmotionLevelChange("hopeless", newLevel)} /> : <></>}
            {isFrustrated ? <MoodSlider state={frustratedLevelNow} setState={setFrustratedLevelNow} text={FRUSTRATED_TEXT} onValueChange={(newLevel) => handleEmotionLevelChange("frustrated", newLevel)} /> : <></>}
            {isAngry ? <MoodSlider state={angryLevelNow} setState={setAngryLevelNow} text={ANGRY_TEXT} onValueChange={(newLevel) => handleEmotionLevelChange("angry", newLevel)} /> : <></>}
            {isOther ? <MoodSlider state={otherLevelNow} setState={setOtherLevelNow} text={OTHER_TEXT} onValueChange={(newLevel) => handleEmotionLevelChange("other", newLevel)} /> : <></>}
          </div>
        )}

        <div className="col-12 mx-auto text-center">
          {currentStep > 1 && (
            <Button onClick={() => setCurrentStep((prevStep) => prevStep - 1)} className="mx-2 px-5 mb-5">
              Back
            </Button>
          )}
          {currentStep < 3 ? (
            <Button type="button" onClick={() => setCurrentStep((prevStep) => prevStep + 1)} className="mx-2 px-5 mb-5">
              Next
            </Button>
          ) : (
            <>            
            <Button type="submit" className="mx-auto px-5 mb-5">Submit</Button>
            </>
          )}
        </div>
      </div>
    </form>
    </div>
  );
}

export default NewEntry;