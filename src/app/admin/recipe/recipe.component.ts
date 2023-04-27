import {Component, ViewChild} from '@angular/core';
import {MatTable} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {Recipe} from "../../shared/dto/recipe";
import {RecipeService} from "./recipe.service";
import {DeleteIngredientComponent} from "../ingredients/delete-ingredient/delete-ingredient.component";
import {CreateRecipeComponent} from "./create-recipe/create-recipe.component";


@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent {


  displayedColumns: string[] = ['id', 'title', 'actions'];

  public recipeResponse!: Recipe[];

  @ViewChild(MatTable) table!: MatTable<Recipe>;

  constructor(public dialog: MatDialog, private recipeService: RecipeService) {

  }

  ngOnInit(): void {
    this.getAllRecipe();
  }

  private getAllRecipe(): void {
    this.recipeService.getAll().subscribe((response: Recipe[]) => {
        this.recipeResponse = response;
      }
    )
  }

  public onCreate(): void {
    const dialogRef = this.dialog.open(CreateRecipeComponent, {
      data: '123',
    });

    dialogRef.afterClosed().subscribe(popupResponse => {
      if (!popupResponse) {
        return;
      }
      this.recipeService.create(popupResponse).subscribe(() => {
        // this.ingredientResponse.push(popupResponse);
        this.getAllRecipe();
        this.table.renderRows();
      });
    });
  }

  onEdit(id: string) {

  }

  onDelete(id: string) {
    //subscribe(() =>   - приходит пусто
    //subscribe(response =>   - приходит какой то объект
    const dialogRef = this.dialog.open(DeleteIngredientComponent);

    dialogRef.afterClosed().subscribe(popupResponse => {
      if (popupResponse) {
        this.recipeService.delete(id).subscribe(() => {
          this.getAllRecipe();
          this.table.renderRows();
        });
      }
    });
  }
}
