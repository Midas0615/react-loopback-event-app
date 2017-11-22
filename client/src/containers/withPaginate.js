import React, { Component } from 'react'
import Resource from 'services/resource'

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
      this.fetch(this.props.resource, this.props.params)
    }

    fetch = async(resource, params) => {
      this.params = params || { limit: 10 };
      this.params.offset = 0;
      this.resource = resource;
      this.setState({ isFetching: true, isError: false })
      try {
        const data = await Resource(`/${this.resource}`, params)
        console.log('LENGTH', data.length);
        console.log('LIMIT', this.params.limit);
        this.setState({ isFetching: false, data, canLoadMore: data.length <= this.params.limit ? true :false })
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
        const data = await Resource(`/${this.resource}`, newParams);
        const newData = this.state.data.concat(data);
        if (data.length <= this.params.limit) canLoadMore = true;
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
