import React from 'react'
import ReactDOM from 'react-dom'
import MosaicApp from './mosaic'
import Navbar from './navbar'
import { RecoilRoot } from 'recoil'

export const App = () => (
  <div id="app">
    <RecoilRoot>
      <Navbar />
      <MosaicApp />
    </RecoilRoot>
  </div>
)

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
