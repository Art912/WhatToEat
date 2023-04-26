import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable} from "@angular/material/table";
import {IngredientsService} from "./ingredients.service";
import {Ingredient} from "../../shared/dto/ingredient";
import {MatDialog} from "@angular/material/dialog";
import {CreateIngredientComponent} from "./create-ingredient/create-ingredient.component";
import {DeleteIngredientComponent} from "./delete-ingredient/delete-ingredient.component";
import {EditIngredientComponent} from './edit-ingredient/edit-ingredient.component';


@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'actions'];
  // dataSource = [...ELEMENT_DATA];
  public ingredientResponse!: Ingredient[];

  @ViewChild(MatTable) table!: MatTable<Ingredient>;

  constructor(public dialog: MatDialog, private ingredientsService: IngredientsService) {

  }

  public onCreate(): void {
    const dialogRef = this.dialog.open(CreateIngredientComponent, {
      data: '123',
    });

    dialogRef.afterClosed().subscribe(popupResponse => {
      if (!popupResponse) {
        return;
      }
      this.ingredientsService.create(popupResponse).subscribe(() => {
        // this.ingredientResponse.push(popupResponse);
        this.getAllIngredients();
        this.table.renderRows();
      });
    });
  }

  ngOnInit(): void {
    this.getAllIngredients();
  }

  public getAllIngredients(): void {
    this.ingredientsService.getAllIngredients().subscribe((response: Ingredient[]) => {
      this.ingredientResponse = response; //  response - данные которые пришли
    });
  }

  //       this.ingredientResponse = this.ingredientResponse.filter(item => item.name !== name);

  // forech(item in ingredientResponse){
  //   if (item.name !== name){
  //     return item;
  //   }
  // }

  public onDelete(id: string): void {
    //subscribe(() =>   - приходит пусто
    //subscribe(response =>   - приходит какой то объект
    const dialogRef = this.dialog.open(DeleteIngredientComponent);

    dialogRef.afterClosed().subscribe(popupResponse => {
      if (popupResponse) {
        this.ingredientsService.delete(id).subscribe(() => {

          this.getAllIngredients();
          this.table.renderRows();
        });
      }
    });
  }

  public onEdit(id: string): void {
    const dialogRef = this.dialog.open(EditIngredientComponent, {
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
      this.ingredientsService.update(popupResponse).subscribe(() => {
        // this.ingredientResponse.push(popupResponse);
        this.getAllIngredients();
        this.table.renderRows();
      });
    });
  }
}
