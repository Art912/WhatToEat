import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CategoryService} from "./category.service";
import {Category} from "../../shared/dto/category";
import {MatTable} from "@angular/material/table";

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
    this.categoryService.getAll().subscribe((response: Category[]) => {
        this.categoryResponse = response;
      }
    )


  }

  onEdit(id: string) {

  }

  onDelete(id: string) {

  }

  onCreate() {

  }
}
