// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Band } = initSchema(schema);

export {
  Band
};