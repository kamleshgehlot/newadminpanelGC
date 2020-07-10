import React, {useState, useEffect } from 'react';
import Header from './Components/Header.js';
import Sidebar from './Components/Sidebar.js';



// import api
import FetchAPI from '../api/APIs.js';

export default function Editor(mainProps) {
  const props = mainProps.location.state;
  const type = props.type;
  const operation = props.operation;

 console.log(props)

  let pathLink = '';
  let titleText = '';
  switch(type){

    case 'Events'        :   titleText = 'Events'        ; pathLink = '/Events';  break;
    case 'Directions'    :   titleText = 'Directions'    ; pathLink = '/Directions'; break;
    case 'DimpleAnil'    :   titleText = 'DimpleAnil'    ; pathLink = '/DimpleAnil'; break;
    case 'AboutGC'       :   titleText = 'AboutGC'       ; pathLink = '/AboutGC'; break;
    case 'Introduction'  :   titleText = 'Introduction'  ; pathLink = '/Introduction'; break;
    case 'OBEs'          :   titleText = 'OBEs'          ; pathLink = '/OBEs'; break;
    case 'about'         :   titleText = 'About us'      ; pathLink = '/About'; break;
    case 'contact'       :   titleText = 'Contact'       ; pathLink = '/Contact'; break;
    case 'Miracles'      :   titleText = ' Miracles'     ; pathLink = '/Miracles'; break;
    case 'Prayers'       :   titleText = ' Prayers'      ; pathLink = '/Prayers'; break;
 }
  


  const [inputs, setInputs] = useState({name:'', content: '', link: '', address:'', email:'', mobile: '',event_date:'',video:''});  

  const handleChange  = (props) => {
    setInputs({...inputs, [props.target.name]: props.target.value});
  }

  useEffect(() => {
    if(Object.keys(props)[2] === 'data'){
      setInputs({name: props.data.title, content: props.data.content, link: props.data.link, address: props.data.address , email: props.data.email, mobile: props.data.mobile,event_date: props.event_date ,video:props.video })
    }
  },[])

  const selectImage = (e) => {    
    if(document.getElementById('upload_image').files && document.getElementById('upload_image').files[0]){
      let reader = new FileReader();
      reader.onload = (e) => {
        document.getElementById('imagePreview').style.backgroundImage = 'url(' + e.target.result + ')';
      };
      reader.readAsDataURL(document.getElementById('upload_image').files[0]);
      document.getElementById('closeFrame').click();
    }
  }

  const handleContactSubmit  = async  ()=> {
    if(inputs.content !=='' && inputs.address !== '' && inputs.email !== ''){
      const data = {
        id : props.data.id,
        operation: operation,
        type: type,
        address: inputs.address,
        mobile: inputs.mobile,
        email: inputs.email,
      }
      let formData = new FormData();
      formData.append('data', JSON.stringify(data));
      const response = await FetchAPI.addUpdateFormContent({ formData: formData });
      if(response.is_successful === true){
        mainProps.history.push(pathLink);
      }
    }else{
      alert('Need all fields')
    }
  }

  const handleSubmit = async () => {
    if(inputs.name !=='' && inputs.content !== ''){
      try{
        const data = {
              operation: operation,
              type: type,
              title: inputs.name,
              content: inputs.content,
              event_date:inputs.event_date,
              link: inputs.link,
              video:inputs.video,
            }
        if(operation === 'update'){
          data.id = props.data.id;
          data.image_id = props.data.image_id;
          data.link_id = props.data.link_id;
          data.event_date = props.data.event_date;
          data.video = props.video;
        }
        let formData = new FormData();
        formData.append('data', JSON.stringify(data));
        formData.append('images', document.getElementById('upload_image').files[0]);
        const response = await FetchAPI.addUpdateFormContent({ formData: formData });
        if(response.is_successful === true){
            mainProps.history.push(pathLink);
        }else {
          if(operation === 'add'){
            alert('operation failed');
          }            
        }
      }catch(e){
        console.log('Error...',e);
      }
    }else{
      alert('Need all fields')
    }

  }

        return (
         <div>

               <Header {...mainProps}/>
                <Sidebar/>  
            
                <div>
                <div className="sidebar-overlay" id="sidebar-overlay" />
                <div className="sidebar-mobile-menu-handle" id="sidebar-mobile-menu-handle" />
                <div className="mobile-menu-handle" />
                <article className="content item-editor-page">
                  <div className="title-block">
                    
                    <h3 className="title"> 
                    {titleText}


                    <a href= {pathLink} >
                    <button type="button"  className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">×</span>
                          <span className="sr-only">Close</span>
                        
                        </button>
                    </a>
                    
                                        
                    <span className="sparkline bar" data-type="bar" />
                    </h3>
                  </div>
                  <form name="item">
                    <div className="card card-block">
                      {type === 'contact' ? 
                      <div>
                      <div className="form-group row">
                        <label className="col-sm-2 form-control-label text-xs-right" > Address: </label>
                        <div className="col-sm-10">
                          <input className="form-control boxed" placeholder type="text" value = {inputs.address} name="address" onChange={handleChange } />                          
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 form-control-label text-xs-right" > Mobile: </label>
                        <div className="col-sm-10">
                          <input className="form-control boxed" placeholder type="text" value = {inputs.mobile} name="mobile" onChange={handleChange } />                          
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 form-control-label text-xs-right" > Email: </label>
                        <div className="col-sm-10">
                          <input className="form-control boxed" placeholder type="text" value = {inputs.email} name="email" onChange={handleChange } />                          
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-10 col-sm-offset-2">
                          <button type="button"  className="btn btn-primary" onClick={handleContactSubmit}>   Submit </button>
                        </div>
                      </div>
                      </div>
                      :
                      <div>
                      <div className="form-group row">
                        <label className="col-sm-2 form-control-label text-xs-right" > Name: </label>
                        <div className="col-sm-10">
                          <input className="form-control boxed" placeholder type="text" value = {inputs.name} name="name" onChange={handleChange } />                          
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 form-control-label text-xs-right"> Content: </label>
                        <div className="col-sm-10">
                          <textarea className="form-control boxed " rows="8" type="text" value = {inputs.content} name="content" onChange={handleChange } />
                        </div>
                      </div> 
                        <div className="form-group row">

                        {type === 'Events' || type === 'Prayers'  ? 
                        <label  value = {inputs.event_date}  placeholder type="DD/MM/YYYY" className="col-sm-2 form-control-label text-xs-right"> Date: </label>
                              :
                          <label className="col-sm-2 form-control-label text-xs-right"> Link: </label>
                                }
                        
                        <div className="col-sm-10">
                        <input className="form-control boxed" placeholder type="text" value = {inputs.link} name="link" onChange={handleChange } />
                        </div>
                      </div> 
                        
                               
                      <div className="form-group row">
                      {type === 'AboutGC'  ? 
                         
                         <label value = {inputs.video}className="col-sm-2 form-control-label text-xs-right"> Video: </label>
                         :
                        <label className="col-sm-2 form-control-label text-xs-right"> Images: </label>
                       
                              }

                       <div className="col-sm-10">
                          <div className="images-container">
                            <div className="image-container">                              
                              <div id = "imagePreview" className="image" style={{backgroundImage: ``}} />  
                              {/* <a href={API_URL + "/api/download?path=customer/" + inputs.id_proof }  download >{inputs.id_proof}</a> */}
                              <img src=''/>
                            </div>                           
                            <a href="#" className="add-image" data-toggle="modal" data-target="#modal-media">
                              <div className="image-container new">
                                <div className="image">
                                  <i className="fa fa-plus" />
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-10 col-sm-offset-2">
                          <button type="button"  className="btn btn-primary" onClick={handleSubmit}> Submit </button>
                        </div>
                      </div>
                    </div>}
                    </div>
                  </form>
                </article>
                <div className="modal fade" id="modal-media">
                  <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h4 className="modal-title">Choose Image</h4>
                        <button type="button" id="closeFrame" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">×</span>
                          <span className="sr-only">Close</span>
                        </button>
                      </div>
                      <div className="modal-body modal-tab-container">
                        <ul className="nav nav-tabs modal-tabs" role="tablist">
                          <li className="nav-item">
                            <a className="nav-link active" href="#upload" data-toggle="tab" role="tab">Upload</a>
                          </li>
                        </ul>
                        <div className="tab-content modal-tab-content">                       
                            <div className="upload-container">
                              <div id="dropzone">
                              <form className="dropzone needsclick dz-clickable" id="demo-upload">
                                  <div className="dz-message-block">
                                    <div className="dz-message ">
                                      <input accept="image/gif, image/jpeg, image/png, image/jpg"  style ={{display: 'none'}} id="upload_image" type="file" onChange ={(e) => {selectImage(e)}} />
                                        <label htmlFor="upload_image">
                                          Click to upload.
                                        </label>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>              
              </div>
            </div>
            );
        };