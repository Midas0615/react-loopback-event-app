import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import {Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components';
import { themeConfig } from 'styles/theme'

// Routes
import Events from 'routes/Events'
import Contacts from 'routes/Contacts'
import Confirm from 'routes/Confirm'
import Login from 'routes/Login'


export default class Routes extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <ThemeProvider theme={themeConfig}>
          <Router>
            <div>
              <Route exact path ='/' component={Events} />
              <Route path='/contacts' component={Contacts} />
              <Route path='/confirm' component={Confirm} />
              <Route path='/login' component={Login} />
            </div>
          </Router>
        </ThemeProvider>
      </Provider>
    )
  }
}
