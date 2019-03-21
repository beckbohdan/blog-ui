import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="title" color="inherit" noWrap
          style={{ flex: 1, paddingLeft: '300px' }}>
          Blog Crud
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
