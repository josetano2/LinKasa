import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../lib/firebase-database";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export const getStaffFromID = async (uid: string) => {
  const docSnap = await getDoc(doc(firestore, "staff", uid));
  return docSnap.exists() ? docSnap.data() : null;
};

export const getStaffRole = () => {
  const [staffRole, setStaffRole] = useState(null);
  const router = useRouter();
  const { staffID } = router.query;
  useEffect(() => {
    const id = Array.isArray(staffID) ? staffID[0] : staffID;

    const getRole = async () => {
      try {
        const docRef = doc(firestore, "staff", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setStaffRole(docSnap.data().role);
        }
      } catch (error) {}
    };

    if (id) {
      getRole();
    }
    console.log(staffRole);
  }, [staffID]);

  return staffRole
};
