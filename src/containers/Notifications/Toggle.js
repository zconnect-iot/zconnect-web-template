import React from 'react'
import BEMHelper from 'react-bem-helper'

import { Card } from 'zc-web/views'
import { DrawerToggle, Button } from 'zc-web/components'

import List from './List'
import './Toggle.scss'

const classes = new BEMHelper('NotificationsToggle')

/** Demonstration component for toggling and configuring notifications. */
export default class Toggle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      position: 'right',
    }

    this.setLeft = () => this.setPosition('left')
    this.setRight = () => this.setPosition('right')
    this.setTop = () => this.setPosition('top')
    this.setBottom = () => this.setPosition('bottom')
  }

  setPosition(position) {
    this.setState({ position })
  }

  render() {
    return (
      <DrawerToggle iconName="ALERT" position={this.state.position}>
        <List />

        <Card title="Position">
          <div {...classes('controls')}>
            <Button hollow {...classes('button')} action={this.setLeft}>
              Left
            </Button>
            <Button hollow {...classes('button')} action={this.setRight}>
              Right
            </Button>
            <Button hollow {...classes('button')} action={this.setTop}>
              Top
            </Button>
            <Button hollow {...classes('button')} action={this.setBottom}>
              Bottom
            </Button>
          </div>
        </Card>
      </DrawerToggle>
    )
  }
}
