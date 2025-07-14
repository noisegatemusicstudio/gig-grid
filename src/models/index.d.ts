import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





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