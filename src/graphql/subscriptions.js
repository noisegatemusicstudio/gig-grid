/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBand = /* GraphQL */ `
  subscription OnCreateBand($filter: ModelSubscriptionBandFilterInput) {
    onCreateBand(filter: $filter) {
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
export const onUpdateBand = /* GraphQL */ `
  subscription OnUpdateBand($filter: ModelSubscriptionBandFilterInput) {
    onUpdateBand(filter: $filter) {
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
export const onDeleteBand = /* GraphQL */ `
  subscription OnDeleteBand($filter: ModelSubscriptionBandFilterInput) {
    onDeleteBand(filter: $filter) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onCreateUser(filter: $filter, owner: $owner) {
      id
      email
      role
      username
      profilePicture
      bio
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onUpdateUser(filter: $filter, owner: $owner) {
      id
      email
      role
      username
      profilePicture
      bio
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onDeleteUser(filter: $filter, owner: $owner) {
      id
      email
      role
      username
      profilePicture
      bio
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
