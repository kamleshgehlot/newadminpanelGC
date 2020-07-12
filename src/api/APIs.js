import axios from 'axios';
import * as c from './config/Constants';
import checkError from './config/HttpClient';
import {authHeader} from './config/AuthHeader.js';

const PARAMS = ({ methodType = 'GET' }) => ({
  method: methodType,
  // headers: { 'content-type': 'application/json', },  
  headers: authHeader(),
});

export default {

  updateBannerProduct:async ({...payload }) => {

    const URL = `${c.API_CONSUMER}/api/updateBannerProduct`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'POST' }), {
        data: payload,
      }),
    );
      return data;
    } catch (error) {
      checkError(error);
      throw error;
    }
  },


  login:async ({...payload }) => {
    const URL = `${c.API_CONSUMER}/api/login`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'POST' }), {
          data: payload,
        }),
      );
      return data;
    } catch (error) {
      checkError(error);
      throw error;
    }
  },

  addUpdateFormContent:async ({...payload }) => {
    const URL = `${c.API_CONSUMER}/api/addUpdateFormContent`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'POST' }), {
        data: payload,
      }),
    );
      return data;
    } catch (error) {
      checkError(error);
      throw error;
    }
  },


  getPrevBannerImage:async ({...payload }) => {
    const URL = `${c.API_CONSUMER}/api/getPrevBannerImage`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'POST' }), {
        data: payload,
      }),
    );
      return data;
    } catch (error) {
      checkError(error);
      throw error;
    }
  },

  
  getTabRelatedList:async ({...payload }) => {
    const URL = `${c.API_CONSUMER}/api/getTabRelatedList`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'POST' }), {
        data: payload,
      }),
    );
      return data;
    } catch (error) {
      checkError(error);
      throw error;
    }
  },

  changeState:async ({...payload }) => {
    const URL = `${c.API_CONSUMER}/api/changeState`;
    try {
      const { data } = await axios(URL, Object.assign({}, PARAMS({ methodType: 'POST' }), {
        data: payload,
      }),
    );
      return data;
    } catch (error) {
      checkError(error);
      throw error;
    }
  },
  
};

