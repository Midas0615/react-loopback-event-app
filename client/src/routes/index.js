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



export default ({ store }) =>
<Provider store={store}>
  <ThemeProvider theme={themeConfig}>
    <Router>
      <div>
        <Auth>
          <Route exact path ='/' component={Events} />
          <Route path='/contacts' component={Contacts} />
          <Route path='/contact/:contactId' component={Contact} />
          <Route path='/docs' component={Docs} />
          <Route path='/event/:eventId' component={Event} />
          <Route path='/email-templates' component={EmailTemplates} />
        </Auth>
        <Route path='/login' component={Login} />
        <Route path='/confirm' component={Confirm} />
      </div>
    </Router>
  </ThemeProvider>
</Provider>
