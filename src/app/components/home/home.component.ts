import { Component } from '@angular/core';
import { Link } from '../../models/link';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
  th,td {
    word-break: break-all;
}
  `]
})

export class HomeComponent {
  link: Link;

  OnAddLink(link: Link): void {
    this.link = link;
  }

  OnRefreshpage() {

  }
}

