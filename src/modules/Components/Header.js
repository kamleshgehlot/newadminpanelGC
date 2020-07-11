import React from 'react';
import { APP_TOKEN } from '../../api/config/Constants';


export default function Header(props){

  function handleLogout(){
    APP_TOKEN.remove();
    window.location.reload();
  }

  return (
    <header className="header">
      <div className="header-block header-block-collapse d-lg-none d-xl-none">
        <button className="collapse-btn" id="sidebar-collapse-btn">
          <i className="fa fa-bars" />
        </button>
      </div>
      <div className="header-block header-block-search"></div>
      <div className="header-block header-block-nav">
        <ul className="nav-profile">
          <li className="notifications new">
          </li><li className="profile dropdown" >
            <a  data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
              <span className="name" >
                <button onClick = {handleLogout} type="button" class="btn btn-default btn-sm">
                  <i class="fa fa-sign-out"> <span > Log out</span></i>
                </button>
              </span> 
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};
    