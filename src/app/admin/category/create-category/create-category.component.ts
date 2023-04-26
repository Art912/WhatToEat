import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Category} from "../../../shared/dto/category";

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent {
  public createCategoryForm!: FormGroup;

  constructor(
    //всегда одинаковый, только объект в дженерики (в <...>)
    public dialogRef: MatDialogRef<CreateCategoryComponent>,
    //механизм получеения данных из вне
    @Inject(MAT_DIALOG_DATA) public data: Category,
  ) {
  }

  ngOnInit(): void {
    this.createCategoryForm = this.getForm();
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
    if (this.createCategoryForm.valid) {
      //вернет данный туда от куда вызван попап
      this.dialogRef.close(this.createCategoryForm.value);
      return;
    }
  }
}
