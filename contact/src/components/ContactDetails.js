import React from "react";
import user from "../images/user.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
function ContactDetails(){
    const Location = useLocation();
    const contact = Location.state.contact;
    const {name,email} = contact;
    return (
        <div className="main">
          <div className="ui card centered">
               <div className="image">
                  <img src={user} alt="user" />
               </div>
               <div className="content">
                   <div className="header">{name}</div>
                   <div className="description">{email}</div>
               </div>
          </div>
               <div className="center-div" style={{marginLeft:"43%"}}>
                 <Link to="/">
                    <button className="ui button blue center">Back to contact List</button>
                 </Link>
               </div>
        </div>
    );
}
export default ContactDetails;