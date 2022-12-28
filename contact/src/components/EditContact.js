import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
function EditContact(props) {
        const Location = useLocation();
        const newcontact = Location.state.contact;
        const [contact,setContact] = useState({name:newcontact.name,email:newcontact.email,id:newcontact.id});
        const Navigate =useNavigate();
       const handleChange = (event) => {
            const {name,value} = event.target;
             setContact(prevUser => {
                return {
                              ...prevUser,
                              [name]:value
                       }
            })
       }
       const handleClick= (event) => {
           event.preventDefault();
           if(contact.name === "" || contact.email===""){
             alert("All the fields are mandatory!");
             return;
           }

           props.editcontact(contact);
           setContact({name:"",email:""});
           Navigate('/');
       }
        return (
        <div className="ui main">
                    <h2>Edit Contact</h2>
                <form className="ui form">
                   <div className="field">
                   <label>Name</label>
                   <input value={contact.name} onChange={handleChange} type="text" name="name" placeholder="Name"/>
                   </div>
                   <div className="field">
                   <label>Email</label>
                   <input value={contact.email} onChange={handleChange} type="text" name="email" placeholder="Email"/>
                   </div>
                   <button onClick={handleClick} className="ui button blue">Update</button>
              </form>
         </div>
        );
    }
export default EditContact;