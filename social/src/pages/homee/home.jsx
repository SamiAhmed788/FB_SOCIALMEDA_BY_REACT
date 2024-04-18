import React from "react"
import "./home.css"
import Topbar from "../../components/topbar";
import { Slidebar } from "../../components/slidebar/slidebar";
import { Rightbar } from "../../components/rightbar/rightbar";
import { Feedar } from "../../components/feedar/feedar";

export  function Homee() {


    return (
    <>
<Topbar/>
<div  className="HomeContainer" >
  <Slidebar/>
  <Feedar/>
  <Rightbar/>

</div>
  </> 
  
  )
  

}


 