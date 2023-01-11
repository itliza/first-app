import {Component} from "@angular/core";


@Component({
  selector:'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent { 
  getName() {
    alert('Liza');
  }
}

// import {FlatTreeControl} from '@angular/cdk/tree';
// import {Component} from '@angular/core';
// import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';

// interface FoodNode {
//   name: string;
//   children?: FoodNode[];
// }

// const TREE_DATA: FoodNode[] = [
//   {
//     name: 'Settings',
//     children: [{name: 'Users'}, {name: 'Vehicles'}, {name: 'Sources'}],
//   },
// ];


// interface ExampleFlatNode {
//   expandable: boolean;
//   name: string;
//   level: number;
// }

// @Component({
//   selector: 'app-sidenav',
//   templateUrl: './sidenav.component.html',
//   styleUrls: ['./sidenav.component.css']
// })
// export class SidenavComponent {
//   private _transformer = (node: FoodNode, level: number) => {
//     return {
//       expandable: !!node.children && node.children.length > 0,
//       name: node.name,
//       level: level,
//     };
//   };

//   treeControl = new FlatTreeControl<ExampleFlatNode>(
//     node => node.level,
//     node => node.expandable,
//   );

//   treeFlattener = new MatTreeFlattener(
//     this._transformer,
//     node => node.level,
//     node => node.expandable,
//     node => node.children,
//   );

//   dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

//   constructor() {
//     this.dataSource.data = TREE_DATA;
//   }

//   hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
// }


/**  Copyright 2023 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */


