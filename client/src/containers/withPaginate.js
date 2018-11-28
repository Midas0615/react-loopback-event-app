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
      if (this.props.resource == 'invites' && this.params.data)
        this.fetch('invite-contacts', newParams);
      else
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

        /* ======================
        * EVENT-CONTACTS FILTER
        =========================*/
        //--- contact list by filtering event
        if(resource === 'event-contacts') {
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

        } else if (resource === 'invites') {
          var data = await Resource(`/${this.resource}`, params)
          // event page -> contact page !important
          if (params.include === 'contact') {
            _.remove(data, function(item) { // show undeleted contact as default
              return item.contact.deleted === true;
            });
          }
          // contact page -> event page !important
          if (params.include === 'event') {
            _.remove(data, function(item) { // show undeleted event as default
              return item.event.deleted === true;
            });
          }
        }
        /* ======================
        * INVITE-CONTACTS FILTER
        =========================*/
        else if (resource === 'invite-contacts') {
          this.params.data.where.eventId = this.props.event.id;
          var data = await Resource(`/invites`, this.params.data);
          
          // filtering contact list by filter type
          const filterType = this.params.contactFilter.filterType;
          const filterValue = this.params.contactFilter.filterValue;
          if (filterType && filterValue) {
            _.remove(data, function(item) { // show undeleted contact as default
              return !_.includes(item.contact[filterType], filterValue);
            });
            
            // var tempData = _.map(data, (item) => {
            //   if (_.includes(item.contact[filterType], filterValue))
            //     return item;
            // });
            // // Remove undefines from the array
            // data = _.without(tempData, undefined)
          }

          // filtering contact list by groupId
          if (this.params.contactFilter.contactGroupId) {
            var tempData = _.map(data, (item) => {
              if (item.contact.contactGroupId === this.params.contactFilter.contactGroupId)
                return item;
            });
            // Remove undefines from the array
            data = _.without(tempData, undefined)
          }

          // filtering contact list by deleted
          if (!this.params.contactFilter.deleted) {
            this.params.contactFilter.deleted = false;
          }
          var tempData = _.map(data, (item) => {
            if (item.contact.deleted === this.params.contactFilter.deleted)
              return item;
          });
          // Remove undefines from the array
          data = _.without(tempData, undefined)
          
          // filtering contact list order by firstname, lastname...
          let orderBy = [];
          orderBy = params.order ? params.order.split(' ') : [];
          data = _.orderBy(data, function(item) {
            return item.contact[orderBy[0]]
          }, orderBy[1].toLowerCase());

          this.inviteContacts = data; // used to fetch more
          data = _.take(data, params.limit);
          
        }
        else {
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
        let canLoadMore = true;
        if (this.resource === 'event-contacts') {
          let from = this.params.limit + this.params.offset;
          let to = from + this.params.limit;
          var data = this.eventContacts.slice(from, to);
        } else if (this.resource === 'invite-contacts') {
          let from = this.params.limit + this.params.offset;
          let to = from + this.params.limit;
          var data = this.inviteContacts.slice(from, to);
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
