import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Ingredient} from "../../shared/dto/ingredient";

@Component({
  selector: 'app-delete-ingredient',
  templateUrl: './delete-ingredient.component.html',
  styleUrls: ['./delete-ingredient.component.css']
})
export class DeleteIngredientComponent {
  constructor(
    //всегда одинаковый, только объект в дженерики (в <...>)
    public dialogRef: MatDialogRef<DeleteIngredientComponent>,
  ) {}

  onAction(yesOrNo: boolean) {
    this.dialogRef.close(yesOrNo);
  }
}
