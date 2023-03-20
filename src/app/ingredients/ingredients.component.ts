import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable} from "@angular/material/table";
import {HttpClient} from "@angular/common/http";
import {IngredientsService} from "./ingredients.service";
import {Ingredient} from "../shared/dto/ingredient";
import {MatDialog} from "@angular/material/dialog";
import {CreateIngredientComponent} from "./create-ingredient/create-ingredient.component";
import {DeleteIngredientComponent} from "./delete-ingredient/delete-ingredient.component";
import { EditIngredientComponent } from './edit-ingredient/edit-ingredient.component';


@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'creationDate', 'actions'];
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
      this.ingredientsService.create(popupResponse).subscribe(response => {
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
      console.log(this.ingredientResponse);
    });
  }

  public onDelete(name: string): void {
    // this.ingredientResponse = this.ingredientResponse.filter(item => item.name !== name);

    const dialogRef = this.dialog.open(DeleteIngredientComponent);

    dialogRef.afterClosed().subscribe(popupResponse => {
      if(popupResponse ===true){
        this.ingredientResponse = this.ingredientResponse.filter(item => item.name !== name);
      }
    });
    // forech(item in ingredientResponse){
    //   if (item.name !== name){
    //     return item;
    //   }
    // }
  }

  public onDelete2(id: string): void {
    //subscribe(() =>   - приходит пусто
    //subscribe(response =>   - приходит какой то объект
    this.ingredientsService.delete(id).subscribe(() => {

      this.getAllIngredients();
      this.table.renderRows();
    });
  }

  public onEdit(ingredient: Ingredient): void {
    const dialogRef = this.dialog.open(EditIngredientComponent, {
      //в попап прокидываем объект => в попапе делаем форму
      data : ingredient,
    });
    dialogRef.afterClosed().subscribe(popupResponse => {
      this.ingredientsService.create(popupResponse).subscribe(response => {
        // this.ingredientResponse.push(popupResponse);
        this.getAllIngredients();
        this.table.renderRows();
      });
    });
  }
}
