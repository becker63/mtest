import React from 'react'
import { FlumeConfig, Colors, Controls } from 'flume'
import Indicators from './output'

const config = new FlumeConfig()

config
  .addPortType({
    type: 'string',
    name: 'string',
    label: 'Text',
    color: Colors.green,
    hidePort: true,
    controls: [
      Controls.text({
        name: 'string',
        label: 'Text'
      })
    ]
  })
  .addPortType({
    type: 'boolean',
    name: 'boolean',
    label: 'True/False',
    color: Colors.blue,
    controls: [
      Controls.checkbox({ name: 'boolean' }),
      Controls.custom({
        name: 'booleanRender',
        render: (data, onChange, context, redraw, portProps, inputData) => (
          <div
            style={{ backgroundColor: inputData.boolean ? 'lime' : 'red' }}
            className={'m-2 rounded-full inline-block px-2 py-1'}>
            {portProps.inputLabel}
          </div>
        )
      })
    ]
  })

  .addPortType({
    type: 'number',
    name: 'number',
    label: 'Number',
    color: Colors.red,
    controls: [
      Controls.number({
        name: 'number',
        label: 'Number'
      })
    ]
  })
  .addPortType({
    type: 'operator',
    name: 'operator',
    label: 'Operator',
    hidePort: true,

    controls: [
      Controls.select({
        name: 'operator',
        label: 'Operator',
        options: [
          { value: 'equal', label: '= (equal)' },
          { value: 'notEqual', label: '!= (notEqual)' },
          { value: 'lessThan', label: '< (lessThan)' },
          { value: 'lessThanInclusive', label: '<= (lessThanInclusive)' },
          { value: 'greaterThan', label: '> (greaterThan)' },
          { value: 'greaterThanInclusive', label: '>= (greaterThanInclusive)' },
          { value: 'in', label: 'in array' },
          { value: 'notIn', label: 'notIn array' },
          { value: 'contains', label: 'array contains' },
          { value: 'doesNotContain', label: 'array doesNotContain' }
        ],
        defaultValue: 'equal'
      })
    ]
  })
  .addPortType({
    type: 'indicators',
    name: 'indicators',
    label: 'Indicators',
    hidePort: true,
    controls: [
      Controls.custom({
        name: 'indicators',
        render: () => <Indicators />
      })
    ]
  })

config
  .addNodeType({
    type: 'string',
    label: 'Text',
    description: 'Outputs a string of text',
    inputs: (ports) => [ports.string()],
    outputs: (ports) => [ports.string()]
  })
  .addNodeType({
    type: 'boolean',
    label: 'True/False',
    description: 'Outputs a true/false value',
    initialWidth: 140,
    inputs: (ports) => [ports.boolean()],
    outputs: (ports) => [ports.boolean()]
  })
  .addNodeType({
    type: 'number',
    label: 'Number',
    description: 'Outputs a numeric value',
    initialWidth: 160,
    inputs: (ports) => [ports.number()],
    outputs: (ports) => [ports.number()]
  })
  .addNodeType({
    type: 'user',
    label: 'User',
    description: 'Outputs attributes of the current user',
    initialWidth: 130,
    outputs: (ports) => [
      ports.string({
        name: 'firstName',
        label: 'First Name'
      }),
      ports.string({
        name: 'lastName',
        label: 'Last Name'
      }),
      ports.boolean({
        name: 'isLoggedIn',
        label: 'Is Logged-In'
      }),
      ports.boolean({
        name: 'isAdmin',
        label: 'Is Admin'
      })
    ]
  })
  .addNodeType({
    type: 'indicators',
    label: 'Output',
    description: 'Output indicators',
    initialWidth: 65,
    inputs: (ports) => [ports.indicators()]
  })
  .addNodeType({
    type: 'reverseBoolean',
    label: 'Invert boolean',
    description: 'Reverses a true/false value',
    initialWidth: 140,
    inputs: (ports) => [ports.boolean()],
    outputs: (ports) => [ports.boolean({ label: 'False/True' })]
  })
  .addNodeType({
    type: 'and',
    label: 'and',
    description: 'Returns true if both facts are true',
    initialWidth: 100,
    inputs: (ports) => [
      ports.boolean({ name: 'bool1', label: 'fact 1' }),
      ports.boolean({ name: 'bool2', label: 'fact 2' })
    ],
    outputs: (ports) => [ports.boolean({ label: 'all satisfied' })]
  })
  .addNodeType({
    type: 'or',
    label: 'or',
    description: 'Returns true if at least one fact is true',
    initialWidth: 150,
    inputs: (ports) => [
      ports.boolean({ name: 'bool1', label: 'fact 1' }),
      ports.boolean({ name: 'bool2', label: 'fact 2' })
    ],
    outputs: (ports) => [ports.boolean({ label: 'one or more satisfied' })]
  })
  .addNodeType({
    type: 'conditionBool',
    label: 'Condition (boolean)',
    color: Colors.red,
    description: 'Condition for a boolean rule',
    inputs: (ports) => [
      ports.boolean({ name: 'fact', label: 'fact (boolean)' }),
      ports.operator({
        name: 'operator',
        defaultValue: 'equal',
        label: 'operator'
      }),
      ports.boolean({ name: 'value', label: 'value' })
    ],
    outputs: (ports) => [ports.boolean({ label: 'satisfied (boolean)' })]
  })
  .addNodeType({
    type: 'condition',
    label: 'Condition',
    color: Colors.red,
    description: 'Condition for a string rule',
    inputs: (ports) => [
      ports.string({ name: 'fact', label: 'fact' }),
      ports.operator({
        name: 'operator',
        defaultValue: 'equal',
        label: 'operator'
      }),
      ports.string({ name: 'value', label: 'value' })
    ],
    outputs: (ports) => [ports.boolean({ label: 'satisfied (boolean)' })]
  })
  .addRootNodeType({
    type: 'homepage',
    label: 'Output ports',
    initialWidth: 130,
    inputs: (ports) => [
      ports.boolean({
        name: 'output1',
        label: 'indicator #1'
      }),
      ports.boolean({
        name: 'output2',
        label: 'indicator #2'
      }),
      ports.boolean({
        name: 'output3',
        label: 'indicator #3'
      })
    ]
  })

export default config
