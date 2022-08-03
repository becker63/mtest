import React from 'react'
import { useStore } from './store'
import { observer } from 'mobx-react-lite'

export default observer(() => {
  const { getFact, setFact, rule } = useStore()

  return (
    <div className="pl-2">
      {rule.conditions.subFacts.map((fact, i) => (
        <label key={i} className="text-xs mt-2 block">
          {fact}
          <input
            value={getFact(fact)}
            onChange={(e) => setFact(fact, e.target.value)}
            className="border-2 text-lg p-1 w-fit mt-2 block rounded border-solid"
          />
        </label>
      ))}
    </div>
  )
})
