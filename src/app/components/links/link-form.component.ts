import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Link } from '../../models/link';
import { LinkService } from '../../services/link.service';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

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
  addLink = new EventEmitter<Link>();
  constructor(private linkService: LinkService, private route: ActivatedRoute,
  private auth: AuthenticationService) { }


  AddLink(): void {
    console.log("method add in link-form call");
    this.link.shortUrl = this.getShortUrl();
    // this.generateID();
    this.processTags();
    this.link.clicks = 0;
    this.auth.getCurrentUser()
    .subscribe(user => {
      this.link.user_id = user._id;
          console.log("here need link full with id:");
    console.log(this.link);
    this.linkService.addLink(this.link)
      .subscribe(
      data => {
        this.addLink.emit(this.link);
        this.link = new Link();     //for clear the fields
      });

    });
    this.shortedLinkUrl = "http://" + window.location.hostname + ":" + window.location.port + "/"+ this.link.shortUrl;

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

  private processTags(): void {
    var tags = this.link.tags.split(" ");
    this.link.tags = "";
    tags.forEach(tag => {
      this.link.tags += "#" + tag + " ";
    });
  }

  private getShortUrl(): string {
    return  this.EncodeURL();
  }

  private generateID(): void {
    this.link._id = this.makeId();
  }

  // ngOnInit(): void {
  //   this.route.params
  //     .switchMap((params: Params) => this.linkService.getLink(+params['_id']))
  //     .subscribe(link => this.link = link);
  // }

  // save(): void {
  //   this.linkService.update(this.link)
  //     .then(() => this.goBack());
  // }

  // AddLink(): void {

  //   this.getShortUrl();
  //   this.generateID();
  //   this.processTags();
  //   this.link.clicks = 0;
  //   this.shortedLinkUrl = this.link.shortUrl;
  //   this.submitForm.emit(this.link);
  //   // this.links.unshift(this.link);
  //   this.link = new Link();     //for clear the fields
  // }


}
