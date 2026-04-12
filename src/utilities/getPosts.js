import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig.js";

export async function getPosts() {

  const postsRef = collection(db, "posts");

  const snapshot = await getDocs(postsRef);

  const posts = snapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }));

  return posts;

}

