import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';


// import api
import FetchAPI from '../api/APIs.js';

//Components
import Header from './Components/Header.js';
import Sidebar from './Components/Sidebar.js';

export default function OBEs(props){
  const [contact, setContact] = useState({email: '', address: '', mobile: ''});
  
  const fetchOBEs = async () => {
    try{ 
      const result = await FetchAPI.getTabRelatedList({type: 'Contact'});
      setContact(result.resultList[0]);
    }catch(e){
      console.log('Error...',e);
    }
  }

  useEffect(() => {
   fetchOBEs();
  },[]); 

      
  const handleChange  = (e) => {
    setContact({...contact, [e.target.name]: e.target.value});
  }

  const handleUpdateContact = async (e) => {
    e.preventDefault();
    try{
      const data = {
        operation: 'Update',
        type : 'Contact',
        id : contact.id,
        address : contact.address,
        mobile : contact.mobile,
        email : contact.email,
      }
        const result = await FetchAPI.addUpdateFormContent(data);
        alert('Update Successfully');
        fetchOBEs();
    }catch(e){
      console.log('Error...', e);
    }
  }


  return (
    <Fragment>
      <Header />
      <Sidebar />
        <div className="sidebar-overlay" id="sidebar-overlay" />
        <div className="sidebar-mobile-menu-handle" id="sidebar-mobile-menu-handle" />
        <div className="mobile-menu-handle" />
        <article className="content responsive-tables-page">
          <div className="title-block">
            <h1 className="title"> Contact
              {/* <Link to= {{pathname:"/Editor", state : {type:'OBE', operation: 'Add'}}}><button type="button" style={{float: 'right' }}className="btn btn-success-outline">Add New</button></Link> */}
              <Link to= {{pathname:"/bannerUpload", state : {type:'Contact'}}}><button type="button" style={{float: 'right',marginRight:"20px" }}className="btn btn-success-outline">Update Banner Image</button></Link>
            </h1>
            <p className="title-description"></p>
          </div>
            <section className="section">
              <div className="row">
                <div className="col-md-12">
                  <div className="card-title-block">
                    <h3 className="title"></h3>
                  </div>
                  <section className="example">
                    <div className="table-responsive">
                      <form onSubmit={handleUpdateContact}>
                        <div className="card card-block">
                          <div className="form-group row">
                            <label className="col-sm-2 form-control-label text-xs-right" > Address* </label>
                            <div className="col-sm-10">
                              <input className="form-control boxed" type="text" value = {contact.address} name="address" onChange={handleChange } required />                          
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-sm-2 form-control-label text-xs-right" > Mobile* </label>
                            <div className="col-sm-10">
                              <input className="form-control boxed" type="text" value = {contact.mobile} name="mobile" onChange={handleChange } required />                          
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-sm-2 form-control-label text-xs-right" > Email* </label>
                            <div className="col-sm-10">
                              <input className="form-control boxed" type="email" value = {contact.email} name="email" onChange={handleChange } required />                          
                            </div>
                          </div>
                          <div className="form-group row">
                            <div className="col-sm-10 col-sm-offset-2">
                              <button type="submit"  className="btn btn-primary">   Update </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </section>
                </div>
              </div>
            </section>
          </article>
    </Fragment>
  )
}
