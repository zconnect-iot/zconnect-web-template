import React from 'react'
import { mapProps } from 'recompose'
import { ColumnDefinition, RowDefinition } from 'griddle-react'
import { noop } from 'lodash'

import { Content } from 'zc-web/components'
import { AsyncListWithState } from 'zc-web/containers'
import { Link } from 'zc-web/widgets'

import styles from './style.scss'


const Actions = props => (
  <span className={styles.Actions}>
    <Link route={`/users/${props.value}`}>View</Link>
    <Link route={`/users/${props.value}/edit`}>Edit</Link>
  </span>
)

export default class Users extends React.Component {
  getAsyncListRef = ref => (this.list = ref)
  refresh = () => (this.list ? this.list.props.fetchResults() : noop())
  render() {
    const actions = [
      { title: '', icon: 'REFRESH', action: this.refresh },
      { title: 'Add', icon: 'ADD', route: '/users/add' },
    ]
    return (
      <Content
        title="All Users"
        actionItems={actions}
      >
        <AsyncListWithState
          endpoint="getUsers"
          storeKey="users"
          hideFilter
          getRef={this.getAsyncListRef}
        >
          <RowDefinition>
            <ColumnDefinition
              id="first_name"
              title="First Name"
            />
            <ColumnDefinition
              id="last_name"
              title="Last Name"
            />
            <ColumnDefinition
              id="email"
              title="E-mail"
            />
            <ColumnDefinition
              key="actions"
              id="id"
              title="Actions"
              customComponent={Actions}
            />
          </RowDefinition>
        </AsyncListWithState>
      </Content>
    )
  }
}
