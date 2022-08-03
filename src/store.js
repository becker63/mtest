import { types } from 'mobx-state-tree'
import { createContext, useContext } from 'react'

const jsonDefaultData = JSON.stringify(
  {
    conditions: {
      any: [
        {
          all: [
            {
              fact: 'operatorIsTrained',
              operator: 'equal',
              value: 'true'
            },
            {
              fact: 'zone',
              operator: 'equal',
              value: 'B'
            }
          ]
        },
        {
          all: [
            {
              fact: 'managerOverride',
              operator: 'equal',
              value: 'true'
            }
          ]
        }
      ]
    },
    event: {
      type: 'operator check'
    }
  },
  null,
  2
)

const event = types.model({ type: 'type name' }).actions((condition) => ({
  set(field, value) {
    condition[field] = value
  }
}))

const condition = types
  .model({
    fact: types.maybe(types.string),
    operator: types.maybe(types.string),
    value: types.union(
      types.number,
      types.boolean,
      types.string,
      types.undefined
    ),
    all: types.maybe(types.array(types.late(() => condition))),
    any: types.maybe(types.array(types.late(() => condition)))
  })
  .views((condition) => ({
    get subFacts() {
      if (condition.all) {
        return condition.all
          .map((a) => a?.any)
          .flat()
          .map((a) => a?.fact)
      }
      if (condition.any) {
        return condition.any
          .map((a) => a?.all)
          .flat()
          .map((a) => a?.fact)
      }
      return []
    }
  }))
  .actions((condition) => ({
    set(field, value) {
      condition[field] = value
    },
    cloneLast() {
      condition.all = [
        ...condition.all,
        JSON.parse(JSON.stringify(condition.all[condition.all.length - 1]))
      ]
    }
  }))

const rule = types.model({
  conditions: types.maybe(condition),
  event: types.maybe(event)
})

const model = {
  factValues: types.map(types.model({ value: '' })),
  rule: types.maybe(rule),
  conditions: types.maybe(condition),
  event: types.maybe(event),
  error: false,
  dataJSONeditor: '',
  graphNodes: ''
}

const actions = (store) => ({
  set(field, value) {
    store[field] = value
  },
  setFact(fact, value) {
    store.factValues.set(fact, { value })
  },
  setNodes(value) {
    store.set('nodes', value)
    console.log(value)
  },
  setData({ target }) {
    store.dataJSONeditor = target.value
    try {
      store.rule = JSON.parse(store.dataJSONeditor)
      store.error = false
    } catch (e) {
      store.error = true
    }
  },
  copyOutputToInput() {
    store.setData({ target: { value: store.dataJSON } })

    if (store.nodes) {
      store.nodes[store.conditionGraphNodes[0].id].inputData.fact.string =
        store.rule.conditions.any[0].all[0].fact

      store.nodes[store.conditionGraphNodes[0].id].inputData.operator.operator =
        store.rule.conditions.any[0].all[0].operator

      store.nodes[store.conditionGraphNodes[0].id].inputData.value.string =
        store.rule.conditions.any[0].all[0].value

      store.setFact(
        store.rule.conditions.any[0].all[0].fact,
        store.rule.conditions.any[0].all[0].value
      )

      store.nodes[store.conditionGraphNodes[1].id].inputData.fact.string =
        store.rule.conditions.any[0].all[1].fact

      store.nodes[store.conditionGraphNodes[1].id].inputData.operator.operator =
        store.rule.conditions.any[0].all[1].operator

      store.nodes[store.conditionGraphNodes[1].id].inputData.value.string =
        store.rule.conditions.any[0].all[1].value

      store.setFact(
        store.rule.conditions.any[0].all[1].fact,
        store.rule.conditions.any[0].all[1].value
      )

      store.nodes[store.conditionGraphNodes[2].id].inputData.fact.string =
        store.rule.conditions.any[1].all[0].fact

      store.nodes[store.conditionGraphNodes[2].id].inputData.operator.operator =
        store.rule.conditions.any[1].all[0].operator

      store.nodes[store.conditionGraphNodes[2].id].inputData.value.string =
        store.rule.conditions.any[1].all[0].value

      store.setFact(
        store.rule.conditions.any[1].all[0].fact,
        store.rule.conditions.any[1].all[0].value
      )

      store.nodes = JSON.parse(JSON.stringify(store.nodes))
    }
  }
})

const views = (store) => ({
  get dataJSON() {
    return JSON.stringify(store.rule, null, 2)
  },
  getFact(factName) {
    const fact = store.factValues.get(factName)
    return fact ? fact.value : ''
  },
  get conditionGraphNodes() {
    return Object.values(store.nodes).filter(
      (node) => node.type === 'condition'
    )
  }
})

const storeModel = types
  .model(model)
  .actions(actions)
  .views(views)
  .volatile(() => ({
    nodes: {},
    engine: {}
  }))

const init = {
  dataJSONeditor: jsonDefaultData,
  rule: JSON.parse(jsonDefaultData)
}

export const store = storeModel.create(init)

window.store = store //expose in console

const storeContext = createContext(store)

export const useStore = () => useContext(storeContext)
