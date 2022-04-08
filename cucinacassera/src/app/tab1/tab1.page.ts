import { Component } from '@angular/core';
import { RecipesService } from '../providers/recipes.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  recipes : any;
  filterTerm!: string;

  constructor(private recipeSvc: RecipesService){
    recipeSvc.load().subscribe((res : any) => {
      this.recipes = res;
    });
  }



}
