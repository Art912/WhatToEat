import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Ingredient} from "../../shared/dto/ingredient";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-ingredient',
  templateUrl: './create-ingredient.component.html',
  styleUrls: ['./create-ingredient.component.css']
})
export class CreateIngredientComponent {
  public createIngredientForm!: FormGroup;
  constructor(
    //всегда одинаковый, только объект в дженерики (в <...>)
    public dialogRef: MatDialogRef<CreateIngredientComponent>,
    //механизм получеения данных из вне
    @Inject(MAT_DIALOG_DATA) public data: Ingredient,
  ) {}

  ngOnInit(): void {
   this.createIngredientForm = this.getForm();
  }

  public getForm(): FormGroup {
    const form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    });
    return form;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public save(): void {
    if (this.createIngredientForm.valid) {
      //вернет данный туда от куда вызван попап
      this.dialogRef.close(this.createIngredientForm.value);
      return;
    }
  }
}
