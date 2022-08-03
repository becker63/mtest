import React from 'react'
import { JsonInput, JsonOutput, FormRender } from './components'
import Flume from './flume'
import Output from './output'
import Input from './input'

import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import 'react-mosaic-component/react-mosaic-component.css'
import './styles.css'

import { Mosaic, MosaicWindow } from 'react-mosaic-component'

const Window = (id, path) => (
  <MosaicWindow toolbarControls={[]} path={path} title={id}>
    {id === 'Input JSON' && <JsonInput />}
    {id === 'Form' && <FormRender />}
    {id === 'Graph' && <Flume />}
    {id === 'Output JSON' && <JsonOutput />}
    {id === 'output' && <Output />}
    {id === 'Incoming facts' && <Input />}
  </MosaicWindow>
)

export default () => (
  <Mosaic
    renderTile={Window}
    initialValue={{
      direction: 'column',
      first: {
        direction: 'row',
        first: {
          direction: 'row',
          first: 'Input JSON',
          second: 'Form',
          splitPercentage: 33
        },
        second: 'Output JSON',
        splitPercentage: 75
      },
      second: {
        direction: 'row',
        first: 'Incoming facts',
        second: 'Graph',
        splitPercentage: 20
      },
      splitPercentage: 30
    }}
    resize={{
      minimumPaneSizePercentage: 0
    }}
  />
)
