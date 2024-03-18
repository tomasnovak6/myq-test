import {Component, Input, OnInit} from '@angular/core';
import {TreeTableModule} from "primeng/treetable";
import {TranslateModule} from "@ngx-translate/core";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {IContactsData} from "../../model/i-contacts-data";
import {TreeNode} from "primeng/api";

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [
    TreeTableModule,
    TranslateModule,
    ButtonModule,
    TableModule
  ],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent implements OnInit {

  @Input() contacts: IContactsData[] = [];

  constructor() {}

  public ngOnInit(): void {

  }

  public onCreateContact(): void {
    console.log('onCreateContact');
  }

  public onEditContact(email: string): void {
    console.log('onEditContact');
  }

  public onDeleteConfirm(email: string): void {
    console.log('onDeleteConfirm');
  }

}
