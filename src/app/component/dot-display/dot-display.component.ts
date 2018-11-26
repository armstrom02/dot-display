import { Component, OnInit } from '@angular/core';
import { AlphabateCode } from './alphabetcode';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'app-dot-display',
  templateUrl: './dot-display.component.html',
  styleUrls: ['./dot-display.component.css']
})
export class DotDisplayComponent implements OnInit {

  alphabate = AlphabateCode
  textInput;
  dotArray = []
  constructor() {

  }

  ngOnInit() {
    this.buildDotArray();
  }

  buildDotArray() {
    this.dotArray = [];
    for (let i = 0; i < 16; i++) {
      let tempRow = [];
      for (let j = 0; j < 60; j++) {
        tempRow.push({ x: i, y: j, active: false });
      }
      this.dotArray.push(tempRow);
    }
  }

  generateAlphabet() {
    this.buildDotArray();
    var x = 0;
    var y = 0
    for (let alpha of this.textInput.split('')) {
      const code = this.alphabate[alpha]
      for (let value of code) {
        this.dotArray[(value.x)][value.y + (x * 6)].active = true
      }
      x++;
    }
  }

  moveleft() {
    for (let value of this.dotArray) {
      for (let dot of value) {
        if (dot.active) {
          this.dotArray[dot.x][dot.y].active = false;
          if (dot.y - 1 >= 0) {
            this.dotArray[dot.x][dot.y - 1].active = true;
          } else {
            this.dotArray[dot.x][60 + (dot.y - 1)].active = true;
          }

        }
      }
    }
    setTimeout(() => {
      this.moveleft();
    }, 200);
  }
}
