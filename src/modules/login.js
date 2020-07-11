import React, {useState} from 'react';
import axios from 'axios';

// APIs
import FetchAPI from '../api/APIs.js';


// Components
import { APP_TOKEN, WEB_URL } from '../api/config/Constants';


function Login(props) {
    const isTokenSource = axios.CancelToken.source();    
    const history = props.history;
    const [inputs, setInputs] = useState({username:'', password: ''});

    const handleChange  = (props) => {
      setInputs({...inputs, [props.target.name]: props.target.value});
    }
 
    const handleSubmit = async (e) => {
      e.preventDefault();
        try{      
          const result = await FetchAPI.login({ 
            cancelToken : isTokenSource.token,
            username: inputs.username, 
            password: inputs.password 
          });
          if(result.errorCode === 200){
            APP_TOKEN.set(result);
            history.push('/');
          }else if(result.errorCode === 401){
            alert(result.message);
          }
      }catch(e){
        console.log('Error...',e);
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
                <form onSubmit= {handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input className="form-control underlined" name="username" id="username" placeholder="Your Username" value={inputs.username}  onChange={handleChange}  required type="text" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input className="form-control underlined" name="password" id="password" placeholder="Your password" value={inputs.password}  onChange={handleChange}  required type="password" />
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-block btn-primary">Login</button>
                  </div>
                </form>
              </div>
            </div>
            <div className="text-center">
              <a href={WEB_URL} className="btn btn-secondary btn-sm">
                <i className="fa fa-arrow-left" /> Go to Wesite </a>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Login;
