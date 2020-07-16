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

export default function WelcomeMessage(props){
  const [inputs, setInputs] = useState({content: '', link: '', image_name: ''});
  
  const fetchRecords = async () => {
    try{ 
      const result = await FetchAPI.getTabRelatedList({type: 'AboutWelcomeMessage'});
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
      if((e.target.value).length  <= 700 ) {
        setInputs({...inputs, [e.target.name]: e.target.value});
      }
    }else{
      setInputs({...inputs, [e.target.name]: e.target.value});
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try{
      let doc = document.getElementById('uploadImage').files[0];
      const data = {
        operation: 'Update',
        type : 'AboutWelcomeMessage',
        title : '',
        image : isNullOrUndefined(doc) ? '' : await FileReaders.toBase64(doc),
        date : '',
        content : inputs.content,
        link :  inputs.link,
        id : inputs.id,
        link_id : inputs.link_id,
        image_id : inputs.image_id,
      }
        const result = await FetchAPI.addUpdateFormContent(data);
        alert('Update Successfully');
        fetchRecords();
    }catch(e){
      console.log('Error...', e);
    }
  }

  const handleFileChange = (e) => {
    if (window.File && window.FileList && window.FileReader) {
        let file = e.target.files[0];
        if(file !== null && file !== undefined && file !== ""){
            let fileReader = new FileReader();
            fileReader.onload = (e) => {
                document.getElementById("imageThumb").setAttribute('src',e.target.result);
                document.getElementById("imageThumb").setAttribute('title', "Selected image");
            }
            fileReader.readAsDataURL(file);
        }
    } else {
        alert("Your browser doesn't support to File API")
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
            <h3 className="title"> About Welcome Message </h3>
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
                                <textarea id="content" className="form-control boxed" value ={inputs.content} rows="10" type="text" name="content" required onChange={handleChange} />
                                <p style={{float: 'right', color: 'red', paddingRight: '15px'}}>                                  
                                  {`Character limit: ` + (700 - inputs.content.length)}
                                </p>
                              </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-sm-2 form-control-label text-xs-right"> Video Link*  </label>
                              <div className="col-sm-10">
                                <input id="link" className="form-control boxed" value ={inputs.link} type="url" name="link" required onChange={handleChange} />
                              </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-sm-2 form-control-label text-xs-right" > Upload Image* </label>
                              <div className="col-sm-10">
                                <div class="field" align="left">
                                    <input type="file" className="form-control" id="uploadImage" name="uploadImage" accept=".png, .jpg, .jpeg" onChange={handleFileChange} />
                                </div>
                                <span>
                                  <img className="imageThumb" id="imageThumb" src={ API_URL + `/api/images?path=AboutWelcomeMessage/` + inputs.image_name} />
                                </span>
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
