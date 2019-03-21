import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { connect } from 'react-redux';
import Divider from '@material-ui/core/Divider';

const drawerWidth = 220;

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },

  drawer: {
    marginTop: '60px',
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  item: {
    fontWeight: theme.typography.fontWeightRegular,
    textAlign: 'justify'
  },
  toolbar: theme.mixins.toolbar
});

class Navigation extends React.Component {
  render() {
    const { classes, categories } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />

        <Drawer
          className={classes.draver}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.toolbar} />
          <Divider />

          <List component="nav">
            <ListItem button key="0" component={Link} to={'/posts'}>
              <ListItemText className={classes.item} primary="Main page" />
            </ListItem>
            <Divider />

            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <ListItem>
                  <ListItemText
                    className={classes.heading}
                    primary="Сategories"
                  />
                </ListItem>
              </ExpansionPanelSummary>

              {categories.list.map(category => (
                <ListItem
                        button
                        key={category.id}
                        component={Link} to={`/categories/${category.name}`}>
                  <ListItemText primary={category.name} />
                </ListItem>
              ))}
            </ExpansionPanel>

            <Divider />
            <ListItem
                     button
                     key="Category"
                    component={Link} to={'/categories'}>

              <ListItemText primary="Category" />
            </ListItem>
          </List>
          <Divider />
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = (store, ownProps) => ({
  categories: store.categories
});

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(Navigation));
