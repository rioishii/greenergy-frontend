/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createFoodScore = /* GraphQL */ `
  mutation CreateFoodScore(
    $input: CreateFoodScoreInput!
    $condition: ModelFoodScoreConditionInput
  ) {
    createFoodScore(input: $input, condition: $condition) {
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
export const updateFoodScore = /* GraphQL */ `
  mutation UpdateFoodScore(
    $input: UpdateFoodScoreInput!
    $condition: ModelFoodScoreConditionInput
  ) {
    updateFoodScore(input: $input, condition: $condition) {
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
export const deleteFoodScore = /* GraphQL */ `
  mutation DeleteFoodScore(
    $input: DeleteFoodScoreInput!
    $condition: ModelFoodScoreConditionInput
  ) {
    deleteFoodScore(input: $input, condition: $condition) {
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
