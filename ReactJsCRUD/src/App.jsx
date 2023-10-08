import { useEffect, useState } from "react";
import {db} from "./FirebaseConfig.js";
import { collection, getDocs, addDoc, updateDoc } from "firebase/firestore";
import "./style.scss"

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [edt, setEdt] = useState(false)

  //referencia users no banco//
  const usersCollectionRef = collection(db, "users");

  //add user//
  const creatUser = async () => {
    await addDoc(usersCollectionRef, {name: name, email: email});
  }

  //edit mode//
  const updateMode = async (id, name, email) => {
    document.getElementById("Iname").value = name;
    document.getElementById("Iemail").value = email;

    setEdt(true);
  }

  useEffect(() => {
    const getUsesr = async() => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }

    getUsesr();
  },[])

  return (
    <div className="app">
      <div className="creat">
        <input id="Iname" type="text" placeholder="Name" 
          onChange={(event) => {setName(event.target.value)}}/>

        <input id="Iemail" type="email" placeholder="Email"
          onChange={(event) => {setEmail(event.target.value)}}/>

        {edt 
        ?<div style={{display:'flex' ,gap:'10px'}}>
          <button onClick={creatUser}>Editar</button>
          <button onClick={(event) => {setEdt(false)}}>Cancelar</button>
        </div>
        :<button onClick={creatUser}>Cadastrar</button>
        } 
        
      </div>
      <div className="tabs">
        {users.map((user) => {
          return (

            <div className="row">
              <div className="infos">
                <p>Nome: {user.name}</p>
                <p>Email: {user.email}</p>
              </div>
              <div className="btns">
                <button onClick={(event) => {updateMode(user.id, user.name, user.email)}}>Editar</button>
                <button>Excuir</button>
              </div>
            </div>
            
          );
        })}

      </div>
    </div>
  )
}

export default App
