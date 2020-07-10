import React, {Suspense, lazy} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

import {APP_TOKEN} from  './api/config/Constants.js'
import PageLoader from './common/PageLoader';


const Directions = lazy(()=> import('./modules/Directions'));




const About = lazy(()=> import('./modules/AboutCompany'));
const Contact = lazy(()=> import('./modules/ContactUs'));
const Login = lazy(()=> import('./modules/login'));
const Index = lazy(()=> import('./modules/index'));
const Editor = lazy(()=> import('./modules/editor'));
const Introduction = lazy(()=> import('./modules/Introduction'));
const Aboutgc = lazy(()=> import('./modules/Aboutgc'));
const DimpleAnil = lazy(()=> import('./modules/DimpleAnil'));
const Events = lazy(()=> import('./modules/Events'));
const OBEs = lazy(()=> import('./modules/OBEs'));
const Miracles = lazy(()=> import('./modules/Miracles'));
const Prayers = lazy(()=> import('./modules/Prayers'));

const Images = lazy(()=> import('./modules/Components/images'));


function App() {
 
  return (
      <div className="main-wrapper">
        <div className="app" id="app"> 
          <Router>
            <Suspense fallback={<PageLoader />}>
              <Switch>
                {/* <Route exact path="/" component={Index} />
                <Route exact path="/editor"  render={props => { return <Editor {...props.location.state} /> }}  />
                <Route exact path="/OurTechnology" component={OurTechnology} />
                <Route exact path="/Services" component={Services} />
                <Route exact path="/Contact" component={Contact} />
                <Route exact path="/About" component={About} />
                <Route exact path="/WhyUs" component={WhyUs} />
                <Route exact path="/OurGoals" component={OurGoals} />
                <Route exact path="/OurPartners" component={OurPartners} />
                <Route exact path="/Portfolio" component={Portfolio} />                
                <Route exact path="/login" render={props => { return <Login {...props} /> }}   />      */}

                <Route exact path="/" render={() => <Redirect to="/login" /> } />
               
                <Route exact path="/Prayers" render={props => { return APP_TOKEN.notEmpty ? <Prayers {...props}/>  :  <Redirect to="/login" />  }} />

                <Route exact path="/Directions" render={props => { return APP_TOKEN.notEmpty ? <Directions  {...props}/>  :  <Redirect to="/login" />  }} />
                <Route exact path="/Introduction" render={props => { return APP_TOKEN.notEmpty ? <Introduction {...props} />  :  <Redirect to="/login" />  }} />                
                <Route exact path="/DimpleAnil" render={props => { return APP_TOKEN.notEmpty ? <DimpleAnil {...props} />  :  <Redirect to="/login" />  }} />                
                <Route exact path="/Aboutgc" render={props => { return APP_TOKEN.notEmpty ? <Aboutgc {...props} />  :  <Redirect to="/login" />  }} />                
                <Route exact path="/Events" render={props => { return APP_TOKEN.notEmpty ? <Events {...props}/>  :  <Redirect to="/login" />  }} />
                <Route exact path="/OBEs" render={props => { return APP_TOKEN.notEmpty ? <OBEs {...props}/>  :  <Redirect to="/login" />  }} />
                <Route exact path="/Miracles" render={props => { return APP_TOKEN.notEmpty ? <Miracles {...props}/>  :  <Redirect to="/login" />  }} />
                 <Route exact path="/home" render={props => { return APP_TOKEN.notEmpty ? <Index {...props}/> :  <Redirect to="/login" /> }} />
                <Route exact path="/editor"  render={props => { return APP_TOKEN.notEmpty ? <Editor {...props}  />  :  <Redirect to="/login" />  }}  />
                <Route exact path="/images"  render={props => { return APP_TOKEN.notEmpty ? <Images {...props}  />  :  <Redirect to="/login" />  }}  />

                <Route exact path="/Contact" render={props => { return APP_TOKEN.notEmpty ? <Contact {...props} />  :  <Redirect to="/login" />  }} />
                <Route exact path="/About" render={props => { return APP_TOKEN.notEmpty ? <About  {...props}/>  :  <Redirect to="/login" />  }} />
                <Route exact path="/login" render={props => { return APP_TOKEN.notEmpty ? <Redirect to="/home" /> :  <Login {...props} /> }}  />     
             

              </Switch>
            </Suspense>
          </Router>
        </div>
      </div>
  );
}

export default App;