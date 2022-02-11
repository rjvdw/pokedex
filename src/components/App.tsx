import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { TypeWithEffectiveness } from '../typeDefs'
import './App.styles.sass'

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
  return <table className="typechart">
    <tbody>
    <tr>
      <td/>
      { chart.map(entry => <th key={ entry.type } className="typechart__header-top">
        <abbr title={ entry.type }>{ entry.type.substring(0, 1) }</abbr>
      </th>) }
    </tr>
    { chart.map(entry => <tr key={ entry.type }>
      <th className="typechart__header-side">
        <abbr title={ entry.type }>{ entry.type.substring(0, 1) }</abbr>
      </th>
      { chart.map(against => {
        let effectClass
        let effect
        if (entry.superEffectiveAgainst.indexOf(against.type) !== -1) {
          effectClass = 'super'
          effect = 'is super effective'
        } else if (entry.notVeryEffectiveAgainst.indexOf(against.type) !== -1) {
          effectClass = 'not-very'
          effect = 'is not very effective'
        } else if (entry.noEffectAgainst.indexOf(against.type) !== -1) {
          effectClass = 'immune'
          effect = 'has no effect'
        } else {
          effectClass = 'normal'
          effect = 'is normal'
        }

        return <td
          key={ against.type }
          className={ `typechart__effect typechart__effect--${ effectClass }` }
          title={ `${ entry.type } ${ effect } against ${ against.type }` }
        />
      }) }
    </tr>) }
    </tbody>
  </table>
}
