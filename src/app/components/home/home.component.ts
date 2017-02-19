import { Component } from '@angular/core';
import { Link } from '../../models/link';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})

export class HomeComponent {
  link: Link;

  OnAddLink(link: Link): void {
    this.link = link;
  }

  OnRefreshpage() {

  }
}

