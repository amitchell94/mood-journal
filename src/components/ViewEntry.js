import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router';

const ViewEntry = () => {
  const [entry, setEntry] = useState(null);
  const { id } = useParams();
  console.log(useParams())

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, 'entries', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setEntry(docSnap.data());
      } else {
        console.log('No such document!');
      }
    };

    fetchData();
  }, [id]);

  if (!entry) return <div>Loading...</div>;

  return (
    <div className="text-center">
      <Card style={{ width: '18rem' }} className="mx-auto my-5">
        <Card.Header>{new Date(entry.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Card.Header>
        <Card.Body>
          <Card.Title>Event Description</Card.Title>
          <Card.Text>{entry.eventDescription}</Card.Text>
          <Card.Title>Emotions</Card.Title>
          <ul>
            {entry.emotions.map((emotion, index) => (
              <li key={index}>{emotion.type}: {emotion.level}</li>
            ))}
          </ul>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ViewEntry;
