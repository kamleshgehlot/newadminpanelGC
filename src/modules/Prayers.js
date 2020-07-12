import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

// import api
import FetchAPI from '../api/APIs.js';

// Components
import Header from './Components/Header.js';
import Sidebar from './Components/Sidebar.js';
import {getDateInDDMMYYYY} from '../utils/datetime.js'


export default function Prayers(props){
  const [PrayersList, setPrayersList] = useState([]);
  
  const fetchPrayers = async () => {
    try{ 
      const result = await FetchAPI.getTabRelatedList({type: 'Prayer'});
      setPrayersList(result.resultList);     
    }catch(e){
      console.log('Error...',e);
    }
  }

  useEffect(() => {
   fetchPrayers();
  },[]);

  const handleActiveDeactive = async (data) => {
    try{    
      const result = await FetchAPI.changeState({type: 'Prayer', id: data.id, is_active: data.is_active});
      setPrayersList(result.resultList);
    }catch(e){
      console.log('Error...',e);
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
            <h1 className="title"> Prayers
              <Link to= {{pathname:"/Editor", state : {type:'Prayer', operation: 'Add'}}}><button type="button" style={{float: 'right' }}className="btn btn-success-outline">Add New</button></Link>
              <Link to= {{pathname:"/bannerUpload", state : {type:'Prayer'}}}><button type="button" style={{float: 'right',marginRight:"20px" }}className="btn btn-success-outline">Update Banner Image</button></Link>
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
                      <table className="table table-striped table-bordered table-hover">
                        <thead>
                          <tr>
                            <th style={{minWidth : '70px'}}>S. No.</th>
                            <th style={{minWidth : '115px'}}>Date</th>
                            <th>Prayers </th>
                            <th style={{minWidth : '225px'}}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(PrayersList.length > 0 ? PrayersList : []).map((data, index) => {
                            return(
                              <tr>
                                <td>{index+1}</td>
                                <td>{getDateInDDMMYYYY(data.date)}</td>
                                <td>{data.title} </td>
                                <td>
                                  <Link to= {{pathname:"/Editor", state : {type:'Prayer', operation: 'Update', data: data}}} style={{textDecoration: 'none'}}> View & Update </Link>
                                    &nbsp;&nbsp;&nbsp;
                                  <Link style={{textDecoration: 'none'}} onClick={() => {handleActiveDeactive(data)}} > {data.is_active === 1 ? 'Deactive': 'Active'} </Link>
                                </td>
                              </tr>
                            )})}
                        </tbody>
                      </table>
                    </div>
                  </section>
                </div>
              </div>
            </section>
          </article>
    </Fragment>
  )
}
