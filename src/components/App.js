import React from 'react'
import '../App.css'
import Signup from './Signup.jsx'
import Dashboard from './Dashboard.jsx'
import Login from './Login.jsx'
import UpdateProfile from './UpdateProfile.jsx'
import ForgotPassword from './ForgotPassword.jsx'
import { AuthProvider } from '../contexts/AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
const App = () => {
  return (


    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path='/' component={Dashboard} />
          <PrivateRoute path='/update-profile' component={UpdateProfile} />
          <Route path='/signup' component={Signup} />
          <Route path='/login' component={Login} />
          <Route path='/forgot-password' component={ForgotPassword} />
        </Switch>
      </AuthProvider>
    </Router>


  )
}

export default App
