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
      data: null,
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
          var data = await Resource(`/events`, params);
          var tempData = {};
          if (data.length !== 0) {
            data.map((event, index) => {
              tempData = [...event.contacts];
            })
            // data = _.take(tempData, 10);
            data = tempData;
          }
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
        let canLoadMore = true;
        var data = await Resource(`/${this.resource}`, newParams);
        
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
