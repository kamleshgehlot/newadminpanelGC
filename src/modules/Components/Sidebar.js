import React from 'react';



export default function Sidebar(){
    return (    
        <aside className="sidebar">
        <div className="sidebar-container">
        <div className="sidebar-header">
            <div className="brand">
            <div className="logo">
                <span >
               {/* <img src='./images/Gc.ico'/> */}
               </span>
              
            </div> God Consciousness
            </div>
        </div>
        <nav className="menu">
            <ul className="sidebar-menu metismenu" id="sidebar-menu">
                <li>
                    <a href="/"> <i className="fa fa-home" /> Dashboard </a>
                </li>
                <li>
                    <a href="/Events"> <i className="fa fa-th-large" /> Events </a>
                </li>
            <li>
                <a href="/Miracles">
                <i className="fa fa-area-chart" /> Miracles
                </a>
            </li>
           
            <li>
                <a href="/Directions">
                <i className="fa fa-pencil-square-o" />Direction's </a>
            </li>
            <li>
                <a href="/OBEs">
                <i className="fa fa-desktop" /> OBE'S
                </a>
            </li>
           
            <li>
               <a href="/Prayers">
                <i className="fa fa-flask" /> Prayer's
                 </a>
             </li>
             <li>
                <a href="/Contact">
                <i className="fa fa-file-text-o" /> Contact Us
                </a>
                </li>
                      
                <li>
                                    <a href="">
                                        <i class="fa fa-github-alt"></i> About <i class="fa arrow"></i>
                                    </a>
                                    <ul class="sidebar-nav">
                                        <li>
                                            <a href="/Aboutgc"> Home About GC </a>
                                        </li>
                                        <li>
                                            <a href="/Introduction"> Introduction </a>
                                        </li>
                                        <li>
                                            <a href="/DimpleAnil"> Dimple Anil </a>
                                        </li>
                                    </ul>
                                </li>
                 
            </ul>
        </nav>
        </div>
        </aside>   
    )
}