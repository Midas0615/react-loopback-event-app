import API from './api'

export default async (resource, filter) => await API().get(resource, { params: { filter } })
