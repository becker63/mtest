import React, { useEffect } from 'react'

import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import 'react-mosaic-component/react-mosaic-component.css'
import './styles.css'
import { gridlayout } from './atoms'
import { Mosaic, MosaicWindow } from 'react-mosaic-component'
import { useRecoilValue } from 'recoil'

export default () => {
  const appMap = useRecoilValue(gridlayout)

  const Window = (id, path) => (
    <MosaicWindow path={path} title={id}>
      <div style={{ width: '100', height: '100%' }}>{appMap[id]}</div>
    </MosaicWindow>
  )

  const initial = {
    direction: 'column',
    first: {
      direction: 'row',
      first: {
        direction: 'row',
        first: 'jsonInput',
        second: 'formRender',
        splitPercentage: 33
      },
      second: 'jsonOutput',
      splitPercentage: 75
    },
    second: {
      direction: 'row',
      first: 'input',
      second: 'flume',
      splitPercentage: 20
    },
    splitPercentage: 30
  }

  return (
    <Mosaic
      renderTile={Window}
      initialValue={initial}
      resize={{
        minimumPaneSizePercentage: 0
      }}
    />
  )
}
