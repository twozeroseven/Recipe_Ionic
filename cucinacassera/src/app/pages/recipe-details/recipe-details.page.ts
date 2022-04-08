import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as convert from "convert-units";

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
})

export class RecipeDetailsPage implements OnInit {

  recipe = null;
  volumePossibilities = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.recipe = this.router.getCurrentNavigation().extras.state.recipe;
        console.log(`Recipe details: ${this.recipe}`);
      }
    });
    this.volumePossibilities = convert(1).possibilities();
  }

  ngOnInit() {
    
  }

  processIgnoreKeyword(amtStr:string){
    let ignoreAmtKeywords = ["each", "needed", "taste"];
    return ignoreAmtKeywords.reduce(function (accumulator, keyword) {
      return (amtStr.includes(keyword) ? 1 : 0) + accumulator;
    }, -1);
  }

  parseAmt(amtStr:string) {
    if (this.processIgnoreKeyword(amtStr) < 0)
    {
      console.log("got here");
    }
  }

  switchAmt(event, amtStr:string) {
    
    //extract number & volume
    //this.parseAmt(amt);
    var num = 1;
    var volume = "fl oz";

    //find volume in volumePossibilities
    //this.volumePossibilities.contains(volume); 

    //convert to next in volumePossibilities
    //convert(num).from()
  }
  
}
