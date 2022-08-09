import React, { useEffect } from 'react'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import 'react-mosaic-component/react-mosaic-component.css'
import './styles.css'
import { gridlayout, openwindows } from './atoms'
import { Mosaic, MosaicWindow } from 'react-mosaic-component'
import { useRecoilState, useRecoilValue } from 'recoil'

export default () => {
  const appMap = useRecoilValue(openwindows)
  const [initial, setgrid] = useRecoilState(gridlayout)

  const Window = (id, path) => (
    <MosaicWindow path={path} title={id}>
      <div style={{ width: '100', height: '100%' }}>{appMap[id]}</div>
    </MosaicWindow>
  )

  const updategrid = (updatedgrid) => {
    setgrid(updatedgrid)
  }

  return (
    <Mosaic
      renderTile={Window}
      initialValue={initial}
      resize={{
        minimumPaneSizePercentage: 0
      }}
      onChange={updategrid}
    />
  )
}
