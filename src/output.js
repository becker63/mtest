import React from 'react'
import { useRootEngine } from 'flume'
import { useStore } from './store'
import { observer } from 'mobx-react-lite'

export default observer(() => {
  const { nodes, engine } = useStore()
  const { output1, output2, output3 } = useRootEngine(nodes, engine, {})
  const cls = 'm-2 rounded-full inline-block px-2 py-1'
  return (
    <>
      <div
        style={{ backgroundColor: output1 ? 'lime' : 'red' }}
        className={cls}>
        1
      </div>
      <br />
      <div
        style={{ backgroundColor: output2 ? 'lime' : 'red' }}
        className={cls}>
        2
      </div>
      <br />
      <div
        style={{ backgroundColor: output3 ? 'lime' : 'red' }}
        className={cls}>
        3
      </div>
    </>
  )
})
