import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components';
import { themeConfig } from 'styles/theme'
import Auth from 'containers/auth'

// Routes
import Events from 'routes/Events'
import Contacts from 'routes/Contacts'
import Confirm from 'routes/Confirm'
import Login from 'routes/Login'
import Docs from 'routes/Docs'
import Event from 'routes/Event'
import Contact from 'routes/Contact'
import EmailTemplates from 'routes/EmailTemplates'
import Settings from 'routes/Settings'

export default ({ store }) =>
<Provider store={store}>
  <ThemeProvider theme={themeConfig}>
    <Router>
      <div>
        <Auth />
        <Route exact path ='/' component={Events} />
        <Route exact path ='/events' component={Events} />
        <Route exact path='/contacts' component={Contacts} />
        <Route path='/contacts/:contactId' component={Contact} />
        <Route path='/docs' component={Docs} />
        <Route path='/events/:eventId' component={Event} />
        <Route path='/email-templates' component={EmailTemplates} />
        <Route path='/settings' component={Settings} />
        <Route path='/login' component={Login} />
        <Route path='/confirm' component={Confirm} />
      </div>
    </Router>
  </ThemeProvider>
</Provider>
