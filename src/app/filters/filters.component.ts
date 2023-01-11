// import {Component, ViewChild} from '@angular/core';
// import {MatAccordion} from '@angular/material/expansion';
//
// /**
//  * @title Accordion with expand/collapse all toggles
//  */
// @Component({
//   selector: 'app-filters',
//   templateUrl: './filters.component.html',
//   styleUrls: ['./filters.component.css'],
// })
// export class FiltersComponent {
//   @ViewChild(MatAccordion) accordion: MatAccordion;
// }
import {Component} from '@angular/core';

@Component({
  selector: 'app-filters',
  styleUrls: ['./filters.component.css'],
  templateUrl: './filters.component.html',
})
export class FiltersComponent {
  bold = false;
  italic = false;

  sizes = ['Small', 'Normal', 'Large'];
  selectedSize: string | undefined = 'Normal';

  reset() {
    this.bold = false;
    this.italic = false;
    this.selectedSize = 'Normal';
  }
}
