import { atom } from 'recoil'
import React from 'react'
import { One, Two, Three } from './defualts'
import { E1, E2, E3 } from './componenets'

export const openwindows = atom({
  key: 'openwindows',
  default: {
    one: <One />,
    two: <Two />,
    three: <Three />,
    e1: <E1 />,
    e2: <E2 />,
    e3: <E3 />
  }
})

export const gridlayout = atom({
  key: 'gridlayout',
  default: {
    direction: 'column',
    first: {
      direction: 'row',
      first: 'one',
      second: 'two'
    },
    second: 'three'
  }
})
