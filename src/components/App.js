import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router-dom';

import { Header, Navigation } from './Layout/Layout';
import Editor from './Editor';
import Listing from './Listing';
import CategoriesListing from './CategoriesListing';
import SinglePost from './SinglePost';
import { getPosts, getCategories } from '../work';

class App extends React.Component {
  componentDidMount() {
    const { getPosts, getCategories } = this.props;
    Promise.all([getPosts(), getCategories()]);
  }
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Navigation />
          <Switch>
            <Route exact path="/posts" component={Listing} />
            <Route path="/posts/:id" component={SinglePost} />
            <Route exact path="/post/new" component={Editor} />
            <Route path="/post/:id" component={Editor} />
            <Route exact path="/categories" component={CategoriesListing} />
            <Route path="/categories/:name" component={Listing} />
            <Redirect to="/posts" />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (store, ownProps) => ({
  categories: store.categories,
  posts: store.posts
});

const mapDispatchToProps = dispatch => ({
  getPosts: () => dispatch(getPosts()),
  getCategories: () => dispatch(getCategories())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
