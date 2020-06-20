/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFoodScore = /* GraphQL */ `
  query GetFoodScore($id: ID!) {
    getFoodScore(id: $id) {
      id
      userID
      name
      score
      carMiles
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listFoodScores = /* GraphQL */ `
  query ListFoodScores(
    $filter: ModelFoodScoreFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFoodScores(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        name
        score
        carMiles
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
