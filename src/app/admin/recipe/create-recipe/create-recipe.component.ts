import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {forkJoin, map, Observable, startWith} from "rxjs";
import {IngredientsService} from "../../ingredients/ingredients.service";
import {CategoryService} from "../../category/category.service";
import {Ingredient} from "../../../shared/dto/ingredient";
import {Category} from 'src/app/shared/dto/category';
import {RecipeIngredient} from "../../../shared/dto/recipeIngredient";
import {MatTable} from "@angular/material/table";
import {TempRecipeIngredient} from "../temp-recipe-ingredient";
import {EditRecipeIngredientComponent} from "./edit-recipe-ingredient/edit-recipe-ingredient.component";

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent implements OnInit {
  @ViewChild(MatTable) ingredientsTable!: MatTable<RecipeIngredient>;
  public displayedColumns: string[] = ['ingredient', 'amount', 'quantity', 'action'];
  public ingredientControl: FormControl = this.formBuilder.control(null);
  public createRecipeForm: FormGroup = this.getForm();
  public categoryResponse: Category[] = [];
  public ingredientsResponse: Ingredient[] = [];
  public recipeIngredients: TempRecipeIngredient[] = [];
  public filteredIngredients: Observable<Ingredient[]> = this.ingredientControl.valueChanges
    .pipe(
      startWith(''),
      map(state => state ? this.filterIngredients(state) : this.ingredientsResponse.slice())
    );

  ingredientsForm?: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TempRecipeIngredient,
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateRecipeComponent>,
    private ingredientsService: IngredientsService,
    private categoryService: CategoryService,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    forkJoin([this.categoryService.getAllCategory(), this.ingredientsService.getAllIngredients()]).pipe(
      map(([categoryResponse, ingredientResponse]) => {
        this.categoryResponse = categoryResponse;
        this.ingredientsResponse = ingredientResponse;
      })
    ).subscribe()
  }

  public getForm2(): FormGroup {
    const form = new FormGroup({
      title: new FormControl(''),
      //вытянуть из категории id!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      category: new FormControl(''),
      description: new FormControl(''),
      name: new FormControl(''),
      amount: new FormControl(''),
      quantity: new FormControl(''),
      ingredientName: this.ingredientControl,
      ingredientAmount: new FormControl(''),
      ingredientQuantity: new FormControl(''),
    });

    return form;
  }

  public getForm(): FormGroup {
    const table = this.formBuilder.group({
      title: '',
      category: '',
      description: '',
      ingredientsForm: this.formBuilder.array([])
    });
    return table
  }

  addIngredient(): void {
    const ingredients = this.ingredientsForm?.get('ingredients') as FormArray;
    ingredients.push(this.createEmptyIngredient());
  }

  get ingredientForm() {
    return this.createRecipeForm.controls['ingredientsForm'] as FormArray;
  }

  createEmptyIngredient(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      amount: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }


  public onNoClick(): void {
    this.dialogRef.close();
  }

  public save(): void {
    if (this.createRecipeForm.valid) {
      //вернет данный туда от куда вызван попап
      this.dialogRef.close({arg1: this.createRecipeForm.value, arg2: this.recipeIngredients});

      return;
    }
  }

  public addIngredientToRecipe(): void {
    const newRecipeIngredient: TempRecipeIngredient = this.createRecipeForm.value;
    newRecipeIngredient.tempId = this.getRandomId();

    this.recipeIngredients.push(newRecipeIngredient);
    this.createRecipeForm.get('ingredientName')?.reset();
    this.createRecipeForm.get('ingredientAmount')?.reset();
    this.createRecipeForm.get('ingredientQuantity')?.reset();
    this.ingredientsTable.renderRows();

    // Очистить форму
    // this.createRecipeForm.reset();
  }

  public onDelete(id: string) {
    this.recipeIngredients = this.recipeIngredients.filter(item => item.tempId !== id);
  }

  private getRandomId(): string {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
  }

  private filterIngredients(name: string): Ingredient[] {
    return this.ingredientsResponse.filter(ingredient => ingredient.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  public onEdit(editingIngredient: TempRecipeIngredient): void {
    // toEditRecipeIngredient: TempRecipeIngredient = [];
    // toEditRecipeIngredient = this.recipeIngredients.filter(item => item.tempId === id);

    const dialogRef = this.dialog.open(EditRecipeIngredientComponent, {
      //в попап прокидываем объект => в попапе делаем форму
      //{id:id} - создали анонимный объект для удобной передачи данных

      data: {
        editingIngredient: editingIngredient,
        categoryResponse: this.categoryResponse,
      },
    });

    dialogRef.afterClosed().subscribe(popupResponse => {
      if (!popupResponse) {
        return;
      }
    });
  }


}
