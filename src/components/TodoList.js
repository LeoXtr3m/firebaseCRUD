import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../../firebase";

import Todo from "../components/Todo"

const TodoList = () => {
    console.log("----Funcion TodoList------") 
    
    const [todos, setTodos] = useState(/* initialState */[]) 
    
    useEffect(() => {

        //se realiza una consulta a la colección "todos" ordenada por el campo "timestamp" en orden descendente.
        const collectionRef = collection(db, "todos") 

        const q = query(collectionRef, orderBy("timestamp", "desc")); 
         
        // onSnapshot es un método de Firebase Firestore que establece un listener para escuchar 
        //los cambios en la consulta especificada. Cada vez que se produce un cambio en los datos 
        //de la consulta (como la adición, modificación o eliminación de un documento), la función 
        //de devolución de llamada proporcionada se ejecuta con una instantánea del resultado de la 
        //consulta.
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            //se utiliza el método querySnapshot.docs.map para mapear los documentos de la instantánea 
            //a un arreglo de objetos. Cada objeto representa un documento y contiene sus datos, su ID y 
            //la representación de tiempo convertida del campo "timestamp" en milisegundos
            setTodos(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, 
            timestamp:doc.data().timestamp?.toDate().getTime()})))
        })
        
        return unsubscribe;
    },[]);

    console.log("todos-------------******************")
    console.log(todos)
    

    return ( 
        <div>
            {todos.map(todo=> <Todo key= {todo.id} 
                id = {todo.id} 
                timestamp ={todo.timestamp}
                title ={todo.title}
                detail = {todo.detail}
            />)}
        </div>
    ) 
}

export default TodoList