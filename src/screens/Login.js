import { TextField } from "@mui/material"

import React, { useState } from "react"
import db from "../../firebase"
import {getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword} from "firebase/auth"
import { getFirestore, doc , setDoc } from "firebase/firestore";
const auth = getAuth(db);

const firestore = getFirestore(db);

const Login = () => { 
    const [isRegistrando, setIsRegistrando] = useState(false);

    async function registrarUsuario(email, password, rol){
        const infoUsuario = await createUserWithEmailAndPassword(
            auth,
            email,
            password).then((usuarioFirebase) => {
                return usuarioFirebase;
            });
        
        console.log("----infoUsuario----");
        //una ves que se registra resivimos toda su informacion en la variable infoUsuario
        console.log(infoUsuario);
        console.log("----infoUsuario-uid---");
        console.log(infoUsuario.user.uid);
        //Aqui se registra en la base de datos de firebase, anteriormente se almaceno en autentificacion 
        const docuRef = doc(firestore, `usuarios/${infoUsuario.user.uid}`)
        setDoc(docuRef,{correo: email, rol:rol});
        //fin 

    }

    function submitHandler(e){
        e.preventDefault();
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        const rol = e.target.elements.rol.value

        console.log("submit", email, password, rol);
        registrarUsuario(email, password, rol)
        if(isRegistrando){
            //registrar 
            console.log("se registrara usuario")
            registrarUsuario(email, password, rol)
        }else {
            //login
            console.log("se logeara usuario")
            signInWithEmailAndPassword(auth, email, password)
        }
    }



    return ( 
        <>
        
         <div>
            <h1>{isRegistrando ? "Registrate" : "Inicia sesion"}</h1>
         </div>
         <form onSubmit={submitHandler}>
            <label>
                correo electronico
                <input type="email" id= "email"/>
            </label>
            <label>
                contraseña:
                <input type="password" id= "password" />
            </label>
            <label>
                Rol:
                <select id="rol">
                    <option value="admin">Administrador</option>
                    <option value="user">Usuario</option>
                </select>
            </label>
            <input type="submit"
            value={isRegistrando ? "Registrar" : "Iniciar sesion"}>
            </input>
         </form>

         <button onClick={() => setIsRegistrando(!isRegistrando)}>
            {isRegistrando ? "Ya tengo una cuenta" : "Quiero registrarme"}
         </button>
        
        </>
    )
}

export default Login 