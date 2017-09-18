import React, { Component } from 'react'
import View from 'react-flexbox'

import StatCard, { DELTA_UP, DELTA_DOWN } from 'zc-web/widgets/StatCard/index'

/**
 * The Buildings view.
 */
export default (props) => (<div>
  <View row>
    <View column auto>
      <StatCard figure={162} description='Alarms this month' delta={10} reverseColor />
    </View>

    <View column auto>
      <StatCard figure={401} description='Avg. last 6 months' delta={5} deltaUnits='%' reverseColor />
    </View>

    <View column auto>
      <StatCard figure={240} description='Avg. last 12 months' delta={-20} deltaUnits='%' reverseColor />
    </View>

    <View column auto>
      <StatCard figure={1024} description='Annual avg.' delta={-50} deltaUnits='%' reverseColor />
    </View>
  </View>
</div>)
