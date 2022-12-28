import React from "react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import ContactCard from "./ContactCard";
function ContactList(props){
     const inputEl = useRef("");
    const renderContactList = props.contacts.map((contact) => {
                return  <ContactCard
                           contact={contact}
                           delete={props.delete}
                           key = {contact.id}
                          /> 
        })
        const getSearchTerm = ()=>{
          props.search(inputEl.current.value);
        }
    return (
       <div className="main">
          <div align="center" style={{marginTop:"12px"}}> <h2>Contact List</h2></div>
          <div align="right">
            <Link to="/add">
                <button className="ui button blue" style={{Textalign:"center" , marginTop:"10px"}}>Add Contact</button>
            </Link>
          </div>
          <div className="ui search" style={{marginTop:"10px"}}>
               <div className="ui icon input">
                    <input ref={inputEl} value={props.searchterm} type="text" placeholder="Search Contacts" onChange={getSearchTerm}/>
                    <i className="search icon"></i>
               </div>
          </div>
          <div  className="ui celled list">{renderContactList.length > 0 ? renderContactList:"No Contacts Available"}</div>
       </div>
    );
}
export default ContactList;