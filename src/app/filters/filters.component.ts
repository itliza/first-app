import {Component, ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';

/**
 * @title Accordion with expand/collapse all toggles
 */
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent {
  @ViewChild(MatAccordion) accordion: MatAccordion;
}
