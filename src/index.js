import React from 'react'
import ReactDOM from 'react-dom'
import MosaicApp from './mosaic'

export const App = () => (
  <div id="app">
    <MosaicApp />
  </div>
)

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
