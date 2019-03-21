import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuidv4 from 'uuid/v4';


import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

import { addCategory , editCategory , deleteCategory} from '../work/categories';

const styles = theme => ({
  root: {
    display: 'flex',
    paddingBottom: '50px',
    paddingTop: '100px',
    paddingLeft: '320px',
    height: '100%',
    width: '100%',
    overflow: 'hidden'
  },
  table: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class CategoriesListing extends Component {
  state = {
    isNew: true,
    categoryName: '',
    id: uuidv4()
  };

  handleInputChange = event => {
    this.setState({
      categoryName: event.target.value
    });
  };

  handleEdit = name => ({ target: { value } }) => {
    this.setState({
      categoryName: name,
      id: value,
      isNew: false
    });
  };

  handleSubmit = () => {
    const { categoryName, isNew, id } = this.state;
    isNew
      ? this.props.addCategory({ name: categoryName, id })
      : this.props.editCategory({ name: categoryName, id });
    this.setState({
      categoryName: '',
      isNew: true
    });
  };

  render() {
    const { classes, categories } = this.props;
    const { categoryName, isNew } = this.state;

    return (
      <React.Fragment>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>

                <TableCell>Category</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>

              </TableRow>
            </TableHead>

            <TableBody>
              {categories.list.map(row => (

                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>

                  <TableCell>
                    <button value={row.id} onClick={this.handleEdit(row.name)}>
                      Edit
                    </button>
                  </TableCell>

                  <TableCell>
                    <button onClick={() => this.props.deleteCategory(row.id)}>
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        <TextField
          style={{
                  width: '50%',
                  paddingLeft: '400px',
                  paddingTop: '73px'}}
          fullWidth
          margin="normal"
          placeholder="Create new category..."
          value={categoryName}
          onChange={this.handleInputChange} />

        <button
          style={{
            marginTop: '100px'
          }}
          onClick={this.handleSubmit}>
          {isNew ? 'Add' : 'Edit'}
        </button>
      </React.Fragment>
    );
  }
}

const mapStateToProps = store => ({
  categories: store.categories
});

const mapDispatchToProps = dispatch => ({
  deleteCategory: id => dispatch(deleteCategory(id)),
  addCategory: category => dispatch(addCategory(category)),
  editCategory: category => dispatch(editCategory(category))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CategoriesListing));
