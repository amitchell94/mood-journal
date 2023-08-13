import React, { useEffect, useState } from "react";
import {
  query,
  collection,
  where,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { Button } from "react-bootstrap";
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
        {/* {subbedCourses?.map((course) => (
          <CourseCard id={course.id} code={course.code} name={course.name} subscribable={false} />
        ))} */}
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