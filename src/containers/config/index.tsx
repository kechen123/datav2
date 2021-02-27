import React, { useState, useRef } from 'react'
import { useEventListener } from 'ahooks'
import { useMappedState } from 'redux-react-hook'
import { Screen } from '@redux/Stores'
import ScreenConfig from './components/screen'
import styles from '@less/config.module.less'
interface Props {
  screenName: string
  size: Object
  backgroundColor: Object | string
  backgroundImage: string
  box: Object
  setBox: Function
  changeBox: Function
  changeScreen: Function
}
const mapState = (state: Screen) => ({
  active: state.active,
})
const Config = (props: Props) => {
  const { active } = useMappedState(mapState)
  const [state, setState] = useState('auto')
  const [width, setWidth] = useState(-1)
  const dom = useRef<HTMLDivElement | null>(null)
  const {
    screenName,
    size,
    backgroundColor,
    backgroundImage,
    changeScreen,
  } = props

  const upHandler = (ev: MouseEvent) => {
    setState('auto')
  }
  const downHandler = (ev: MouseEvent) => {
    setState('move')
  }
  const mousemoveHandler = (ev: any) => {
    if (state === 'move') {
      const pw = window.screen.width
      const l = ev.clientX
      setWidth(pw - l)
    }
  }
  const getConfig = () => {
    if (active.length == 0) {
      return (
        <ScreenConfig
          screenName={screenName}
          size={size}
          backgroundColor={backgroundColor}
          backgroundImage={backgroundImage}
          changeScreen={changeScreen}
        />
      )
    } else if (active.length == 1) {
      console.log(active)
    }
  }
  useEventListener('mouseup', upHandler)
  useEventListener('mousedown', downHandler, { target: dom })
  useEventListener('mousemove', mousemoveHandler)
  return (
    <>
      <div className={styles.changeWidth} ref={dom}>
        <i className={`iconfont icontuodong `}></i>
      </div>
      <div
        className={styles.config}
        style={{ width: `${width > 300 ? width + 'px' : '300px'}` }}
      >
        <div className={styles.header}>参数设置</div>
        <div className={styles.body}>{getConfig()}</div>
      </div>
    </>
  )
}
export default Config
