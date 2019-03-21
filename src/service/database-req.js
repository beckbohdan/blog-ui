import axios from 'axios';

export default class Database {

  _local = `http://localhost:`;
  _port = '3000';

  getAllPosts = async () => {
    const res = await axios.get(`${this._local}${this._port}/posts/`);
    return res;
  };

  addPost = async post => {
    const res = await axios.post(`${this._local}${this._port}/posts/`, post);
    return res;
  };

  updatePost = async (id, post) => {
    const res = await axios.put(
      `${this._local}${this._port}/posts/${id}`,
      post
    );
    return res;
  };

  deletePost = async id => {
    const res = await axios.delete(`${this._local}${this._port}/posts/${id}`);
    return res;
  };
}