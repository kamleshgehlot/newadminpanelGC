import React, {Suspense, lazy} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

import {APP_TOKEN} from  './api/config/Constants.js';
import PageLoader  from './common/PageLoader';

const Directions = lazy(()=> import('./modules/Directions'));
const Contact = lazy(()=> import('./modules/ContactUs'));
const Login = lazy(()=> import('./modules/login'));

const Events = lazy(()=> import('./modules/Events'));
const OBEs = lazy(()=> import('./modules/OBEs'));
const Miracles = lazy(()=> import('./modules/Miracles'));
const Prayers = lazy(()=> import('./modules/Prayers'));
const WelcomeMessage = lazy(()=> import('./modules/WelcomeMessage.js'));
const FooterMessage = lazy(()=> import('./modules/FooterMessage.js'));
const Blog = lazy(()=> import('./modules/Blog.js'));
const Home = lazy(()=> import('./modules/Home.js'));
const BannerUpload = lazy(()=> import('./modules/Components/BannerUpload.js'));
const Editor = lazy(()=> import('./modules/Components/Editor.js'));

function App() {
  return (
      <div className="main-wrapper">
        <div className="app" id="app">
          <Router>
            <Suspense fallback={ <PageLoader />}>
              <Switch>
                
                <Route exact path="/" render={() => <Redirect to="/login" /> } />
                <Route exact path="/login" render={props => { return APP_TOKEN.notEmpty ? <Redirect to="/home" /> :  <Login {...props} /> }}  />
                <Route exact path="/home" render={props => { return APP_TOKEN.notEmpty ? <Home {...props}/> :  <Redirect to="/login" /> }} />                
                <Route exact path="/bannerUpload"  render={props => { return APP_TOKEN.notEmpty ? <BannerUpload {...props}  />  :  <Redirect to="/login" />  }}  />
                <Route exact path="/Events" render={props => { return APP_TOKEN.notEmpty ? <Events {...props}/>  :  <Redirect to="/login" />  }} />
                <Route exact path="/Editor"  render={props => { return APP_TOKEN.notEmpty ? <Editor {...props}  />  :  <Redirect to="/login" />  }}  />
                <Route exact path="/Miracles" render={props => { return APP_TOKEN.notEmpty ? <Miracles {...props}/>  :  <Redirect to="/login" />  }} />
                <Route exact path="/Directions" render={props => { return APP_TOKEN.notEmpty ? <Directions  {...props}/>  :  <Redirect to="/login" />  }} />                
                <Route exact path="/OBEs" render={props => { return APP_TOKEN.notEmpty ? <OBEs {...props}/>  :  <Redirect to="/login" />  }} />
                <Route exact path="/Prayers" render={props => { return APP_TOKEN.notEmpty ? <Prayers {...props}/>  :  <Redirect to="/login" />  }} />
                <Route exact path="/Contact" render={props => { return APP_TOKEN.notEmpty ? <Contact {...props} />  :  <Redirect to="/login" />  }} />
                <Route exact path="/WelcomeMessage" render={props => { return APP_TOKEN.notEmpty ? <WelcomeMessage {...props} />  :  <Redirect to="/login" />  }} />
                <Route exact path="/FooterMessage" render={props => { return APP_TOKEN.notEmpty ? <FooterMessage {...props} />  :  <Redirect to="/login" />  }} />
                <Route exact path="/Blog" render={props => { return APP_TOKEN.notEmpty ? <Blog {...props} />  :  <Redirect to="/login" />  }} />
              </Switch>
            </Suspense>
          </Router>
        </div>
      </div>
  );
}

export default App;