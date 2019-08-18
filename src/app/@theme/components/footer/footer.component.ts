import { Component } from "@angular/core";

@Component({
  selector: "ngx-footer",
  styleUrls: ["./footer.component.scss"],
  template: `
    <div class="socials">
      <a
        href="https://github.com/4mphor4/indiaca-digital"
        target="_blank"
        class="ion ion-social-github"
      ></a>
    </div>
  `
})
export class FooterComponent {}
