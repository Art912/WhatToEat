import {RecipeIngredient} from "../../shared/dto/recipeIngredient";

export interface TempRecipeIngredient extends RecipeIngredient {
  tempId: string;
}
