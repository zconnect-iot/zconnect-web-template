import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

import User from 'routes/user'
import AddUser from 'routes/addUser'
import EditUser from 'routes/editUser'

import Users from './Users'


const UsersSwitch = () => (
  <Switch>
    <Route path="/users" exact component={Users} />
    <Route path="/users/add" exact component={AddUser} />
    <Route path="/users/:userId" exact component={User} />
    <Route path="/users/:userId/edit" exact component={EditUser} />
  </Switch>
)

export default withRouter(UsersSwitch)
