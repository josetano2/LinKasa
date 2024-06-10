import { collection, query, onSnapshot, where, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../lib/firebase-database";

export function getAirplanes() {
  const [airplanes, setAirplanes] = useState<Airplane[]>([]);
  
  useEffect(() => {
    const airplaneRef = collection(firestore, "airplane");
    const q = query(airplaneRef, orderBy("status"));

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let airplaneArr = [];
      QuerySnapshot.forEach((doc) => {
        airplaneArr.push({ ...doc.data(), id: doc.id });
      });
      setAirplanes(airplaneArr);
    });

    return () => unsubscribe();
  }, []);

  // useEffect(() => {
  //   airplanes.forEach(async (airplane) => {
  //     const currTime = new Date()
  //     const arrivalTime = new Date(airplane.arr)
  //   })
  // })

  return airplanes;
}

export function getAvailableAirplane() {
  const [airplanes, setAirplanes] = useState<Airplane[]>([]);

  useEffect(() => {
    const airplaneRef = collection(firestore, "airplane");
    const q = query(airplaneRef, where("status", "==", "Available"));

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let airplaneArr = [];
      QuerySnapshot.forEach((doc) => {
        airplaneArr.push({ ...doc.data(), id: doc.id });
      });
      setAirplanes(airplaneArr);
    });

    return () => unsubscribe();
  }, []);

  if (airplanes.length == 0) {
    return null;
  } else {
    return airplanes;
  }
}
