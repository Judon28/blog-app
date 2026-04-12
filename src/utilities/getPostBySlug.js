import { db } from "../firebaseConfig.js";
import { collection, query, where, getDocs } from "firebase/firestore";

export async function getPostBySlug(slug) {

  const postsRef = collection(db, "posts");

  const q = query(postsRef, where("slug", "==", slug));

  const querySnapshot = await getDocs(q);

  let post = null;

  querySnapshot.forEach((doc) => {
    post = {
      ...doc.data(),
      id: doc.id
      
    };
  });

  return post;
}

export async function getPostById(id) {

  const postsRef = collection(db, "posts");

  const q = query(postsRef, where("id", "==", id));

  const querySnapshot = await getDocs(q);

  let post = null;

  querySnapshot.forEach((doc) => {
    post = {
      id: doc.id,
      ...doc.data()
    };
  });

  return post;
}