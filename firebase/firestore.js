import firebasedb from  "firebaseApp"
import { getFirestore } from "node_modules/firebase/firestore"

const fireStore = getFirestore(firebasedb.firebaseApp)
export default fireStore