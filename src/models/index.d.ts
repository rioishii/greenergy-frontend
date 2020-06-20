import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class FoodScore {
  readonly id: string;
  readonly userID: string;
  readonly name: string;
  readonly score: number;
  readonly carMiles: number;
  readonly createdAt: string;
  constructor(init: ModelInit<FoodScore>);
  static copyOf(source: FoodScore, mutator: (draft: MutableModel<FoodScore>) => MutableModel<FoodScore> | void): FoodScore;
}