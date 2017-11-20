import React from 'react'
import qs from 'query-string'

const params = qs.parse(location.search)
console.log(params)

export default () =>
<div>
  Status: {params.status || 'status'} <br/>
  Invitation ID: {params.inviteId || 'no invite iD'} <br/>
  Confirmed or Not Confirmed <br/>
  Call API etc...
</div>
