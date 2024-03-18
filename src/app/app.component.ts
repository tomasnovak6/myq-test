import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ContactListComponent} from "./contacts/contact-list/contact-list.component";
import {GroupListComponent} from "./groups/group-list/group-list.component";
import {TranslateService} from "@ngx-translate/core";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {IContactsData} from "./model/i-contacts-data";
import {ContactsService} from "./services/contacts.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ContactListComponent, GroupListComponent, ConfirmDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title: string = 'MyQ test example';

  public contacts: IContactsData[] = [];

  constructor(
    translate: TranslateService,
    private contactsService: ContactsService
  ) {
    const currentLanguage: 'en' | 'cs' = 'en';
    translate.setDefaultLang(currentLanguage);
    translate.use(currentLanguage);
  }

  public ngOnInit(): void {
    this.getContactsData();
  }

  private getContactsData(): void {
    this.contactsService.getCsvContactsData().subscribe(contacts => {
      this.contacts = contacts;
    });
  }

}
