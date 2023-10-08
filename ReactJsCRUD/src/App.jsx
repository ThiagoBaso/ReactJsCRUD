import { useEffect, useState } from "react";
import {db} from "./FirebaseConfig.js";
import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";
import "./style.scss"

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [edt, setEdt] = useState(false)
  const [edtUserId, setEdtUserId] = useState("")

  //referencia users no banco//
  const usersCollectionRef = collection(db, "users");

  //add user//
  const creatUser = async () => {
    await addDoc(usersCollectionRef, {name: name, email: email});
  }

  const updateUser = async () => {
    const UserDoc = doc(db, "users", edtUserId);
    const update = {name: name, email: email}
    console.log(edtUserId, name)

    await updateDoc(UserDoc, update);
  }

  //edit mode//
  const updateMode = (id, name, email) => {
    document.getElementById("Iname").value = name;
    document.getElementById("Iemail").value = email;

    setEdtUserId(id)

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
          <button onClick={updateUser}>Editar</button>
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
