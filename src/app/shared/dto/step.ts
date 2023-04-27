import {Image} from "./image";

export interface Step {
  id: string;
  description: string;
  recipeId: string;
  images: Image[];
}
