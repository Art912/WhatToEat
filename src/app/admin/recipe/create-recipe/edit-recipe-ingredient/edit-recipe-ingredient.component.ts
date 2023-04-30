import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IngredientsService} from "../../../ingredients/ingredients.service";
import {TempRecipeIngredient} from "../../temp-recipe-ingredient";
import {Category} from 'src/app/shared/dto/category';

@Component({
  selector: 'app-edit-recipe-ingredient',
  templateUrl: './edit-recipe-ingredient.component.html',
  styleUrls: ['./edit-recipe-ingredient.component.css']
})
export class EditRecipeIngredientComponent {
  public editIngredientForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditRecipeIngredientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { editingIngredient: TempRecipeIngredient, categoryResponse: Category[] },
    private ingredientsService: IngredientsService,
  ) {
  }

  ngOnInit(): void {
    // this.ingredientsService.getById(this.data.id).subscribe(
    //   (response: Ingredient) => {
    this.editIngredientForm = this.getForm(this.data.editingIngredient, this.data.categoryResponse);
    //   }
    // );
  }

  public getForm(ingredientResponse: TempRecipeIngredient, category: Category[]): FormGroup {
    const form = new FormGroup({
      //+>делаем форму
      // tempId: new FormControl(response.tempId),

      editName: new FormControl(ingredientResponse.name),
      editAmount: new FormControl(ingredientResponse.amount),
      editQuantity: new FormControl(ingredientResponse.quantity),
    });
    return form;
  }

//    public getById():void{
//
// }

  public save(): void {
    this.data.categoryResponse
    // if (this.editIngredientForm.valid) {
    //   const editedIngredient: Ingredient = {
    //     id: this.editIngredientForm.value.id,
    //     name: this.editIngredientForm.value.name,
    //   }
    //   //вернет данный туда от куда вызван попап
    //   this.dialogRef.close(editedIngredient);
    //   return;
    // }
  }

}
