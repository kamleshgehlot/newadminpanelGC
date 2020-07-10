import React, {useState, useEffect} from 'react';
import { Component } from 'react';


// import Components
import Header from './Components/Header.js';
import Sidebar from './Components/Sidebar.js';
import FetchAPI from '../api/APIs.js';
import { API_URL } from '../api/config/Constants.js';
import FileReaders from  '../utils/fileReader.js'


export default function Home() {
    const [preImages, setPreImages] = useState([]);
    const [currImage, setCurrImage] = useState('');
    const [picType, setPicType] = useState(0); // 0 = no change, 1 = new upload, 2 = select from prev    
    

    useEffect(() => {
      getPrevBannerImage();
    },[]);

    const getPrevBannerImage = async ()=> {
      try{
        const result = await FetchAPI.getPrevBannerImage({});
        setPreImages(result);
      }catch(e){
        console.log('Error...', e);
      }
    }
  //   const getSingleProductData = async () => {
  //     setIsLoading(true);
  //     try{
  //         const result = await CategoriesAPI.getSingleProductData({productId: props.location.state.productId});
  //         setProduct(result.productData[0]);
  //         setUnitList(result.units);
  //         setPreImages(result.images);
  //         ((result.images !== undefined && result.images.length > 0) ? result.images : []).map(data => {
  //             if(data.type === 1 && data.is_active === 1){
  //                 setCurrImage(data);
  //             }
  //         })
  //     }catch(e){
  //         console.log('Error...',e);
  //     }
  //     setIsLoading(false);
  // }

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
          if(data.id == imageId){
              setCurrImage(data);
              setPicType(2);
          }
      })
  }


  const updateBannerProduct = async (e) => {
    e.preventDefault();
    try{            
        // setIsLoading(true);
        // setShowAlert(false);
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
        });
        alert("updated successfully");
        // setIsLoading(false);
        // if(result === true){
        //     setAlertParams({...alertParams, ['message'] : 'Product updated successfully'});
        //     setShowAlert(true);
        // }
        // getSingleProductData();
    }catch(e){
        console.log('Error...', e);
    }
}


  // const handleSubmit = async () => {
   
  //       let formData = new FormData();
  //       formData.append('data', JSON.stringify());
  //       formData.append('images', document.getElementById('upload_image').files[0]);
  //       const response = await FetchAPI.addUpdateFormContent({ formData: formData });
       
  // }
  // const selectImage = (e) => {    
  //   if(document.getElementById('upload_image').files && document.getElementById('upload_image').files[0]){
  //     let reader = new FileReader();
  //     reader.onload = (e) => {
  //       document.getElementById('imagePreview').style.backgroundImage = 'url(' + e.target.result + ')';
  //     };
  //     reader.readAsDataURL(document.getElementById('upload_image').files[0]);
  //     document.getElementById('closeFrame').click();
  //   }
  // } 
        return (
          <div>
                 <Header />
                 <Sidebar />
                  <div className="sidebar-overlay" id="sidebar-overlay" />
                  <div className="sidebar-mobile-menu-handle" id="sidebar-mobile-menu-handle" />
                  <div className="mobile-menu-handle" />
                  <article className="content responsive-tables-page">
                    <div className="title-block">
                        <h1 className="title"> Banner Image Home Page</h1>
                        <p className="title-description"></p>
                    </div>
                      {/* <div className="form-group row">
                        <label className="col-sm-12 form-control-label text-xs-right"> Choose a New Image: </label>
                        <input type="file" name ="bannerImage" id="bannerImage" />
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-10 col-sm-offset-2">
                          <button type="button"  className="btn btn-primary" onClick={handleSubmit}>   Submit </button>
                        </div>

                      </div> */}
                      <form onSubmit={updateBannerProduct} class="p-5 bg-light b-top-dark">
                       <div className="form-group row">
                          <div class="col-md-12">
                              <div class="form-group">
                                  <label for="form-control-label text-xs-right">Previous Images *</label>
                                  <div className="w-100">
                                      {(preImages.length > 0 ? preImages : []).map(data => {
                                          return(
                                              <span>
                                                  <img class="imageBox" name={"prevImage-" + data.id} src={API_URL + "/api/images?path=images/" + data.image_name} onClick={handleSetPrevImage} />
                                              </span>
                                          )
                                      })}
                                  </div>
                              </div>
                          </div>                                       
                          <div class="col-md-12">
                              <div class="form-group">
                                  <div class="field" align="left">
                                      <label for="bannerImage">Click to upload new image for product *</label>
                                      <input type="file" class="form-control" id="bannerImage" name="bannerImage" accept=".png, .jpg, .jpeg" onChange={handleFileChange}  required={preImages.length === 0} />                                       
                                  </div>
                              </div>
                              <span>
                                  <img class="imageThumb" id="bannerImageThumb" src={ API_URL + "/api/images?path=images/" + currImage.image_name} />
                                  <br/>
                                  {/* <button type="button" className="btn btn-success-outline"onClick={handleFileRemove}>Remove Image</button> */}
                                  {/* <span class="remove" >Remove image</span> */}
                              </span>
                          </div>                                        
                          <div class="form-group p-4">
                          <button type="button" className="btn btn-success-outline"onClick={handleFileRemove}>Remove Image</button>
                          &ensp;
                              <input type="submit" value="Update" class="btn  px-4 btn-primary" />
                          </div>
                        </div>
                      </form>
                    </article>
                
                </div>
          )
}