import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ButtonDirective,
  ColComponent,
  ContainerComponent,
  RowComponent,
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.scss'],
  imports: [
    ContainerComponent,
    RowComponent,
    ColComponent,
    IconDirective,
    ButtonDirective,
    RouterLink,
  ],
})
export class Page404Component {
  constructor() {}
}
