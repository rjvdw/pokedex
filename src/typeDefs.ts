import { gql } from '@apollo/client'

export type Pokemon = {
  index: number,
  name: string,
  description: string,
  primary: string,
  secondary?: string,
}

export type TypeWithEffectiveness = {
  type: string,
  superEffectiveAgainst: string[],
  notVeryEffectiveAgainst: string[],
  noEffectAgainst: string[],
}

export const typeDefs = gql`
  "Mutation root"
  type Mutation {
    "Add a type"
    addType(type: String!): String
    "Saves a Pokémon"
    savePokemon(pokemon: PokemonInput!): Pokemon
  }

  "The Pokédex entry for a Pokémon."
  type Pokemon {
    "Some background information about this Pokémon."
    description: String!
    "The number of this Pokémon within the Pokédex."
    index: ID!
    "The name of the Pokémon."
    name: String!
    "The primary type of this Pokémon"
    primary: String!
    "The secondary type of this Pokémon"
    secondary: String
  }

  "Query root"
  type Query {
    "All Pokémon in the Pokédex"
    allPokemon: [Pokemon!]!
    "All types supported by this Pokédex"
    allTypes: [String!]!
    "The full type chart with the effectiveness of the different types against other types."
    typeChart: [TypeWithEffectiveness!]!
  }

  type TypeWithEffectiveness {
    "This type has no effect against the following types, dealing no damage."
    noEffectAgainst: [String!]!
    "This type is not very effective against the following types, dealing half damage."
    notVeryEffectiveAgainst: [String!]!
    "This type is super effective against the following types, dealing double damage."
    superEffectiveAgainst: [String!]!
    type: String!
  }

  "The Pokédex entry for a Pokémon."
  input PokemonInput {
    "Some background information about this Pokémon."
    description: String!
    "The number of this Pokémon within the Pokédex."
    index: ID!
    "The name of the Pokémon."
    name: String!
    "The primary type of this Pokémon"
    primary: String!
    "The secondary type of this Pokémon"
    secondary: String
  }

`
