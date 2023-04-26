import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatTabsModule} from '@angular/material/tabs';
import {IngredientsComponent} from './admin/ingredients/ingredients.component';
import {MatTableModule} from '@angular/material/table';
import {IngredientsService} from "./admin/ingredients/ingredients.service";
import {HttpClientModule} from '@angular/common/http';
import {CreateIngredientComponent} from './admin/ingredients/create-ingredient/create-ingredient.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from '@angular/material/icon';
import {DeleteIngredientComponent} from './admin/ingredients/delete-ingredient/delete-ingredient.component';
import {EditIngredientComponent} from './admin/ingredients/edit-ingredient/edit-ingredient.component';
import {RecipeComponent} from './recipe/recipe.component';
import {CategoryComponent} from './admin/category/category.component';
import {CategoryService} from "./admin/category/category.service";
import {CreateCategoryComponent} from './admin/category/create-category/create-category.component';
import {DeleteCategoryComponent} from './admin/category/delete-category/delete-category.component';
import {EditCategoryComponent} from './admin/category/edit-category/edit-category.component';


@NgModule({
  declarations: [
    AppComponent,
    IngredientsComponent,
    CreateIngredientComponent,
    DeleteIngredientComponent,
    EditIngredientComponent,
    RecipeComponent,
    CategoryComponent,
    CreateCategoryComponent,
    DeleteCategoryComponent,
    EditCategoryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  providers: [IngredientsService, CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
