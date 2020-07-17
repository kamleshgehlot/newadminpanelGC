import React, {useState, useEffect} from 'react';
import {isNullOrUndefined} from 'util';

// import Components
import Header from './Header';
import Sidebar from './Sidebar.js';
import FetchAPI from '../../api/APIs';
import { API_URL } from '../../api/config/Constants.js';

import FileReaders from  '../../utils/fileReader.js';



export default function BannerUpload(props) {
    const type = props.location.state.type;
  
    let pathLink = '';
    let titleText = '';
    switch(type){
        case 'Home'          :   titleText = 'Home'          ; pathLink = '/home';          break;
        case 'Event'         :   titleText = 'Event'         ; pathLink = '/Events';        break;
        case 'Miracle'       :   titleText = 'Miracle'       ; pathLink = '/Miracles';      break;
        case 'Direction'     :   titleText = 'Direction'     ; pathLink = '/Directions';    break;
        case 'OBE'           :   titleText = 'OBE'           ; pathLink = '/OBEs';          break;
        case 'Prayer'        :   titleText = 'Prayer'        ; pathLink = '/Prayers';       break;
        case 'Contact'       :   titleText = 'Contact'       ; pathLink = '/Contact';       break;        
        case 'About'         :   titleText = 'About'         ; pathLink = '/home';          break;
        case 'Blog'          :   titleText = 'Blogs'         ; pathLink = '/Blog';          break;

        case 'DimpleAnil'    :   titleText = 'DimpleAnil'    ; pathLink = '/DimpleAnil';    break;
        case 'AboutGC'       :   titleText = 'AboutGC'       ; pathLink = '/AboutGC';       break;
        case 'Introduction'  :   titleText = 'Introduction'  ; pathLink = '/Introduction';  break;
        
   }
    
  
    
  
    const [preImages, setPreImages] = useState([]);
    const [currImage, setCurrImage] = useState('');
    const [picType, setPicType] = useState(0); // 0 = no change, 1 = new upload, 2 = select from prev    
    

    useEffect(() => {
      getPrevBannerImage();
    },[]);

    const getPrevBannerImage = async ()=> {
      try{
        const result = await FetchAPI.getPrevBannerImage({type: 'banner'+type});
        setPreImages(result.imageList);
        ((!isNullOrUndefined(result.imageList) && result.imageList.length > 0) ? result.imageList : []).map(data => {
            if(data.is_active === 1){
                setCurrImage(data);
            }
        })
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
                  document.getElementById("bannerImageThumb").setAttribute('src',e.target.result);
                  document.getElementById("bannerImageThumb").setAttribute('title', "Selected image");
              }
              fileReader.readAsDataURL(file);
              setPicType(1);
          }
      } else {
          alert("Your browser doesn't support to File API")
      }
  }

  const handleFileRemove = (e) => {
      document.getElementById("bannerImageThumb").removeAttribute('src');
      document.getElementById("bannerImageThumb").removeAttribute('title');
      document.getElementById("bannerImage").value = '';
      setPicType(0);
  }

  const handleSetPrevImage = (e) => {
      let imageId = (e.target.name).split('-')[1];
      (preImages.length > 0 ? preImages : []).map(data => {
        if(data.id == Number(imageId)){
              setCurrImage(data);
              setPicType(2);
          }
      })
  }


const updateBannerProduct = async (e) => {
    e.preventDefault();
    try{
        let doc = '';
        let imageId = 0;
        if(picType === 1){
            doc = await FileReaders.toBase64(document.getElementById('bannerImage').files[0]);
        }else if(picType === 2){
            imageId = currImage.id;
        }
        const result = await FetchAPI.updateBannerProduct({
            picType : picType,
            imageId : imageId,
            document : doc,
            type : 'banner'+type,
        });
        alert ("Image Updated Successfully");
        getPrevBannerImage();
    }catch(e){
        console.log('Error...', e);
    }
}

    return (
        <div>
            <Header />
            <Sidebar />
                <div className="sidebar-overlay" id="sidebar-overlay" />
                <div className="sidebar-mobile-menu-handle" id="sidebar-mobile-menu-handle" />
                <div className="mobile-menu-handle" />
                <article className="content responsive-tables-page">
                    <div className="title-block">
                        <h3 className="title"> { ` Banner Image >>> `+ titleText}
                            <a href= {pathLink}>
                                <button type="button"  className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                    <span className="sr-only">Close</span>
                                </button>
                            </a>
                            <span className="sparkline bar" data-type="bar" />
                        </h3>
                    </div>
                    
                    <form onSubmit={updateBannerProduct} class="p-5 bg-light b-top-dark">
                        <div className="form-group row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="description">Previous Images *</label>
                                    <div className="w-100">
                                        {(preImages.length > 0 ? preImages : []).map(data => {
                                            return(
                                                <span>
                                                    <img class="imageBox" name={"prevImage-" + data.id} src={API_URL + "/api/images?path=bannerImages/" + data.image_name} onClick={handleSetPrevImage} />
                                                </span>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>                                       
                            <div class="col-md-12">
                                <div class="form-group">
                                    <div class="field" align="left">
                                        <label for="bannerImage">Choose File to upload new image</label>
                                        <input type="file" className="form-control" id="bannerImage" name="bannerImage" accept=".png, .jpg, .jpeg" onChange={handleFileChange} required={preImages.length === 0} />
                                    </div>
                                </div>
                                <span>
                                    <img className="imageThumb" id="bannerImageThumb" src={API_URL + "/api/images?path=bannerImages/" + currImage.image_name} />
                                    <br/>
                                    <span className="remove" onClick={handleFileRemove}>Remove image</span>
                                </span>
                            </div> 
                            <div class="col-md-12">
                                <input type="submit" value="Update" class="btn  px-4 btn-primary" />
                            </div> 
                        </div>
                    </form>
                </article>
            </div>
        )
}