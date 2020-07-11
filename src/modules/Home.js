import React from 'react';
import { Link } from 'react-router-dom';

// import Components
import Header from './Components/Header.js';
import Sidebar from './Components/Sidebar.js';


export default function Home() {
    return (
        <div>
            <Header />
            <Sidebar />
            <div className="sidebar-overlay" id="sidebar-overlay" />
            <div className="sidebar-mobile-menu-handle" id="sidebar-mobile-menu-handle" />
            <div className="mobile-menu-handle" />
            <article className="content responsive-tables-page">
                <div className="title-block">
                    <h1 className="title"> Home
                        <Link to= {{pathname:"/bannerUpload", state : {type:'Home'}}}><button type="button" style={{float: 'right',marginRight:"20px" }}className="btn btn-success-outline">Update Home Banner Image</button></Link>
                    </h1>
                    <p className="title-description"></p>
                </div>
            </article>
        </div>
    )
}