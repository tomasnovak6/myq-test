import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TreeTableModule} from "primeng/treetable";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {IContacts} from "../../model/i-contacts";
import {ConfirmationService, MessageService, TreeNode} from "primeng/api";
import {ContactFormComponent} from "../contact-form/contact-form.component";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ContactsService} from "../../services/contacts.service";
import {NodeService} from "../../services/node.service";
import {NgIf, NgFor} from "@angular/common";

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [
    NgIf, NgFor,
    TreeTableModule,
    TranslateModule,
    ButtonModule,
    TableModule,
    ContactFormComponent,
    ToastModule,
    ConfirmDialogModule
  ],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss',
  providers: [ConfirmationService]
})
export class ContactListComponent implements OnInit {

  public formShown: boolean = false;
  public formType: 'create' | 'edit' = 'create';
  public formEmail: string = '';

  public files!: TreeNode[];
  public cols!: Column[];

  @Input() contacts: IContacts[] = [];
  @Output() toastMessage: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private translateService: TranslateService,
    private confirmationService: ConfirmationService,
    private contactsService: ContactsService,
    private nodeService: NodeService
  ) {}

  public ngOnInit(): void {
    this.getData();

    this.nodeService.getFilesystem().then((files) => (this.files = files));
    this.cols = [
      { field: 'fullname', header: 'Full name' },
      { field: 'email', header: 'E-mail' },
      { field: 'phone', header: 'Phone' },
      { field: 'tags', header: 'Tags' },
      { field: '', header: '' }
    ];
  }

  public getData(): void {
    this.contacts = this.contactsService.getContacts();
  }

  public onFormOpen(type: 'create' | 'edit', email: string): void {
    this.formShown = true;
    this.formType = type;
    if (this.formType === 'edit') {
      this.formEmail = email;
    }
  }

  public onFormClose(): void {
    this.formShown = false;
    this.formEmail = '';
    this.getData();
  }

  public onEditContact(type: 'create' | 'edit', email: string): void {
    this.onFormOpen(type, email);
  }

  public onDeleteContact(email: string): void {
    this.confirmationService.confirm({
      header: this.translateService.instant('contacts.operations.delete.header'),
      message: this.translateService.instant('contacts.operations.delete.message'),
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.contacts = this.contactsService.deleteContact(email);
        this.toastMessage.emit('contacts.operations.delete.success');
      },
    });

  }

}
