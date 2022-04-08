import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
//import { SearchClass } from '../models/search-class';

@Injectable({
  providedIn: 'root'
})

export class RecipesService {

  data: any;
  ings : string[] = [];
  //searchDS : SearchClass[] = [];

  constructor(public http: HttpClient) {}

  load(): any {
      return this.http
        .get('https://ydx8zdq7uc.execute-api.us-east-1.amazonaws.com/api/recipes')
        
        .pipe(
          map((res:any) => {
            return res.map(item => { 
              //convert to dates
              item.createdAt = new Date(item.createdAt).toLocaleDateString("en-US");
              item.updatedAt = new Date(item.updatedAt).toLocaleDateString("en-US");
              //console.log(item.ings);

              if (item.ings)
              {
                item.ings.forEach(i => {
                  if (!this.ings.includes(i.value)) {
                    this.ings.push(i.value);
                  }
                });
              } 

              if (item.tags)
              {
                item.tags = item.tags.split(" ");
              }
              else{
                item.tags = [];
              }
              
              if (item.partyFlg) item.tags.push("party");
              if (item.appFlg) item.tags.push("app");
              if (item.pastryFlg) item.tags.push("pastry");
              if (item.tryFlg) item.tags.push("try");
              if (item.slowFlg) item.tags.push("slow");
              if (item.basicFlg) item.tags.push("basic");
              if (item.entreeFlg) item.tags.push("entree");
              
              //remove empty tag strings
              item.tags = item.tags.filter(e => e);

              delete item.partyFlg;
              delete item.appFlg;
              delete item.pastryFlg;
              delete item.tryFlg;
              delete item.slowFlg;
              delete item.basicFlg;
              delete item.entreeFlg;

              item.rating=4;

              //console.log(item);
              return item;
            });
        }));
  }

  getRecipes() {
    return this.load().pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getIngs() {
    return this.ings;
  }

  /*getSearchDS() {
    return this.searchDS;
  }*/
}