import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {isNullOrUndefined} from 'util';

// import api
import FetchAPI from '../api/APIs.js';

//Components
import Header from './Components/Header.js';
import Sidebar from './Components/Sidebar.js';
import { API_URL } from '../api/config/Constants.js';
import FileReaders from  '../utils/fileReader.js';

export default function FooterMessage(props){
  const [inputs, setInputs] = useState({content: ''});
  
  const fetchRecords = async () => {
    try{ 
      const result = await FetchAPI.getTabRelatedList({type: 'AboutFooterMessage'});
      setInputs(result.resultList[0]);
    }catch(e){
      console.log('Error...',e);
    }
  }

  useEffect(() => {
    fetchRecords();
  },[]); 

      
  const handleChange  = (e) => {
    if(e.target.name === 'content'){
      if((e.target.value).length <= 150 ) {
        setInputs({...inputs, [e.target.name]: e.target.value});
      }
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try{
      const data = {
        operation: 'Update',
        type : 'AboutFooterMessage',
        title : '',
        image : '',
        date : '',
        content : inputs.content,
        link :  '',
        id : inputs.id,
        link_id : '',
        image_id : '',
      }
        const result = await FetchAPI.addUpdateFormContent(data);
        alert('Update Successfully');
        fetchRecords();
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
            <h3 className="title"> About Footer Message </h3>
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
                      <form onSubmit={handleUpdate}>
                        <div className="card card-block">
                          <div className="form-group row">
                            <label className="col-sm-2 form-control-label text-xs-right"> Message Content*  </label>
                              <div className="col-sm-10">
                                <textarea id="content" className="form-control boxed" value ={inputs.content} rows="5" type="text" name="content" required onChange={handleChange} />
                                <p style={{float: 'right', color: 'red', paddingRight: '15px'}}>
                                  {`Character limit: ` + (150 - inputs.content.length)}
                                </p>
                              </div>
                          </div>
                          <div className="form-group row">
                            <div className="col-sm-10 col-sm-offset-2">
                              <button type="submit"  className="btn btn-primary"> Update </button>
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
