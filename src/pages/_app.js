import '@/styles/globals.css'

import React, {useState} from 'react'

import Home from "../screens/Home"
import Login from "../screens/Login"

import db from "../../firebase"
import {getAuth, onAuthStateChanged} from "firebase/auth"
import { getFirestore, doc, getDoc } from 'firebase/firestore'

const auth = getAuth(db);
const firestore = getFirestore(db);

export default function App({ Component, pageProps }) {

  const [user, setUser] = useState(null);

  async function getRol(uid){
    const docuRef = doc(firestore,`usuarios/${uid}`);
    const docuCifrada = await getDoc(docuRef);
    const infoFinal = docuCifrada.data().rol;
    return infoFinal;
  }

  function setUserWithFirebaseAndRol(usuarioFirebase){
    getRol(usuarioFirebase.uid).then((rol) => {
      const userData = {
        uid: usuarioFirebase.uid,
        email: usuarioFirebase.email,
        rol: rol,
      } 
      //setUser(usuarioFirebase);
      setUser(userData);
      console.log("userData final", userData)
    })
  }

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase){
      if(!user){
        setUserWithFirebaseAndRol(usuarioFirebase);
      } 
    } else{
      console.log("usuario ya registrado en autentificacion de firebase")
      setUser(null);
    }
  })

  return <>{user ? <Home user={user}/> : <Login/>}</>
  /* return <Component {...pageProps} /> */
}
