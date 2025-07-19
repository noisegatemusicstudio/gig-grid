// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const UserRole = {
  "FAN": "FAN",
  "BAND": "BAND"
};

const { Band, User } = initSchema(schema);

export {
  Band,
  User,
  UserRole
};