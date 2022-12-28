import React, {useEffect,useState } from 'react';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import { uuid } from 'uuidv4';
import Header from './Header';
import AddContact from './AddContact';
import EditContact from './EditContact';
import ContactList from './ContactList';
import ContactDetails from './ContactDetails';
import './App.css';
import api from '../api/contacts';
function App() {
 // const LOCAL_STORAGE_KEY = "contacts";
  const [contacts,setContacts] = useState([]);
  const [searchTerm,setSearchTerm] = useState("");
  const [searchResults,setSearchResulst] = useState([]);
  const retriveContacts = async () =>{
    const response = await api.get("/contacts");
    return response.data;
  }


  const Add = async (contact) => {
     const request = {
       id: uuid(),
       ...contact
     }
     const response = await api.post("/contacts",request);
   //  console.log(response);
     setContacts(prevContacts => {
      return [...prevContacts,response.data];
     })
  }
  const Edit = async (contact) =>{
     const response = await api.put(`/contacts/${contact.id}`,contact);
     const {id} = response.data;
     //console.log(response.status);
     setContacts(
      contacts.map((contact) => {
        return contact.id === id ? {...response.data}:contact;
      })
      );
  }
  const Delete= async (id) => {
    const response = await api.delete(`/contacts/${id}`);
    console.log(response.status);
    setContacts(prevContacts => {
      return prevContacts.filter(contact => {
        return contact.id !== id;
      });
    })
  }
 const Search = (term) =>{
   setSearchTerm(term);
    if(searchTerm !== ""){
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
      });
      setSearchResulst(newContactList);
    }else{
       setSearchResulst(contacts);
    }
 }
  useEffect(()=>{
  // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  // if(retriveContacts.length) setContacts(retriveContacts);
    const getContacts = async () => {
      const allContacts = await retriveContacts();
      if(allContacts)setContacts(allContacts);
    }
    getContacts();
  },[]);

  useEffect(()=>{
   //localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(contacts));
  },[contacts]);

  return (
    <div className='ui container'>
     <BrowserRouter>
        <Header/>
      <Routes>
          <Route path="/" element={ <ContactList contacts={searchTerm < 1 ? contacts:searchResults} delete={Delete} search={Search} searchterm={searchTerm}/>}></Route>
          <Route path="/add" element={ <AddContact addcontact={Add}/>}></Route>
          <Route path="/edit" element={<EditContact editcontact={Edit}/>}></Route>
          <Route path="/contact/:id" element={<ContactDetails/>}></Route>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
