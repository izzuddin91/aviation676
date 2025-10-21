// // src/service/firebase.auth.ts
// "use client";

// import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
// import { app } from "../../clientApp";

//  const auth = getAuth(app);

// //* Sign up (create user)
// export default async function signUp(email: string, password: string) {
//   let result = null,
//     error = null;
//   try {
//     //* Create user with email and password (sign up)
//     result = await createUserWithEmailAndPassword(auth, email, password);
//   } catch (e) {
//     //! Handle errors here
//     error = e;
//   }

//   return { result, error };
// }
