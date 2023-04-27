import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-recipe',
  templateUrl: './delete-recipe.component.html',
  styleUrls: ['./delete-recipe.component.css']
})
export class DeleteRecipeComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteRecipeComponent>,
  ) {
  }

  onAction(yesOrNo: boolean) {
    this.dialogRef.close(yesOrNo);
  }
}
