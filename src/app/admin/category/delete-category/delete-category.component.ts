import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent {
  constructor(
    //всегда одинаковый, только объект в дженерики (в <...>)
    public dialogRef: MatDialogRef<DeleteCategoryComponent>,
  ) {
  }

  onAction(yesOrNo: boolean) {
    this.dialogRef.close(yesOrNo);
  }
}
