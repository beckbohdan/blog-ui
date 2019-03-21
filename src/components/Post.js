import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import renderHTML from 'react-render-html';

import { deletePost } from '../work/posts';

import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardActoins from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteForeverOutlined from '@material-ui/icons/DeleteForeverOutlined';
import ZoomIn from '@material-ui/icons/ZoomIn';
import EditOutlined from '@material-ui/icons/EditOutlined';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  button: {
    margin: theme.spacing.unit * 3
  },
  floatRight: {
    float: 'right'
  }
});

const Post = props => {
  const { post, classes, deletePost } = props;
  return (
    <div>
      {props.post ? (
        <Card>
          <CardContent>

            <Typography gutterBottom variant="headline" component="h2">
              {post.title.length > 40 
              ? renderHTML(post.title.substr(0, 40) + ' ...')
              : renderHTML(post.title)}
            </Typography>
            <Divider />

            <Typography component="p">
              {props.post.body.length > 300
                ? renderHTML(post.body.substr(0, 300) + ' ...')
                : renderHTML(post.body)}
            </Typography>
            <Divider />
            <br />

            <Typography
              className={classes.floatRight}
              variant="caption"
              component="span">
              created {moment(post.datestamp).fromNow()}
            </Typography>

          </CardContent>

          <CardActoins>
            <Button
              variant="contained"
              className={classes.button}
              component={Link}
              to={`/posts/${post.id}`}>
              <ZoomIn />
            </Button>

            <Button
              variant="contained"
              color="default"
              className={classes.button}
              component={Link}
              to={`/post/${post.id}`}>
              <EditOutlined />
            </Button>

            <Button
              variant="contained"
              className={classes.button}
              onClick={() => deletePost(post.id)}>
              <DeleteForeverOutlined />
            </Button>

          </CardActoins>
        </Card>
      ) : null}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  deletePost: id => dispatch(deletePost(id))
});

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(Post));
