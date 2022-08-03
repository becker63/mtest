import { observer } from 'mobx-react-lite'
import React from 'react'
import { useStore } from './store'

export const JsonInput = observer(() => {
  const { dataJSONeditor, setData, error } = useStore()
  return (
    <textarea
      className="w-full h-full p-2 whitespace-pre font-mono text-xs"
      value={dataJSONeditor}
      onChange={setData}
      style={error ? { color: 'red' } : {}}
    />
  )
})

export const JsonOutput = observer(() => {
  const { dataJSON, copyOutputToInput } = useStore()
  return (
    <div className="w-full h-full p-2" style={{ overflow: 'auto' }}>
      <button
        className="border-2 rounded px-2 py-0"
        onClick={copyOutputToInput}>
        copy to input
      </button>
      <div className="whitespace-pre font-mono text-xs">{dataJSON}</div>
    </div>
  )
})

const OperatorSelect = observer(({ condition, field }) => {
  return (
    <select
      value={condition[field]}
      className="border w-2/12 p-1 mb-px rounded"
      onChange={(e) => condition.set(field, e.target.value)}>
      <option>equal</option>
      <option>notEqual</option>
      <option>lessThan</option>
      <option>lessThanInclusive</option>
      <option>greaterThan</option>
      <option>greaterThanInclusive</option>
      <option>in</option>
      <option>notIn</option>
      <option>contains</option>
      <option>doesNotContain</option>
    </select>
  )
})

const Input = observer(({ condition, field }) => {
  if (field === 'operator')
    return <OperatorSelect condition={condition} field={field} />
  return (
    <input
      value={condition[field]}
      className="border w-5/12 p-1 mb-px rounded"
      onChange={(e) => condition.set(field, e.target.value)}
    />
  )
})

const Event = observer(() => {
  const {
    rule: { event }
  } = useStore()
  return (
    <div className="mt-4">
      <div className="font-bold text-xl">Event</div>
      Type: <Input condition={event} field="type" />
    </div>
  )
})

const Condition = observer(({ condition }) => {
  if (condition.all) {
    return (
      <div className="shadow p-3 pb-2 hover:shadow-outline rounded">
        {condition.all.map((condition_, i) => (
          <>
            <Condition key={i} condition={condition_} />
            {condition.all.length - 1 > i && <b>AND</b>}
          </>
        ))}
        <button
          className="border-2 rounded mx-auto px-6 py-1 block"
          onClick={condition.cloneLast}>
          +
        </button>
      </div>
    )
  }

  if (condition.any) {
    return (
      <div className="shadow p-3 pb-2 hover:shadow-outline rounded">
        {condition.any.map((condition_, i) => (
          <>
            <Condition key={i} condition={condition_} />
            {condition.any.length - 1 > i && <b>OR</b>}
          </>
        ))}
      </div>
    )
  }

  if (condition.fact || condition.operator || condition.value)
    return (
      <div className="p-2 mb-px rounded">
        <Input condition={condition} field="fact" />
        <Input condition={condition} field="operator" />
        <Input condition={condition} field="value" />
      </div>
    )

  return null
})

const Conditions = observer(() => {
  const {
    rule: { conditions }
  } = useStore()

  return <Condition condition={conditions} />
})

export const FormRender = observer(() => (
  <div className="w-full h-full p-3" style={{ overflow: 'auto' }}>
    <div className="font-bold text-xl">Conditions</div>
    <Conditions />
    <Event />
  </div>
))
