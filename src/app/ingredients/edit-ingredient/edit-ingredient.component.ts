import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Ingredient} from "../../shared/dto/ingredient";

@Component({
  selector: 'app-edit-ingredient',
  templateUrl: './edit-ingredient.component.html',
  styleUrls: ['./edit-ingredient.component.css']
})
export class EditIngredientComponent {
  public editIngredientForm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<EditIngredientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Ingredient,
  ) {}

  ngOnInit(): void {
    this.editIngredientForm = this.getForm();
  }

  public getForm(): FormGroup {
    const form = new FormGroup({
      //+>делаем форму
      name: new FormControl(this.data.name, [Validators.required, Validators.minLength(1)]),
    });
    return form;
  }
//    public getById():void{
//
// }

  public save(): void {
    if (this.editIngredientForm.valid) {
      //вернет данный туда от куда вызван попап
      this.dialogRef.close(this.editIngredientForm.value);
      return;
    }
  }
}
