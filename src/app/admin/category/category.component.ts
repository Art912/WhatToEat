import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CategoryService} from "./category.service";
import {Category} from "../../shared/dto/category";
import {MatTable} from "@angular/material/table";
import {CreateCategoryComponent} from "./create-category/create-category.component";
import {DeleteIngredientComponent} from "../ingredients/delete-ingredient/delete-ingredient.component";
import {EditCategoryComponent} from "./edit-category/edit-category.component";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'actions'];

  public categoryResponse!: Category[];

  @ViewChild(MatTable) table!: MatTable<Category>;

  constructor(public dialog: MatDialog, private categoryService: CategoryService) {

  }

  ngOnInit(): void {
    this.getAllCategory();
  }

  private getAllCategory(): void {
    this.categoryService.getAllCategory().subscribe((response: Category[]) => {
        this.categoryResponse = response;
      }
    )


  }

  public onCreate(): void {
    const dialogRef = this.dialog.open(CreateCategoryComponent, {
      data: '123',
    });

    dialogRef.afterClosed().subscribe(popupResponse => {
      if (!popupResponse) {
        return;
      }
      this.categoryService.create(popupResponse).subscribe(() => {
        // this.ingredientResponse.push(popupResponse);
        this.getAllCategory();
        this.table.renderRows();
      });
    });
  }

  public onEdit(id: string): void {

    const dialogRef = this.dialog.open(EditCategoryComponent, {
      //в попап прокидываем объект => в попапе делаем форму
      //{id:id} - создали анонимный объект для удобной передачи данных
      data: {
        id: id
      },
    });

    dialogRef.afterClosed().subscribe(popupResponse => {
      if (!popupResponse) {
        return;
      }
      this.categoryService.update(popupResponse).subscribe(() => {
        // this.ingredientResponse.push(popupResponse);
        this.getAllCategory();
        this.table.renderRows();
      });
    });
  }


  onDelete(id: string) {
    //subscribe(() =>   - приходит пусто
    //subscribe(response =>   - приходит какой то объект
    const dialogRef = this.dialog.open(DeleteIngredientComponent);

    dialogRef.afterClosed().subscribe(popupResponse => {
      if (popupResponse) {
        this.categoryService.delete(id).subscribe(() => {
          this.getAllCategory();
          this.table.renderRows();
        });
      }
    });
  }
}
