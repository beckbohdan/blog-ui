import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Listing from './Listing';
import Editor from './Editor';

const styles = theme => ({
  pageLayout: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '64px',
    height: '100%',
    width: '100%',
    overflow: 'hidden'
  }
});

const Posts = ({ classes }) => (
  <main className={classes.pageLayout}>
    <Listing />
  </main>
);

export default withStyles(styles)(Posts);
