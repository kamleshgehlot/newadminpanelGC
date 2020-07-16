import React from 'react';
import {Link} from 'react-router-dom';


export default function Sidebar(){
  return (    
    <aside className="sidebar">
      <div className="sidebar-container">
        <div className="sidebar-header" style = {{  borderBottom: '1px solid white'}}>
            <div className="brand">
              <div className="logo">
                {/* <span >
                  <img src='./images/Gc.ico'/>
               </span> */}
            </div> God Consciousness
            </div>
        </div>
        <nav className="menu">
            <ul className="sidebar-menu metismenu" id="sidebar-menu">
                <li> <a href="/"> <i className="fa fa-home" /> Dashboard </a> </li>
                <li> <a href="/Events"> <i className="fa fa-th-large" /> Events </a> </li>
                <li> <a href="/Miracles"> <i className="fa fa-area-chart" /> Miracles </a> </li>
                <li> <a href="/Directions"> <i className="fa fa-pencil-square-o" />Directions </a> </li>
                <li> <a href="/OBEs"> <i className="fa fa-desktop" /> OBE'S </a> </li>
                <li> <a href="/Prayers"> <i className="fa fa-flask" /> Prayers </a> </li>
                <li> <a href="/Contact"> <i className="fa fa-file-text-o" /> Contact Us </a> </li>
                <li> <a href="#">  <i class="fa fa-github-alt" /> About <i class="fa arrow" /> </a>
                    <ul class="sidebar-nav">
                        <li> <Link to= {{pathname:"/bannerUpload", state : {type:'About'}}}><i class="far fa-circle" /> Update About Banner </Link> </li>
                        <li> <a href="/WelcomeMessage"> <i class="far fa-circle" /> Welcome Message </a> </li>
                        <li> <a href="/FooterMessage"> <i class="far fa-circle" /> Footer Message </a> </li>
                        <li> <a href="/Introduction">  <i class="far fa-circle" /> Introduction </a> </li>
                        <li> <a href="/DimpleAnil">  <i class="far fa-circle" /> Dimple Anil </a> </li>
                    </ul>
                </li>
            </ul>
            </nav>
        </div>
    </aside>   
    )
}