import React from "react"
import "./slidebar.css"
import { userdata } from "../../dummmydata/users"
import {Bookmark, ChatSharp,  Group, HelpOutline,  RssFeed, School, SmartDisplay, WorkOutlined, Event} from "@mui/icons-material"
import Closefriend from "../closefriend/closefriend"
export  function Slidebar() {
  
    return (
    <div className="slidebar">
<div className="slidebarwraopper">
  <ul className="slidebaarlist">
    <li className="sidebaarlistItem">
<RssFeed className="sidebaroicom" />
<span className="sidebarlisttext">
feed
</span>
    </li>
    <li className="sidebaarlistItem">
<ChatSharp className="sidebaroicom" />
<span className="sidebarlisttext">
chats
</span>
    </li>
    <li className="sidebaarlistItem">
<SmartDisplay className="sidebaroicom" />
<span className="sidebarlisttext">
Video
</span>
    </li>
    <li className="sidebaarlistItem">
<Group className="sidebaroicom" />
<span className="sidebarlisttext">
Group
</span>
    </li>
    <li className="sidebaarlistItem">
<Bookmark className="sidebaroicom" />
<span className="sidebarlisttext">
Bookmarks
</span>
    </li>
    <li className="sidebaarlistItem">
<HelpOutline className="sidebaroicom" />
<span className="sidebarlisttext">
Questions
</span>
    </li>
    <li className="sidebaarlistItem">
<WorkOutlined className="sidebaroicom" />
<span className="sidebarlisttext">
Jobs
</span>
    </li>
    <li className="sidebaarlistItem">
<Event className="sidebaroicom" />
<span className="sidebarlisttext">
Events
</span>
    </li>
    <li className="sidebaarlistItem">
<School className="sidebaroicom" />
<span className="sidebarlisttext">
Courses
</span>
    </li>
  </ul>

<button className="sidebarbutton" >See more</button>
<hr className="sidebarHr" />
<ul className="slidebarfriendlist">

{userdata.map(u=>
  <Closefriend key={u.id} user={u}/>
    )}
</ul>
</div>
  </div> 
  
  )
  

}


 