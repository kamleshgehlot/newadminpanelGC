import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {isNullOrUndefined} from 'util';

// import api
import FetchAPI from '../api/APIs.js';
import { API_URL } from '../api/config/Constants.js';

//Components
import Header from './Components/Header.js';
import Sidebar from './Components/Sidebar.js';
import FileReaders from  '../utils/fileReader.js';



export default function OBEs(props){
  const [inputs, setInputs] = useState({content: '', link: ''});
  
  const fetchOBEs = async () => {
    try{ 
      const result = await FetchAPI.getTabRelatedList({type: 'OBE'});
      setInputs(result.resultList[0]);     
    }catch(e){
      console.log('Error...',e);
    }
  }

  useEffect(() => {
   fetchOBEs();
  },[]); 

      
  const handleChange  = (e) => {
    setInputs({...inputs, [e.target.name]: e.target.value});
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

  const handleUpdateOBE = async (e) => {
    e.preventDefault();
    try{
      let doc = document.getElementById('uploadImage').files[0];
      const data = {
        operation: 'Update',
        type : 'OBE',
        title : '',
        image : isNullOrUndefined(doc) ? '' : await FileReaders.toBase64(doc),
        date : '',
        content : inputs.content,
        link :  inputs.link,
        id : inputs.id,
        image_id : inputs.image_id,
        link_id : inputs.link_id,
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
            <h1 className="title"> OBE's
              {/* <Link to= {{pathname:"/Editor", state : {type:'OBE', operation: 'Add'}}}><button type="button" style={{float: 'right' }}className="btn btn-success-outline">Add New</button></Link> */}
              <Link to= {{pathname:"/bannerUpload", state : {type:'OBE'}}}><button type="button" style={{float: 'right',marginRight:"20px" }}className="btn btn-success-outline">Update Banner Image</button></Link>
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
                      <form onSubmit={handleUpdateOBE}>
                        <div className="card card-block">
                          <div className="form-group row">
                            <label className="col-sm-2 form-control-label text-xs-right"> OBE's Content*  </label>
                              <div className="col-sm-10">
                                <textarea id="content" className="form-control boxed" value ={inputs.content} rows="20" type="text" name="content" required onChange={handleChange} />
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
                                  <img className="imageThumb" id="imageThumb" src={ API_URL + `/api/images?path=OBE/` + inputs.image_name} />
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
