import { atom } from 'recoil'
import React from 'react'
import { JsonInput, JsonOutput, FormRender } from './components'
import Flume from './flume'
import Output from './output'
import Input from './input'

export const gridlayout = atom({
  key: 'gridlayout',
  default: {
    jsonInput: <JsonInput />,
    formRender: <FormRender />,
    flume: <Flume />,
    jsonOutput: <JsonOutput />,
    output: <Output />,
    input: <Input />
  }
})
