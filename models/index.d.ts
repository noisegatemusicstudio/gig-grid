import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";

export enum UserRole {
  FAN = "FAN",
  BAND = "BAND"
}



type EagerBand = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Band, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly band: string;
  readonly item: string;
  readonly price?: number | null;
  readonly desc?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyBand = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Band, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly band: string;
  readonly item: string;
  readonly price?: number | null;
  readonly desc?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Band = LazyLoading extends LazyLoadingDisabled ? EagerBand : LazyBand

export declare const Band: (new (init: ModelInit<Band>) => Band) & {
  copyOf(source: Band, mutator: (draft: MutableModel<Band>) => MutableModel<Band> | void): Band;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
  };
  readonly id: string;
  readonly email: string;
  readonly role: UserRole | keyof typeof UserRole;
  readonly username?: string | null;
  readonly profilePicture?: string | null;
  readonly bio?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
  };
  readonly id: string;
  readonly email: string;
  readonly role: UserRole | keyof typeof UserRole;
  readonly username?: string | null;
  readonly profilePicture?: string | null;
  readonly bio?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}