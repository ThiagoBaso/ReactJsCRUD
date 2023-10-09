import { useEffect, useState } from "react";
import {db} from "./FirebaseConfig.js";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
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
    if (document.getElementById("Iname").value && document.getElementById("Iemail").value){
      await addDoc(usersCollectionRef, {name: name, email: email});
      cleamInput();
      getUsesr();

    }else{
     alert("Preencha todos os campos!") 
    }
  }

  //edit user//
  const updateUser = async () => {
    if (document.getElementById("Iname").value && document.getElementById("Iemail").value){
      const UserDoc = doc(db, "users", edtUserId);
      const update = {name: name, email: email}
      await updateDoc(UserDoc, update);

      cleamInput();
      setEdt(false)
      getUsesr(); 

    }else{
     alert("Preencha todos os campos!") 
    }

  }

  //delete user//
  const deleteUser = async (id) => {
    const UserDoc = doc(db, "users", id);
    await deleteDoc(UserDoc);

    getUsesr()
  }

  //edit mode on//
  const updateMode = (id, name, email) => {
    document.getElementById("Iname").value = name;
    document.getElementById("Iemail").value = email;

    setName(document.getElementById("Iname").value);
    setEmail( document.getElementById("Iemail").value);

    setEdtUserId(id);
    setEdt(true);
  }

  //cleam inputs//
  const cleamInput = () => {
    document.getElementById("Iname").value = "";
    document.getElementById("Iemail").value = "";

    setName("");
    setEmail("");
  }

  //atualiza lista//
  const getUsesr = async() => {
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
  }

  useEffect(() => {
    getUsesr();
  },[])

  return (
    <div className="app">
      <div className="creat">
        <input id="Iname" type="text" placeholder="Nome" 
          onChange={(event) => {setName(event.target.value)}}/>

        <input id="Iemail" type="email" placeholder="Email"
          onChange={(event) => {setEmail(event.target.value)}}/>

        {edt 
        ?<div style={{display:'flex' ,gap:'10px'}}>
          <button onClick={updateUser}>Editar</button>
          <button onClick={(event) => {setEdt(false); cleamInput()}}>Cancelar</button>
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
                <button onClick={() => {deleteUser(user.id)}}>Excuir</button>
              </div>
            </div>
            
          );
        })}

      </div>
    </div>
  )
}

export default App
