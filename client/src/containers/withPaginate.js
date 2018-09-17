import React, { Component } from 'react'
import Resource from 'services/resource'
import _ from 'lodash';

export default function(WrappedComponent) {
  return class extends Component {
    state = {
      canLoadMore: false,
      isFetching: false,
      isError: false,
      errors: undefined,
      data: null
    }

    componentDidMount() {
      if (this.props.skip) return;
      this.fetch(this.props.resource, this.props.params);
    }

    refetch = (params) => {
      const newParams = {...this.params, ...params}
      this.fetch(this.props.resource, newParams)
    }

    fetch = async(resource, params) => {
      if (!resource) return;
      this.params = params || { limit: 10 };
      this.params.offset = 0;
      this.resource = resource;
      
      this.setState({ isFetching: true, isError: false })
      try {
        let canLoadMore = true;
        
        //--- contact list by filtering event
        if(resource === 'contacts-event') {
          var data = await Resource(`/events`, this.params.data);
          var eventContacts = [];
          if (data.length !== 0) {
            data.map((event, index) => {
              eventContacts = [ ...event.contacts ];
            })
          }

          // filtering contact list by groupId
          const contactGroupId = this.params.data.where.contactGroupId;
          if (contactGroupId) {
            var tempData = _.map(eventContacts, (contact) => {
              if (contact.contactGroupId === contactGroupId)
                return contact;
            });
            // Remove undefines from the array
            eventContacts = _.without(tempData, undefined)
          }
          
          // filtering contact list order by firstname, lastname...
          let orderBy = [];
          orderBy = params.order ? params.order.split(' ') : [];
          tempData = _.orderBy(eventContacts, orderBy[0], orderBy[1].toLowerCase());
          eventContacts = tempData;
          
          this.eventContacts = eventContacts;
          data = _.take(eventContacts, params.limit);
        } else {
          var data = await Resource(`/${this.resource}`, params)
        }

        canLoadMore = data.length === this.params.limit;
        if (data.length === 0) canLoadMore = false;
        this.setState({ isFetching: false, data, canLoadMore})
        return data;
      } catch(error) {
        console.error(error)
        this.setState({ isError: true, error, isFetching: false })
      }
    }

    fetchMore = async() => {
      if (!this.state.canLoadMore) return;
      const newParams = { ...this.params, offset: this.params.limit + this.params.offset };
      this.setState({ isFetching: true, isError: false })
      try {

        // //--- db arrange
        // const newContacts = await Resource(`/contacts`);
        // const newContactGroups = await Resource(`/contact-groups`);
        // var tempData = _.map(newContacts, (contact) => {
        //   contactID = _.filter(newContactGroups, { 'name': 'Archbishop Gianfranco Ravasi & The Rt Rev Paul Tighe'});
        //   console.log(contactID);
        // });
        // const inviteId = 1;
        // result = await API().patch(`/contacts/${inviteId}`,{ contactgroupid: 1 });        
        // console.log(result);
        
        let canLoadMore = true;
        if (this.resource === 'contacts-event') {
          let from = this.params.limit + this.params.offset;
          let to = from + this.params.limit;
          var data = this.eventContacts.slice(from, to);
        } else {
          var data = await Resource(`/${this.resource}`, newParams);
        }
        const newData = this.state.data.concat(data);
        canLoadMore = data.length === this.params.limit;
        if (data.length === 0) canLoadMore = false;
        this.setState({ isFetching: false, data: newData, canLoadMore })
        this.params.offset = this.params.limit + this.params.offset;
      } catch(error) {
        this.setState({ isError: true, error, isFetching: false })
      }

    }

    render () {
      return <WrappedComponent
        fetch={this.fetch}
        refetch={this.refetch}
        fetchMore={this.fetchMore}
        canLoadMore={this.state.canLoadMore}
        isFetching={this.state.isFetching}
        isError={this.state.isError}
        error={this.state.error}
        data={this.state.data}
        {...this.props}
      />
    }
  }
}
