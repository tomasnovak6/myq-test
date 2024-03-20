import {Component, Input, OnInit} from '@angular/core';
import {TreeTableModule} from "primeng/treetable";
import {TranslateModule} from "@ngx-translate/core";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {IContacts} from "../../model/i-contacts";
import {TreeNode} from "primeng/api";
import {ContactFormComponent} from "../contact-form/contact-form.component";

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [
    TreeTableModule,
    TranslateModule,
    ButtonModule,
    TableModule,
    ContactFormComponent
  ],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent implements OnInit {

  public formShown: boolean = false;
  public formType: 'create' | 'edit' = 'create';

  @Input() contacts: IContacts[] = [];

  constructor() {}

  public ngOnInit(): void {

  }

  public onFormOpen(type: 'create' | 'edit'): void {
    this.formShown = true;
    this.formType = type;
  }

  public onFormClose(): void {
    this.formShown = false;
  }

  public onEditContact(email: string): void {
    console.log('onEditContact');
  }

  public onDeleteConfirm(email: string): void {
    console.log('onDeleteConfirm');
  }

}
