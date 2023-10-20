import React, { useEffect, useState } from "react";
import {
  query,
  collection,
  where,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyLog = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const qEntries = query(
      collection(db, "entries"));

    const unsubscribeEntry = onSnapshot(qEntries, (QuerySnapshot) => {
      let ents = [];
      QuerySnapshot.forEach((doc) => {
        ents.push({ ...doc.data(), id: doc.id });
      });
      setEntries(ents);
    });

    return () => {
        unsubscribeEntry();
    };
  }, []);

  return (
    <div className="text-center">
      <h1 className="mx-auto my-5">My Journal Entries</h1>
      <div className="row mx-5 d-flex justify-content-center">
        {entries?.map((entry) => (
           <Col xs={12} md={4} lg={3} className="mb-4">
           <Card className="shadow">
           <Card.Header>{new Date(entry.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Card.Header>
             <Card.Body>
               <Card.Title>{entry.eventDescription}</Card.Title>
               <Card.Text>
                 {/* You can include more details here, maybe truncated text of the journal entry or some tags */}
               </Card.Text>
               {/* Add a link to view the full journal entry */}
               <Link to={`/entry/${entry.id}`}>
                 <Button variant="primary">Read More</Button>
               </Link>
             </Card.Body>
           </Card>
         </Col>
        ))}
      </div>
      <Link to="/new">
        <Button variant="primary" size="lg">
          New Journal Entry
        </Button>
      </Link>
    </div>
  );
}

export default MyLog;