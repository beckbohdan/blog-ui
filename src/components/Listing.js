import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

import Post from './Post';

import Add from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  root: {
    paddingLeft: 240
  },
  textField: {
    padding: 24,
    width: 400
  },
  button: {
    margin: theme.spacing.unit * 3

  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  icon: {
    fontSize: 50
  },
  floatRight: {
    float: 'right',
    padding: 24
  }
});

class Listing extends React.Component {
  state = {
    searchValue: '',
    sortDirection: false,
    sortBy: ''
  };

  handleSearchChange = event => {
    this.setState({
      searchValue: event.target.value
    });
  };

  handleSort = name => ({ target: { value } }) => {
    this.setState({
      ...this.state,
      sortDirection: !this.state.sortDirection,
      sortBy: name
    });
  };

  render() {
    let { classes, posts } = this.props;
    const { searchValue, sortDirection, sortBy } = this.state;

    if (searchValue.length) {
      posts = {
        ...posts,
        list: posts.list.filter(post =>
          post.title.toLowerCase().includes(searchValue.toLowerCase())
        )
      };
    }
    if (sortBy.length) {
      switch (sortBy) {
        case 'title':
          sortDirection
            ? (posts = {
                ...posts,
                list: posts.list.sort((current, next) =>
                  current.title.toLowerCase() <= next.title.toLowerCase()
                    ? -1
                    : 1
                )
              })
            : (posts = {
                ...posts,
                list: posts.list.sort((current, next) =>
                  current.title.toLowerCase() > next.title.toLowerCase()
                    ? -1
                    : 1
                )
              });
          break;
        case 'date':
          sortDirection
            ? (posts = {
                ...posts,
                list: posts.list.sort((current, next) =>
                  current.datestamp <= next.datestamp ? -1 : 1
                )
              })
            : (posts = {
                ...posts,
                list: posts.list.sort((current, next) =>
                  current.datestamp > next.datestamp ? -1 : 1
                )
              });
          break;

        default:
          return posts;
      }
    }

    return (
      <div className={classes.root}>
        <TextField
          className={classes.textField}
          margin="normal"   
          placeholder="Search posts..."
          value={searchValue}
          variant="outlined"
          onChange={this.handleSearchChange}
          InputLabelProps={{
            shrink: true,
          }}/>

        <Button
             title="Add Post" aria-label="Add Post"
             className={classnames(classes.button, classes.floatRight)}
             component={Link} to={'/post/new'}>
        <Add 
            color="primary" 
            className={classnames(classes.leftIcon, classes.icon)} />
        </Button>

        {!posts.list.length ? (
          <p>List is empty, please add post>>></p>
        ) : (
          <div>
            <Button
              className={classes.button}
              variant="contained"
              value={sortDirection}
              onClick={this.handleSort('title')}>
              Sort by Title
              {sortBy === 'title' &&
                (sortDirection ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
            </Button>

            <Button
              className={classes.button}
              variant="contained"
              value={sortDirection}
              onClick={this.handleSort('date')} >
             
              Sort by Date
              {sortBy === 'date' &&
                (sortDirection ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
            </Button>

            <Grid container spacing={24} style={{ padding: 24 }}>
              {posts.list.map(post => (
                <Grid item xs={12} sm={6} lg={4} xl={4}>
                  <Post post={post} />
                </Grid>
              ))}
            </Grid>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (store, ownProps) => ({
  posts:
    ownProps.match.params.name && store.posts.loaded
      ? {
          ...store.posts,
          list: store.posts.list.filter(
            post => post.category === ownProps.match.params.name
          )
        }
      : store.posts
});

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(Listing));
