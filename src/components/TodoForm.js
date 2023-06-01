import { addDoc, collection, serverTimestamp, updateDoc, doc} from "@firebase/firestore"
import { Button, TextField } from "@mui/material"
import { useContext, useEffect, useRef } from "react"
import { db } from "../../firebase"
import {TodoContext} from "../pages/TodoContext"

const TodoForm = () => { 
    console.log("----Funcion TodoForm------") 
    const inputAreaRef = useRef();
    //estados iniciales de todo, con las propiedades title y detail en vacio ''
    /* const [todo, setTodo] = useState({title:'', detail:''}) */
    const {showAlert, todo, setTodo} = useContext(TodoContext)
    //Esta función se invocará cuando se haga clic en el botón "Add a new todo".
    //Luego, se agrega un nuevo documento a la colección utilizando la función addDoc, 
    //pasando como argumento un objeto que combina las propiedades title y detail del 
    //estado todo, junto con timestamp: serverTimestamp() para agregar la marca de tiempo 
    //del servidor al documento. Después de agregar el documento, se restablece el estado 
    //todo a un objeto vacío con las propiedades title y detail.
    const onSubmit = async () => { 
        if(todo?.hasOwnProperty('timestamp')){
            const docRef = doc(db, "todos", todo.id)
            const todoUpdated =   { ...todo, timestamp: serverTimestamp()} 
            updateDoc(docRef, todoUpdated)
            setTodo({title: '', detail:''})
            showAlert('success',`Todo with id ${todo.id} is added successfully`)
        } else{
            const collectionRef = collection(db, "todos") 
            const docRef = await addDoc(collectionRef, { ...todo, timestamp: serverTimestamp()})
            setTodo({title: '', detail:''})
            showAlert('success',`Todo with id ${docRef.id} is added successfully`)
        }
    }  
 

    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (!inputAreaRef.current.contains(e.target)){
                console.log('Outside input area');
                setTodo({title:'', detail:''})
            } else{
                console.log('Inside input area');
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return() => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        } 

    },[]);
    return ( 

        <div>

            <div ref= {inputAreaRef}>
                <div style={{margin:"10px"}}>
                    <input fullWidth label="title" margin= "normal" value = {todo.title}  onChange={e => setTodo({ ...todo, title: e.target.value})}/> 
                </div>
                <div  >
                    <input fullWidth label="detail" multiline maxRows= {4} value = {todo.detail} onChange={e => setTodo({ ...todo, detail: e.target.value})}/> 
                </div>
                <Button onClick={onSubmit} variant="contained" sx={{mt: 3}}>{todo.hasOwnProperty('timestamp') ? 'Update todo' : 'Add a new todo'}</Button>
            </div>

            {/* <div ref= {inputAreaRef}> 
                        <pre>{JSON.stringify(todo,null, '\t')}</pre>
                        <TextField fullWidth label="title" margin= "normal"
                            value = {todo.title}
                            onChange={e => setTodo({ ...todo, title: e.target.value})}
                        />  
                        <TextField fullWidth label="detail" multiline maxRows= {4}
                            value = {todo.detail}
                            onChange={e => setTodo({ ...todo, detail: e.target.value})}
                        /> 
                        <Button onClick={onSubmit} variant="contained" sx={{mt: 3}}>{todo.hasOwnProperty('timestamp') ? 'Update todo' : 'Add a new todo'}</Button>
                    </div> */}
        </div>
         
    )
}

export default TodoForm 