import React, {useState, useEffect, Fragment } from 'react';
import {isNullOrUndefined} from 'util';



// import api
import FetchAPI from '../../api/APIs.js';

//Components 
import Header from './Header.js';
import Sidebar from './Sidebar.js';
import FileReaders from  '../../utils/fileReader.js';
import {getDate} from '../../utils/datetime.js';
import { API_CONSUMER, API_URL } from '../../api/config/Constants.js';

const RESET_VALUES = {
  title : '', 
  content : '', 
  link : '',
  address : '', 
  email : '', 
  mobile : '',
  date : '',
  image_name : '',
  time : '',
  location: '',
  contact : '',
};

export default function Editor(props) {
  const type = props.location.state.type;
  const operation = props.location.state.operation;
  const updatableData = operation === 'Update' ? props.location.state.data : [];

  let pathLink = '';
  let titleText = '';

  switch(type){
    case 'Event'         :   titleText = 'Event'         ; pathLink = '/Events';  break;
    case 'Direction'     :   titleText = 'Direction'     ; pathLink = '/Directions'; break;
    case 'Miracle'       :   titleText = ' Miracle'      ; pathLink = '/Miracles'; break;
    case 'Prayer'        :   titleText = ' Prayer'       ; pathLink = '/Prayers'; break;

    case 'DimpleAnil'    :   titleText = 'DimpleAnil'    ; pathLink = '/DimpleAnil'; break;
    case 'AboutGC'       :   titleText = 'AboutGC'       ; pathLink = '/AboutGC'; break;
    case 'Introduction'  :   titleText = 'Introduction'  ; pathLink = '/Introduction'; break;
    
    case 'about'         :   titleText = 'About us'      ; pathLink = '/About'; break;
    case 'contact'       :   titleText = 'Contact'       ; pathLink = '/Contact'; break;
 }
  


  const [inputs, setInputs] = useState(RESET_VALUES);

  const handleChange  = (props) => {
    setInputs({...inputs, [props.target.name]: props.target.value});
  }

  useEffect(() => {
    if(operation === 'Update'){
      setInputs({
        title : updatableData.title, 
        content : updatableData.content, 
        link : updatableData.link, 
        date: getDate(updatableData.date),
        address : updatableData.address, 
        email : updatableData.email, 
        mobile : updatableData.mobile,
        image_name : updatableData.image_name,
        time : updatableData.time,
        location: updatableData.location,
        contact : updatableData.contact,
      });
    }
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      
      let doc = document.getElementById('uploadImage').files[0];
      const data = {
        operation: operation,
        type: type,
        title: inputs.title,
        content : inputs.content,
        date : getDate(inputs.date)  === "Invalid date" ? '' : getDate(inputs.date),
        link : inputs.link,
        image : isNullOrUndefined(doc) ? '' : await FileReaders.toBase64(doc),
        time : inputs.time,
        location: inputs.location,
        contact : inputs.contact,
      }
      
      if(operation === 'Update'){
        data.id = updatableData.id;
        data.image_id = updatableData.image_id;
        data.link_id = updatableData.link_id;
      }
        const result = await FetchAPI.addUpdateFormContent(data);
        props.history.push(pathLink);
      }catch(e){
        console.log('Error...',e);
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
      <Sidebar/>
        <div className="sidebar-overlay" id="sidebar-overlay" />
        <div className="sidebar-mobile-menu-handle" id="sidebar-mobile-menu-handle" />
        <div className="mobile-menu-handle" />
        <article className="content item-editor-page">
          <div className="title-block">
            <h3 className="title"> {operation + ` ` + titleText}
              <a href= {pathLink} >
                <button type="button"  className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                  <span className="sr-only">Close</span>
                </button>
              </a>
              <span className="sparkline bar" data-type="bar" />
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="card card-block">
              {(type === 'Prayer' || type === 'Event') && <PrayerEventForm inputs = {inputs} handleChange = {handleChange} handleFileChange= {handleFileChange} type = {type} operation = {operation} /> }
              {(type !== 'Prayer' && type !== 'Event' && type !== 'Contact') && <OtherForm inputs = {inputs} handleChange = {handleChange} handleFileChange= {handleFileChange} type = {type} operation = {operation} /> }
            </div>
          </form>
        </article>
      </Fragment>
  )
}

const PrayerEventForm = ({inputs, handleChange, handleFileChange, type, operation}) => {
  return(
    <Fragment>
      <div className="form-group row">
        <label className="col-sm-2 form-control-label text-xs-right" > Title* </label>
          <div className="col-sm-10">
            <input className="form-control boxed" type="text" value = {inputs.title} name="title" onChange={handleChange } required />                          
          </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-2 form-control-label text-xs-right"> Content*  </label>
          <div className="col-sm-10">
            <textarea className="form-control boxed " rows="8" type="text" value = {inputs.content} name="content" onChange={handleChange } required />
          </div>
      </div> 
      <div className="form-group row">
        <label className="col-sm-2 form-control-label text-xs-right" > Date*  </label>
          <div className="col-sm-10">
            <input className="form-control boxed" type="date" value = {inputs.date} name="date" onChange={handleChange } required />                          
          </div>
      </div> 
      {type === 'Event' &&
        <Fragment> 
          <div className="form-group row">
            <label className="col-sm-2 form-control-label text-xs-right" > Time*  </label>
              <div className="col-sm-10">
                <input className="form-control boxed" type="time" value = {inputs.time} name="time" onChange={handleChange } required />                          
              </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 form-control-label text-xs-right" > Event location* </label>
              <div className="col-sm-10">
                <input className="form-control boxed" type="text" value = {inputs.location} name="location" onChange={handleChange } required />                          
              </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 form-control-label text-xs-right" > Contact with* </label>
              <div className="col-sm-10">
                <input className="form-control boxed" type="text" value = {inputs.contact} name="contact" onChange={handleChange } required />                          
              </div>
          </div>
        </Fragment>
      }
      <div className="form-group row">
        <label className="col-sm-2 form-control-label text-xs-right"> Link  </label>
          <div className="col-sm-10">
            <input className="form-control boxed" type="url" value = {inputs.link} name="link" onChange={handleChange } />
          </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-2 form-control-label text-xs-right" > Upload Image* </label>
          <div className="col-sm-10">
            <div class="field" align="left">
                <input type="file" className="form-control" id="uploadImage" name="uploadImage" accept=".png, .jpg, .jpeg" onChange={handleFileChange} required = {operation === 'Add'} />
            </div>
            <span>
              <img className="imageThumb" id="imageThumb" src={ API_URL + `/api/images?path=${type}/` + inputs.image_name} />
            </span>
          </div>
      </div>
      <div className="form-group row">
        <div className="col-sm-10 col-sm-offset-2">
          <button type="submit"  className="btn btn-primary"> Submit </button>
        </div>
      </div>
    </Fragment>
  )
}



const OtherForm = ({inputs, handleChange, handleFileChange, type, operation}) => {
  return(
    <Fragment>
      <div className="form-group row">
        <label className="col-sm-2 form-control-label text-xs-right" > Title* </label>
          <div className="col-sm-10">
            <input className="form-control boxed" type="text" value = {inputs.title} name="title" onChange={handleChange } required />                          
          </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-2 form-control-label text-xs-right"> Content*  </label>
          <div className="col-sm-10">
            <textarea className="form-control boxed " rows="8" type="text" value = {inputs.content} name="content" onChange={handleChange } required />
          </div>
      </div> 
      {/* <div className="form-group row">
        <label className="col-sm-2 form-control-label text-xs-right" > Date*  </label>
          <div className="col-sm-10">
            <input className="form-control boxed" type="date" value = {inputs.date} name="date" onChange={handleChange } required />                          
          </div>
      </div>  */}
      {/* <div className="form-group row">
        <label className="col-sm-2 form-control-label text-xs-right"> Link </label>
          <div className="col-sm-10">
            <input className="form-control boxed" type="url" value = {inputs.link} name="link" onChange={handleChange } />
          </div>
      </div> */}
      <div className="form-group row">
        <label className="col-sm-2 form-control-label text-xs-right" > Upload Image* </label>
          <div className="col-sm-10">
            <div class="field" align="left">
                <input type="file" className="form-control" id="uploadImage" name="uploadImage" accept=".png, .jpg, .jpeg" onChange={handleFileChange} required = {operation === 'Add'} />
            </div>
            <span>
              <img className="imageThumb" id="imageThumb" src={ API_URL + `/api/images?path=${type}/` + inputs.image_name} />
            </span>
          </div>
      </div>
      <div className="form-group row">
        <div className="col-sm-10 col-sm-offset-2">
          <button type="submit"  className="btn btn-primary"> Submit </button>
        </div>
      </div>
    </Fragment>
  )
}