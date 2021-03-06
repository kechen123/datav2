import React from 'react'
import Drag from '@components/drag'
import { Collapse } from 'antd'
import { menu, ehartOption } from '@config/menu'
import styles from './assembly.module.less'

const { Panel } = Collapse
const Assembly = () => {
  const getMenu = () => {
    return menu.map((item, index) => {
      return (
        <Panel header={item.title} key={index} className="panel">
          {getList(item.children)}
        </Panel>
      )
    })
  }
  const getList = (list) => {
    return list.map((item, index) => {
      const option = ehartOption[item.id]
      return (
        <div className={styles.item} key={index}>
          <Drag key={index} option={option} data={item}>
            <div className={styles.name}>{item.title}</div>
            <img src={item.imgPath} />
          </Drag>
        </div>
      )
    })
  }
  return (
    <>
      <Collapse accordion ghost expandIconPosition="left">
        {getMenu()}
      </Collapse>
    </>
  )
}
export default Assembly
