import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ContactListComponent} from "./contacts/contact-list/contact-list.component";
import {GroupListComponent} from "./groups/group-list/group-list.component";
import {TranslateService} from "@ngx-translate/core";
import {ConfirmDialogModule} from "primeng/confirmdialog";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ContactListComponent, GroupListComponent, ConfirmDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'MyQ test example';

  constructor(translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

}
