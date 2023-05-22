import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../../firebase";

import Todo from "../components/Todo"

const TodoList = () => {
    console.log("----Funcion TodoList------") 
    
    const [todos, setTodos] = useState(/* initialState */[]) 
    
    useEffect(() => {
        const collectionRef = collection(db, "todos") 

        const q = query(collectionRef, orderBy("timestamp", "desc")); 

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setTodos(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, 
            timestamp:doc.data().timestamp?.toDate().getTime()})))
        })
        
        return unsubscribe;
    },[]);
    

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