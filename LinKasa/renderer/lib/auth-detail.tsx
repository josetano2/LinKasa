import { User, onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth, firestore } from "./firebase-database"
import { doc, getDoc } from "firebase/firestore"

const useAuth = () => {
    const [staffDetails, setStaffDetails] = useState<Staff | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if(user){
                const docRef = doc(firestore, 'staff', user.uid)
                const docSnap = await getDoc(docRef)
                if(docSnap.exists()){
                    setStaffDetails(docSnap.data() as Staff)
                }
            }
            else{
                setStaffDetails(null)
            }
        })
        return () => unsubscribe();
    }, [])
    return { staffDetails }
    
}

export default useAuth