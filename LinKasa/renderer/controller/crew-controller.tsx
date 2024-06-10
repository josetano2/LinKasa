import { collection, query, onSnapshot, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import { firestore } from "../lib/firebase-database";

export function getAllCabinCrew() {
  const [crews, setCrews] = useState<FlightCrew[]>([]);
  useEffect(() => {
    const crewRef = collection(firestore, "flight-crews");
    const q = query(crewRef, where("role", "==", "Cabin Crew"), where("status", "==", "Active"));

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let crewArr = [];
      QuerySnapshot.forEach((doc) => {
        crewArr.push({ ...doc.data(), id: doc.id });
      });
      setCrews(crewArr);
    });
    return () => unsubscribe();
  }, []);

  return crews;
}

export function getAllPilot() {
    const [crews, setCrews] = useState<FlightCrew[]>([]);
    useEffect(() => {
      const crewRef = collection(firestore, "flight-crews");
      const q = query(crewRef, where("role", "==", "Pilot"), where("status", "==", "Active"));
  
      const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
        let crewArr = [];
        QuerySnapshot.forEach((doc) => {
          crewArr.push({ ...doc.data(), id: doc.id });
        });
        setCrews(crewArr);
      });
      return () => unsubscribe();
    }, []);
  
    return crews;
  }
