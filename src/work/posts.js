import axios from 'axios';
import moment from 'moment';
import { _local, _port, _post } from './config';

export const getPosts = () => {
  return dispatch => {
    axios
      .get(`${_local}${_port}${_post}`)     //(`https://jsonplaceholder.typicode.com/posts`)
      .then(response => {
        const posts = response.data.map(post => ({
          ...post,
          datestamp: moment(post.datestamp)
        }));
        dispatch({
          type: 'ACTION_GET_POSTS',
          payload: posts
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};

export const addPost = post => {
  return dispatch => {
    axios
      .post(`${_local}${_port}${_post}`, post)   //(`https://jsonplaceholder.typicode.com/posts`, {post})
      .then(response => {
        dispatch({
          type: 'ACTION_ADD_POST',
          payload: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};

export const editPost = post => {
  return dispatch => {
    axios
      .put(`${_local}${_port}${_post}${post.id}`, post) //(`https://jsonplaceholder.typicode.com/posts/${id}`, {editPost})
      .then(response => {
        dispatch({
          type: 'ACTION_EDIT_POST',
          payload: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};

export const deletePost = id => {               
  return dispatch => {
    axios
      .delete(`${_local}${_port}${_post}${id}`)  //(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(response => {
        dispatch({
          type: 'ACTION_DELETE_POST',
          payload: id
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};

