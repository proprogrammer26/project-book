import React from 'react';
import { BrowserRouter,Route } from 'react-router-dom'
import Navbar from './Navbar'
import Welcome from './component/Welcome'
import User from './component/User'
import Book from './component/Book'
import AddUser from './component/AddUser'
import EditUser from './component/EditUser'
import AddBook from './component/AddBook'
import EditBook from './component/EditBook'

import { Link } from 'react-router-dom'

class App extends React.Component {
  render() {
    return(
      <BrowserRouter>
         <div className="">
          <Navbar />
          <div className="container">
            <Route exact path="/" component={Welcome} />
            <Route exact path="/user" component={User} />
            <Route exact path="/book" component={Book} />
            <Route path="/user/add" component={AddUser} />
            <Route path="/user/edit/:id" component={EditUser} />
            <Route path="/book/add" component={AddBook} />
            <Route path="/book/edit/:id" component={EditBook} />
          </div>
        </div>      
      </BrowserRouter>
    )
  }
}

export default App;
