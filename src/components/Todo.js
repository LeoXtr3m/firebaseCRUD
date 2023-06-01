import { IconButton, ListItem, ListItemText } from "@mui/material"
import moment from "moment/moment" 
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {deleteDoc, doc} from "@firebase/firestore"
import { db } from "../../firebase"
import { useContext, useState } from "react";
import { TodoContext } from "@/pages/TodoContext";


const Todo = ({id, timestamp, title, detail}) => {
    console.log("----Funcion Todo------")  
    /* const {showAlert, setTodo} = useState({id:'', title:'', detail:'', timestamp:''}) */
    const {showAlert, setTodo} = useContext(TodoContext)

    const deleteTodo = async (id, e) => {
        e.stopPropagation();
        const docRef = doc(db, "todos", id);
        await deleteDoc(docRef);
        /* showAlert('error', `Todo with id ${id} deleted successfully`) */
    }




    return ( 
        <>
        <span sx={{mt:3, boxShadow:3}} 
              style={{backgroundColor:"#FAFAFA", display:"flex", width:"500px", border:"solid 1px brown", margin:"10px", borderRadius: "5px", padding:"5px"}} 
              /* class="flex w-60"  */ 
              onClick={() => setTodo({id, title, detail, timestamp})}>
            <div style={{width:"100%"}}>
                <h3>{title}</h3>
                <h3>{moment(timestamp).format("MMMM, do, yyyy")}</h3>
            </div>
            <div style={{width:"100px"}}>
                <IconButton onClick = {e => deleteTodo(id, e)}>
                    <DeleteIcon/>
                </IconButton>
                <IconButton>
                    <MoreVertIcon/>
                </IconButton>
            </div> 
        </span>
        
        {/* <ListItem onClick={() => setTodo({id, title, detail, timestamp})}
            sx={{mt:3, boxShadow:3}}
            style={{backgroundColor:"#FAFAFA"}}
            secondaryAction={
                                <>
                                    <IconButton onClick = {e => deleteTodo(id, e)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                    <IconButton>
                                        <MoreVertIcon/>
                                    </IconButton>
                                </>
                            }
        >

            <ListItemText  
                 
                primary= {title}
                secondary= {moment(timestamp).format("MMMM, do, yyyy")}
            />

        </ListItem> */}
        </>
        
    )
}

export default Todo 