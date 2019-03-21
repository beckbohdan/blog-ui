import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addPost, editPost } from '../work/posts';

import moment from 'moment';
import 'moment/locale/uk';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import uuidv4 from 'uuid/v4';


import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';



const emptyPost = {
  id: uuidv4(),
  title: '',
  author: '',
  datestamp: moment(),
  body: '',
  category: ''
};

class Editor extends Component {
  getInitState = () => {
    const { posts } = this.props;
    const { id } = this.props.match.params;

    return id ? posts.list.find(post => post.id === id) : emptyPost;
  };

  state = this.getInitState();

  componentWillReceiveProps = nextProps => {
    if (
      this.props.match.params.id &&
      !this.props.posts.loaded &&
      nextProps.posts.loaded
    ) {
      const post = nextProps.posts.list.find(
        post => post.id === this.props.match.params.id
      );
      this.setState({ ...post });
    }

    if (!nextProps.match.params.id) {
      this.setState(emptyPost);
    }
  };

  handleChange = name => ({ target: { value } }) => {
    this.setState({
      [name]: value
    });
  };

  handleTextChange = value => {
    this.setState({ body: value });
  };

  handleDateChange = date => {
    this.setState({ datestamp: date });
  };

  handleEdit = () => {
    this.props.editPost({ ...this.state });
    this.props.history.push('/posts');
  };

  handleAdd = () => {
    this.props.addPost({ ...this.state });
    this.props.history.push('/posts');
  };

  render() {
    
    const { title, author, datestamp, body, category } = this.state;
    const { categories } = this.props;
    const { id } = this.props.match.params;

    return (
      <div>
        <form style={{ width: '75%', paddingLeft: '350px' }}>
          <TextField
            label="Title"
            value={title}
            onChange={this.handleChange('title')}
            margin="normal"
          />
          <br />
          <TextField
            label="Author"
            value={author}
            onChange={this.handleChange('author')}
            margin="normal"
          />
          <br />
          <FormControl style={{ minWidth: '200px' }}>
            <InputLabel htmlFor="category">Category</InputLabel>
            <Select
              value={category}
              onChange={this.handleChange('category')}
              displayEmpty
            >
              {categories.list.map(category => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <br />
          <br />

          

          <ReactQuill
                    width="70%"
                    theme="snow"
                    value={body}
                    onChange={this.handleTextChange}  
                    modules={this.modules}
                    formats={this.formats} />
          <br />

          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DatePicker
                    value={datestamp}
                    onChange={this.handleDateChange}
                    format={'DD/MM/YYYY'} />
          </MuiPickersUtilsProvider>

          <br />
          <br />

          {id ? (
            <Button
              onClick={this.handleEdit}
              variant="contained"
              color="primary"
            >
              Edit
            </Button>
          ) : (
            <Button
              onClick={this.handleAdd}
              variant="contained"
              color="primary"
            >
              Create
            </Button>
          )}
        </form>
      </div>
    );
  }
  modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [ { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' }
      ],
      ['link', 'image'],
      ['clean']
    ]
  };

  formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image'
  ];
}
const mapStateToProps = (store, ownProps) => ({
  categories: store.categories,
  posts: store.posts
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addPost: post => dispatch(addPost(post)),

  editPost: post => dispatch(editPost(post))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);
