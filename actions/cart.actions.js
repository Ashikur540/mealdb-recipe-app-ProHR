// "use server"

import { db } from "@/lib/configs/firebase";
import { collection, query, getDocs, addDoc, updateDoc, doc, where, deleteDoc } from "firebase/firestore";

export const saveCartItemToDB = async (cartItem) => {
  console.log("✨ ~ file: cart.actions.js:7 ~ saveCartItemToDB ~ cartItem:", cartItem)
  // Validate input
  if (!cartItem?.idMeal || !cartItem?.userMail) {
    throw new Error("Invalid cart item data");
  }

  // Check for duplicates
  const cartRef = collection(db, "meal-cart");
  const q = query(
    cartRef,
    where("userMail", "==", cartItem.userMail),
    where("idMeal", "==", cartItem.idMeal)
  );

  const querySnapshot = await getDocs(q);

  // If item already exists, return early
  if (!querySnapshot.empty) {
    return null;
  }

  const docRef = await addDoc(collection(db, "meal-cart"), {
    ...cartItem,
    createdAt: new Date().toISOString()
  });
  console.log("added item to firebase docRef>>", docRef.id)
  return docRef.id;
};


export const getAllCartItemsByUser = async (email) => {
  const cartRef = collection(db, "meal-cart");
  const cartListQuery = query(cartRef, where("userMail", "==", email))
  const querySnapshot = await getDocs(cartListQuery);
  const carts = []
  querySnapshot.forEach((doc) => {
    // console.log("✨ ~ file: RecipeCard.jsx:44 ~ querySnapshot.forEach ~ doc:", doc)
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    carts.push({ ...doc.data() })
  });
  return carts;
}




export const deleteCartItemFromDB = async (userEmail, itemId) => {
  // console.log("✨ ~ deleteCartItemFromDB ~ itemId:", itemId)
  const cartRef = collection(db, "meal-cart");
  const q = query(
    cartRef,
    where("userMail", "==", userEmail),
    where("idMeal", "==", itemId)
  );

  const querySnapshot = await getDocs(q);
  const deletePromises = querySnapshot.docs.map(doc =>
    deleteDoc(doc.ref)
  );

  await Promise.all(deletePromises);
  return true;
};





export const syncLocalCartToDB = async (userEmail, localCart) => {
  try {
    console.log("✨syncLocalCartToDB ~ userEmail:", userEmail)

    //  existing carts
    const cartRef = collection(db, "meal-cart");
    const q = query(cartRef, where("userMail", "==", userEmail));
    const querySnapshot = await getDocs(q);

    // Create a set of existing meal IDs
    const existingMealIds = new Set();
    querySnapshot.forEach(doc => {
      existingMealIds.add(doc.data().idMeal);
    });

    // Filter  duplicates 
    const newItems = localCart.filter(item => !existingMealIds.has(item.idMeal));

    const syncPromises = newItems.map(item => {
      const cartItem = {
        ...item,
        userMail: userEmail
      };
      return addDoc(collection(db, "meal-cart"), cartItem);
    });

    await Promise.all(syncPromises);
    console.log("saved")
    return true;
  } catch (error) {
    console.log("✨ ~ file: cart.actions.js:106 ~ syncLocalCartToDB ~ error:", error)
  }
};
