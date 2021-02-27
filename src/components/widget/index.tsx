import React, { useRef, useState } from 'react'
import EchartBox from './echart'
import { useDispatch, useMappedState } from 'redux-react-hook'
import { Screen } from '@redux/Stores'
import { useEventListener, useDebounceFn } from 'ahooks'
import styles from './index.module.less'

const Widget = ({ id, active }: any) => {
  const dispatch = useDispatch()
  const [outline, setOutLine] = useState(false)
  const [_echarts_instance_, set_Echarts_instance_] = useState({})
  const box = useRef<HTMLDivElement | null>(null)
  const mouseoverBox = (ev: any) => {
    if (ev.target.dataset) {
      dispatch({
        type: 'change_hover',
        hover: ev.target.dataset.id,
      })
    }
    setOutLine(true)
  }
  const mouseoutBox = (ev: any) => {
    dispatch({
      type: 'change_hover',
      hover: '',
    })
    setOutLine(false)
  }
  useEventListener('mouseover', mouseoverBox, { target: box })
  useEventListener('mouseout', mouseoutBox, { target: box })
  return (
    <div
      ref={box}
      style={{
        outline: `solid ${outline && !active ? 1 : 0}px #443d75`,
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      <EchartBox
        id={id}
        _echarts_instance_={_echarts_instance_}
        set_Echarts_instance_={set_Echarts_instance_}
      />
    </div>
  )
}
export default Widget
