import React from "react";
import user from "../images/updateUser.png";
import { Link } from "react-router-dom";
function ContactCard(props){
    function erase(){
        if(window.confirm("Are you sure you want to delete this contact"))
        props.delete(props.contact.id);
    }
    const {name,email,id} = props.contact;
    return (
         <div className="item">
                    <img className="ui avatar image"  src={user} alt={user}/>
                    <div className="content">
                        <Link to={`/contact/${id}`} state={{contact: props.contact}}>
                            <div className="header">{name}</div>
                            <div>{email}</div>
                        </Link>
                    </div>
                    <div align="right"> 
                         <Link to="/edit" state={{contact: props.contact}}>
                           <i style={{color:"blue",paddingBottom:"44px"}} className="edit alternate outline icon large"></i>
                         </Link>
                         <i onClick={erase} style={{color:"red",paddingBottom:"44px",marginLeft:"10px"}} className="trash alternate outline icon large"></i>
                    </div>
                   
         </div>
    );
}
export default ContactCard;