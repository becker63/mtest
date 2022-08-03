import React from 'react'
import { NodeEditor, RootEngine } from 'flume'
import { useStore, store } from './store'
import config from './flume.config'
import { observer } from 'mobx-react-lite'

const resolvePorts = (portType, data) => {
  switch (portType) {
    case 'string':
      return data.string
    case 'boolean':
      return data.boolean
    case 'number':
      return data.number
    default:
      return data
  }
}

const resolveCondition = ({ inputValues, node, nodeType, context }) => {
  const fact = store.getFact(inputValues.fact)

  if (inputValues.operator.operator === 'equal')
    return { boolean: fact === inputValues.value }

  if (inputValues.operator.operator === 'notEqual')
    return { boolean: fact !== inputValues.value }

  if (inputValues.operator.operator === 'lessThan')
    return { boolean: Number(fact) < Number(inputValues.value) }

  if (inputValues.operator.operator === 'lessThanInclusive')
    return { boolean: Number(fact) <= Number(inputValues.value) }

  if (inputValues.operator.operator === 'greaterThan')
    return { boolean: Number(fact) > Number(inputValues.value) }

  if (inputValues.operator.operator === 'greaterThanInclusive')
    return { boolean: Number(fact) >= Number(inputValues.value) }

  console.log('unknown:', inputValues.operator.operator)
  return { boolean: false }
}

const resolveNodes = (node, inputValues, nodeType, context) => {
  switch (node.type) {
    case 'string':
      return { string: inputValues.string }
    case 'boolean':
      return { boolean: inputValues.boolean }
    case 'number':
      return { number: inputValues.number }
    case 'user':
      return context.user
    case 'joinText':
      return { joinedText: inputValues.string1 + inputValues.string2 }
    case 'reverseBoolean':
      return { boolean: !inputValues.boolean }
    case 'and':
      return { boolean: inputValues.bool1 && inputValues.bool2 }
    case 'or':
      return { boolean: inputValues.bool1 || inputValues.bool2 }
    case 'condition':
      return resolveCondition({ inputValues, node, nodeType, context })
    default:
      return inputValues
  }
}

const engine = new RootEngine(config, resolvePorts, resolveNodes)
store.set('engine', engine)

export default observer(() => {
  const { nodes, setNodes } = useStore()

  return (
    <NodeEditor
      nodes={nodes}
      onChange={setNodes}
      portTypes={config.portTypes}
      nodeTypes={config.nodeTypes}
      defaultNodes={[
        { type: 'and', x: -100, y: -200 },
        { type: 'or', x: 0, y: 100 },
        {
          type: 'condition',
          x: -400,
          y: -420,
          inputData: {
            fact: { string: 'operatorIsTrained' },
            value: { string: 'true' }
          }
        },
        { type: 'condition', x: -400, y: -150 },
        { type: 'condition', x: -400, y: 120 },
        {
          type: 'homepage',
          x: 200,
          y: 50
        },
        {
          type: 'indicators',
          x: 350,
          y: 30
        }
      ]}
    />
  )
})
