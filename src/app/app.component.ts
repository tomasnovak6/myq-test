import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ContactListComponent} from "./contacts/contact-list/contact-list.component";
import {GroupListComponent} from "./groups/group-list/group-list.component";
import {TranslateService} from "@ngx-translate/core";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {IContacts} from "./model/i-contacts";
import {ContactsService} from "./services/contacts.service";
import {IGroups} from "./model/i-groups";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ContactListComponent, GroupListComponent, ConfirmDialogModule, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService]
})
export class AppComponent implements OnInit {
  title: string = 'MyQ test example';

  public contacts: IContacts[] = [];
  public groups: IGroups[] = [];

  constructor(
    private translateService: TranslateService,
    private messageService: MessageService,
    private contactsService: ContactsService,
  ) {
    const currentLanguage: 'en' | 'cs' = 'en';
    translateService.setDefaultLang(currentLanguage);
    translateService.use(currentLanguage);
  }

  public ngOnInit(): void {
    this.getContactsData();

  }

  private getContactsData(): void {
    this.contacts = this.contactsService.getContacts();
  }

  public showToastMessage(message: string): void {
    this.messageService.add({severity: 'success', summary: this.translateService.instant(message)});
  }

  // public deleteGroup(name: string): void {
  //   this.groups = this.groupsService.deleteGroup(name);
  // }
  //
  // public editGroup(name: string): void {
  //   this.groups = this.groupsService.editGroup('a', 'b');
  // }
  //
  // public createGroup(name: string): void {
  //
  // }

}
