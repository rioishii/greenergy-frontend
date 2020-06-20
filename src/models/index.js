// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { FoodScore } = initSchema(schema);

export {
  FoodScore
};