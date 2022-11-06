import { collection, doc } from "firebase/firestore";
import { db } from "../App";

export const salesRef = collection(db, "sales");
