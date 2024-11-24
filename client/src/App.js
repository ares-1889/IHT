import {useEffect, useState} from "react"
import TodoItem from "./TodoItem"

//ADD API BASE

const API_BASE ="https://iht.onrender.com/todo"


function App() {

  const [items, setItems] = useState([])

  //add input state, to store the users input in this state
  const [input, setInput] = useState("")

  useEffect(() => {
    GetTodos()
  },[])

  //store the target's value into the input state
  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const GetTodos = () =>{
    fetch(API_BASE)
    .then(res => res.json())
    .then(data => setItems(data))
    .catch(err => console.log(err))
  
 
  
  
  }
   const addItem = async() =>{
    const data = await fetch(API_BASE + "/new",{
      method: "POST",
      headers:{
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        name:input,
      })
    })
    .then(res => res.json())
     await GetTodos()
     setInput('')
    }

  




  return (
   <div className="container">
      <div className="heading">
         <h1>ToDo App</h1>
      </div>

      <div className="form">
        <input type='text' value={input} onChange={handleChange}></input>
        
        <button onClick= {()=>addItem()}>
          <span>ADD</span>
        </button>
      </div>

      <div className ="todolist">
        <div className="todolist">
          {items.map((item)=> {
            const {_id, name} = item 
            return <TodoItem name={name} id={_id} setItems={setItems}/>
          })}
        </div>
      </div>
   </div>
  )
}

export default App;
