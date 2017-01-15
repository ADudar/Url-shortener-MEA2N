import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Link } from '../../models/link';

@Component({
  selector: 'app-link-form',
  templateUrl: './link-form.component.html',
  styleUrls: ['./link-form.component.less']
})
export class LinkFormComponent {

  @Input()
  link = new Link();
  shortLinkisCopied: boolean = false;
  shortedLinkUrl = "";
  @Output()
  submitForm = new EventEmitter<Link>();
  constructor() { }

  AddLink(): void {

    this.getShortUrl();
    this.generateID();
    this.processTags();
    this.link.clicks = 0;
    this.shortedLinkUrl = this.link.shortUrl;
    this.submitForm.emit(this.link);
    // this.links.unshift(this.link);
    this.link = new Link();     //for clear the fields
  }

  EncodeURL(): string {
    var text = "";
    var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 6; i++) {

      text += str.charAt(Math.floor(Math.random() * str.length))
    }
    return text;
  }

  private makeId() {
    return Math.floor((Math.random() * 1000));

  }

  private processTags():void {
    var tags = this.link.tags.split(" ");
    this.link.tags = "";
    tags.forEach(tag => {
      this.link.tags += "#" + tag + " ";
    });
  }

  private getShortUrl(): void {
    this.link.shortUrl = "" + window.location.hostname + ":" + window.location.port + "/" + this.EncodeURL();
  }

  private generateID() : void {
    this.link._id = this.makeId();
  }
}
