import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../category.service";
import {Category} from "../../../shared/dto/category";

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent {

  public editCategoryForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private categoryService: CategoryService,
  ) {
  }

  ngOnInit(): void {
    this.categoryService.getById(this.data.id).subscribe(
      (response: Category) => {
        this.editCategoryForm = this.getForm(response);
      }
    );
  }

  public getForm(response: Category): FormGroup {
    const form = new FormGroup({
      //+>делаем форму
      id: new FormControl(response.id),
      name: new FormControl(response.name, [Validators.required, Validators.minLength(1)]),
    });
    return form;
  }

  public save(): void {
    if (this.editCategoryForm.valid) {
      const editedCategory: Category = {
        id: this.editCategoryForm.value.id,
        name: this.editCategoryForm.value.name,
      }
      //вернет данные туда от куда вызван попап
      this.dialogRef.close(editedCategory);
      return;
    }
  }
}
