import { collection, query, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { firestore } from "../lib/firebase-database";

export function getAllFlight() {
  const [scheduledFlights, setScheduledFlights] = useState<ScheduledFlights[]>(
    []
  );

  useEffect(() => {
    const scheduledFlightsRef = collection(firestore, "scheduled-flights");
    const q = query(scheduledFlightsRef);
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let scheduledFlightsArr = [];
      QuerySnapshot.forEach((doc) => {
        scheduledFlightsArr.push({ ...doc.data(), id: doc.id });
      });
      setScheduledFlights(scheduledFlightsArr);
    });

    return () => unsubscribe();
  }, []);

  return scheduledFlights;
}
