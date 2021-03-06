import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Link } from '../../../models/link';
import { LinkService } from '../../../services/link.service';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-link-form',
  templateUrl: './link-form.component.html',
  styles: [``]
})
export class LinkFormComponent {

  @Input() link = new Link();
  tags = '';
  error = '';
  shortLinkisCopied = false;
  shortedLinkUrl = '';
  @Output() addLink = new EventEmitter<Link>();
  @Output() refreshPage = new EventEmitter();

  constructor(private linkService: LinkService,
              private auth: AuthenticationService) {
               }

  AddLink(): void {
    this.link.shortUrl = this.getShortUrl();
    this.link.clicks = 0;
    this.link.tags = this.tags.split(/[' ,.']/).filter(tag => tag !== '');
    this.link.user_id = this.auth.user_id;
    this.linkService.addLink(this.link)
      .subscribe(
      data => {
        if (data.success === true) {
          this.link._id = data._id;
          this.addLink.emit(this.link);
          this.shortedLinkUrl = this.link.shortUrl;
          this.link = new Link();
          this.tags = '';
          this.error = '';
        } else {
          this.error = data.message;
        }
      });
  }

  onRefreshPage() {
    this.refreshPage.emit();
  }

  EncodeURL(): string {
    let text = '';
    const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 6; i++) {
      text += str.charAt(Math.floor(Math.random() * str.length));
    }
    return text;
  }

  private getShortUrl(): string {
    return this.EncodeURL();
  }
}
