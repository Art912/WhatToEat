import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatTabsModule} from '@angular/material/tabs';
import { IngredientsComponent } from './ingredients/ingredients.component';
import {MatTableModule} from '@angular/material/table';
import {IngredientsService} from "./ingredients/ingredients.service";
import { HttpClientModule } from '@angular/common/http';
import { CreateIngredientComponent } from './ingredients/create-ingredient/create-ingredient.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from '@angular/material/icon';
import { DeleteIngredientComponent } from './ingredients/delete-ingredient/delete-ingredient.component';
import { EditIngredientComponent } from './ingredients/edit-ingredient/edit-ingredient.component';




@NgModule({
  declarations: [
    AppComponent,
    IngredientsComponent,
    CreateIngredientComponent,
    DeleteIngredientComponent,
    EditIngredientComponent
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
  providers: [IngredientsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
