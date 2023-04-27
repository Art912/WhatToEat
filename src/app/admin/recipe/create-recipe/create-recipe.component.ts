import {Component, Inject, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Recipe} from "../../../shared/dto/recipe";
import {forkJoin, map, Observable, startWith} from "rxjs";
import {IngredientsService} from "../../ingredients/ingredients.service";
import {CategoryService} from "../../category/category.service";
import {Ingredient} from "../../../shared/dto/ingredient";
import {Category} from 'src/app/shared/dto/category';
import {RecipeIngredient} from "../../../shared/dto/recipeIngredient";
import {MatTable} from "@angular/material/table";


export interface User {
  name: string;
}

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent {

  myControl = new FormControl<string | User>('');
  options: User[] = [{name: 'Mary'}, {name: 'Shelley'}, {name: 'Igor'}];
  filteredOptions!: Observable<User[]>;


  public createRecipeForm!: FormGroup;
  @ViewChild(MatTable) ingredirntsTable!: MatTable<RecipeIngredient>;

  displayedColumns: string[] = ['ingredient', 'amount', 'quantity', 'action'];

  public categoryResponse: Category[] = [];
  public ingredientResponse: Ingredient[] = [];
  public recipeIngredients: RecipeIngredient[] = [];



  constructor(
    public dialogRef: MatDialogRef<CreateRecipeComponent>,
    private ingredientsService: IngredientsService,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: Recipe,
  ) {
  }

  ngOnInit(): void {
    this.createRecipeForm = this.getForm();

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );

    forkJoin([this.categoryService.getAllCategory(), this.ingredientsService.getAllIngredients()]).pipe(
      map(([categoryResponse, ingredientResponse]) => {
        this.categoryResponse = categoryResponse;
        this.ingredientResponse = ingredientResponse;

      })
    ).subscribe()
    //getAllCategiry
    //getAllIngredient
  }

  public getForm(): FormGroup {
    const form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(1)]),
      amount: new FormControl(''),
      quantity: new FormControl(''),
      ingredientName: new FormControl(''),
      ingredientAmount: new FormControl(''),
      ingredientQuantity: new FormControl(''),
    });

    return form;
  }

  private getAllCategoryAndIngredient(): void {


    // this.recipeService.getAll().subscribe((response: Recipe[]) => {
    //     this.recipeResponse = response;
    //   }
    // )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public save(): void {
    if (this.createRecipeForm.valid) {
      //вернет данный туда от куда вызван попап
      this.dialogRef.close(this.createRecipeForm.value);

      return;
    }
  }

  public addIngredientToRecipe(): void {
    //одно и то же!!!!
    const newRecipeIngredient: RecipeIngredient = this.createRecipeForm.value;

    // const ingredientName = this.createRecipeForm.get('ingredientName')?.value;
    // const ingredientAmount = this.createRecipeForm.get('ingredientAmount')?.value;
    // const ingredientQuantity = this.createRecipeForm.get('ingredientMeasure')?.value;
    //
    // const recipeIngredient: RecipeIngredient = {
    //   recipeId: 'r1',
    //   ingredientId: 'i1',
    //   name: ingredientName,
    //   amount: ingredientAmount,
    //   quantity: ingredientQuantity
    // };

    this.recipeIngredients.push(newRecipeIngredient);
    // this.createRecipeForm.reset();
    this.createRecipeForm.get('ingredientName')?.reset();
    this.createRecipeForm.get('ingredientAmount')?.reset();
    this.ingredirntsTable.renderRows();

    // Очистить форму
    // this.createRecipeForm.reset();
  }

  // public onIngredientQuantitySelectionChange(event: MatSelectChange): void {
  //   this.form.get('ingredientQuantity').patchValue(event.value);
  // }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  onDelete(id: string) {

  }
}
