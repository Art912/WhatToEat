import {Ingredient} from "./ingredient";
import {Step} from "./step";

export interface Recipe {
  id: string;
  title: string;
  description: string;
  categoryId?: string;
  imageId?: string;
  ingredients: Ingredient[];
  steps: Step[];

}
