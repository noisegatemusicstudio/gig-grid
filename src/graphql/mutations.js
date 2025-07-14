/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBand = /* GraphQL */ `
  mutation CreateBand(
    $input: CreateBandInput!
    $condition: ModelBandConditionInput
  ) {
    createBand(input: $input, condition: $condition) {
      id
      band
      item
      price
      desc
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updateBand = /* GraphQL */ `
  mutation UpdateBand(
    $input: UpdateBandInput!
    $condition: ModelBandConditionInput
  ) {
    updateBand(input: $input, condition: $condition) {
      id
      band
      item
      price
      desc
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const deleteBand = /* GraphQL */ `
  mutation DeleteBand(
    $input: DeleteBandInput!
    $condition: ModelBandConditionInput
  ) {
    deleteBand(input: $input, condition: $condition) {
      id
      band
      item
      price
      desc
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
