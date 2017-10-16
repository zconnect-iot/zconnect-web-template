import React from 'react'

import { Card } from 'zc-web/views'
import { DrawerToggle, Button } from 'zc-web/components'

import List from './List'
import style from './Toggle.scss'


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
          <div className={style.NotificationsToggle__controls}>
            <Button hollow className={style.NotificationsToggle__button} action={this.setLeft}>
              Left
            </Button>
            <Button hollow className={style.NotificationsToggle__button} action={this.setRight}>
              Right
            </Button>
            <Button hollow className={style.NotificationsToggle__button} action={this.setTop}>
              Top
            </Button>
            <Button hollow className={style.NotificationsToggle__button} action={this.setBottom}>
              Bottom
            </Button>
          </div>
        </Card>
      </DrawerToggle>
    )
  }
}
