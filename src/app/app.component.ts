import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ContactListComponent} from "./contacts/contact-list/contact-list.component";
import {GroupListComponent} from "./groups/group-list/group-list.component";
import {TranslateService} from "@ngx-translate/core";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {IContacts} from "./model/i-contacts";
import {ContactsService} from "./services/contacts.service";
import {IGroups} from "./model/i-groups";
import {GroupsService} from "./services/groups.service";
import {GroupsComponent} from "./groups/groups.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ContactListComponent, GroupListComponent, ConfirmDialogModule, GroupsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title: string = 'MyQ test example';

  public contacts: IContacts[] = [];
  public groups: IGroups[] = [];

  constructor(
    translate: TranslateService,
    private contactsService: ContactsService,
    private groupsService: GroupsService
  ) {
    const currentLanguage: 'en' | 'cs' = 'en';
    translate.setDefaultLang(currentLanguage);
    translate.use(currentLanguage);
  }

  public ngOnInit(): void {
    this.getContactsData();
    this.getGroupsData();
  }

  private getContactsData(): void {
    this.contactsService.getContacts().subscribe(contacts => {
      this.contacts = contacts;
    });
  }

  private getGroupsData(): void {
    this.groupsService.getGroups().subscribe(groups => {
      this.groups = groups;
    });
  }

}
