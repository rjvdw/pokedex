import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { TypeWithEffectiveness } from '../typeDefs'

type GetTypeChartResponse = {
  typeChart: TypeWithEffectiveness[],
}

export const App: React.FunctionComponent = () => {

  const { loading, error, data } = useQuery<GetTypeChartResponse>(gql`
    query GetTypeChart {
      typeChart {
        type
        superEffectiveAgainst
        notVeryEffectiveAgainst
        noEffectAgainst
      }
    }
  `)

  return <>
    <h1>Type Chart</h1>

    { loading && <p>Loading...</p> }

    { error && <p>error: { error }</p> }

    { data && <TypeChart chart={ data.typeChart }/> }
  </>
}

type TypeChartProps = {
  chart: TypeWithEffectiveness[],
}

const TypeChart: React.FunctionComponent<TypeChartProps> = ({ chart }) => {
  return <table>
    <tbody>
    <tr>
      <td/>
      { chart.map(entry => <th key={ entry.type }>{ entry.type }</th>) }
    </tr>
    { chart.map(entry => <tr key={ entry.type }>
      <th>{ entry.type }</th>
      { chart.map(against => {
        let effect
        if (entry.superEffectiveAgainst.indexOf(against.type) !== -1) {
          effect = '2'
        } else if (entry.notVeryEffectiveAgainst.indexOf(against.type) !== -1) {
          effect = '½'
        } else if (entry.noEffectAgainst.indexOf(against.type) !== -1) {
          effect = '0'
        } else {
          effect = '1'
        }

        return <td key={ against.type }>{ effect }</td>
      }) }
    </tr>) }
    </tbody>
  </table>
}
