 
import React from "react"

import AdminView from "../components/AdminView"
import UserView from "../components/UserView"


import db from "../../firebase"
import {getAuth, signOut} from "firebase/auth"
const auth = getAuth(db);

const Home = ({user}) => { 
    return ( 
         <div>
            <h3>Estoy en HOME</h3>
            <button onClick={() => signOut(auth)}> cerrar sesion</button>

            <h2>EL USUARIO TIENE LOS SIGUIENTES PERMISOS</h2>
            <h4>{user.rol}</h4>
            {user.rol == "admin" ? <AdminView/> : <UserView/>}
         </div>
    )
}

export default Home 