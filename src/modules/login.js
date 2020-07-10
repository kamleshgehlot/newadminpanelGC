import React from 'react';
import {useState} from 'react';
import {Redirect} from 'react-router-dom';
// import axios from 'axios';

// API
import { APP_TOKEN } from '../api/config/Constants';

// import api
import FetchAPI from '../api/APIs.js';

function Login(props) {

    const history = props.history;
    const [inputs, setInputs] = useState({username:'', password: ''});

    const handleChange  = (props) => {
      setInputs({...inputs, [props.target.name]: props.target.value});
    }
 
    const handleSubmit = async () => {
      if(inputs.username !== '' && inputs.password !== ''){
        try{      
          const result = await FetchAPI.login({
            username: inputs.username,
            password: inputs.password,            
          });
          APP_TOKEN.set({
            userName: result[0].username,
            name: result[0].name,
            token: result[0].token,
          });
          history.push('/');
      }catch(e){
          console.log('Error...',e);
        } 
    } 
}


return (
 
 <div>
        <div className="auth">
          <div className="auth-container">
            <div className="card">
              <header className="auth-header">
                <h1 className="auth-title">
                  <div className="logo">
                    <span className="l l1" />
                    <span className="l l2" />
                    <span className="l l3" />
                    <span className="l l4" />
                    <span className="l l5" />
                  </div> Admin Login
                </h1>
              </header>
              <div className="auth-content">
                <p className="text-center">LOGIN TO CONTINUE</p>
                <form id="login-form" action="/" method="GET" noValidate >
                  
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input className="form-control underlined" name="username" id="username" placeholder="Your email address" value={inputs.username}  onChange={handleChange}  required type="email" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input className="form-control underlined" name="password" id="password" placeholder="Your password" value={inputs.password}  onChange={handleChange}  required type="password" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="remember">
                      <input className="checkbox" id="remember" type="checkbox" />
                      <span>Remember me</span>
                    </label>
                   
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-block btn-primary"  onClick={handleSubmit}>Login</button>
                  </div>
                
                </form>
              </div>
            </div>
            <div className="text-center">
              <a href="index.html" className="btn btn-secondary btn-sm">
                <i className="fa fa-arrow-left" /> Go to Wesite </a>
            </div>
          </div>
        </div>
        {/* Reference block for JS */}
        <div className="ref" id="ref">
          <div className="color-primary" />
          <div className="chart">
            <div className="color-primary" />
            <div className="color-secondary" />
          </div>
        </div>
      </div>
    );
};

export default Login;
