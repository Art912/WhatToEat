import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Ingredient} from "../../../shared/dto/ingredient";
import {IngredientsService} from "../ingredients.service";

@Component({
  selector: 'app-edit-ingredient',
  templateUrl: './edit-ingredient.component.html',
  styleUrls: ['./edit-ingredient.component.css']
})
export class EditIngredientComponent {
  public editIngredientForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditIngredientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private ingredientsService: IngredientsService,
  ) {
  }

  ngOnInit(): void {
    this.ingredientsService.getById(this.data.id).subscribe(
      (response: Ingredient) => {
        this.editIngredientForm = this.getForm(response);
      }
    );
  }

  public getForm(response: Ingredient): FormGroup {
    const form = new FormGroup({
      //+>делаем форму
      id: new FormControl(response.id),
      name: new FormControl(response.name, [Validators.required, Validators.minLength(1)]),
    });
    return form;
  }

//    public getById():void{
//
// }

  public save(): void {
    if (this.editIngredientForm.valid) {
      const editedIngredient: Ingredient = {
        id: this.editIngredientForm.value.id,
        name: this.editIngredientForm.value.name,
      }
      //вернет данный туда от куда вызван попап
      this.dialogRef.close(editedIngredient);
      return;
    }
  }
}
