import axios from 'axios';
import { _local, _port, _category } from './config';

export const getCategories = () => {
  return dispatch => {
    axios
      .get(`${_local}${_port}${_category}`)
      .then(response => {
        dispatch({
          type: 'ACTION_GET_CATEGORIES',
          payload: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};

export const addCategory = category => {
  return dispatch => {
    axios
      .post(`${_local}${_port}${_category}`, category)
      .then(response => {
        dispatch({
          type: 'ACTION_ADD_CATEGORIES',
          payload: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};

export const editCategory = category => {
  return dispatch => {
    axios
      .put(`${_local}${_port}${_category}${category.id}`, category)
      .then(response => {
        dispatch({
          type: 'ACTION_EDIT_CATEGORIES',
          payload: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};


export const deleteCategory = id => {
  return dispatch => {
    axios
      .delete(`${_local}${_port}${_category}${id}`)
      .then(response => {
        dispatch({
          type: 'ACTION_DELETE_CATEGORIES',
          payload: id
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};

