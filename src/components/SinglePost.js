import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import renderHTML from 'react-render-html';

import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '164px',
    paddingLeft: '340px',
    height: '100%',
    width: '100%',
    overflow: 'hidden'
  }
});


class SinglePost extends Component {
  render() {
    console.log(this.props);

    const { post, classes } = this.props;
    const { title, category, author, datestamp, body } = post;

    console.log(post);

    return (
      <Paper className={classes.root}>
        <h2>{title}</h2>
        <h4>Category: {category}</h4>
        <h4>Author: {author}</h4>
        <h5>Create At: {moment(datestamp).format('DD MM YYYY')}</h5>
        <div style={{ width: '70%' }}>{renderHTML(body)}</div>
      </Paper>
    );
  }
}

const mapStateToProps = (store, ownProps) => ({
  post:
    ownProps.match.params.id && store.posts.loaded
      ? store.posts.list.find(post => post.id === ownProps.match.params.id)
      : null
});

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(SinglePost));
