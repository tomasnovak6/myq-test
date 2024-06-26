import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {TreeTable, TreeTableModule} from "primeng/treetable";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {IContacts} from "../../model/i-contacts";
import {ConfirmationService, TreeNode} from "primeng/api";
import {ContactFormComponent} from "../contact-form/contact-form.component";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ContactsService} from "../../services/contacts.service";
import {NodeService} from "../../services/node.service";
import {NgFor, NgIf} from "@angular/common";
import {EnumFormType} from "../../model/enum-form-type";
import {InputTextModule} from "primeng/inputtext";

interface Column {
  field: string;
  header: string;
  size: string;
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
    ConfirmDialogModule, InputTextModule
  ],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss',
  providers: [ConfirmationService]
})
export class ContactListComponent implements OnInit {

  public formShown: boolean = false;
  public formType: EnumFormType = EnumFormType.CREATE;
  public formEmail: string = '';

  public files!: TreeNode[];
  public cols!: Column[];
  public filterMode: string = 'lenient';

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
  }

  public getData(): void {
    this.contacts = this.contactsService.getContacts();
    this.nodeService.getContactNodesData().then((files) => (this.files = files));
    this.cols = [
      { field: 'fullname', header: this.translateService.instant('contacts.fullname'), size: '35%' },
      { field: 'email', header: this.translateService.instant('contacts.email'), size: '20%' },
      { field: 'phone', header: this.translateService.instant('contacts.phone'), size: '15%'},
      { field: 'tags', header: this.translateService.instant('contacts.tags'), size: '15%'},
      { field: '', header: '', size: '15%' }
    ];
  }

  public onFormOpen(type: EnumFormType, email: string): void {
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

  public onEditContact(type: EnumFormType, email: string): void {
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

  protected readonly EnumFormType = EnumFormType;
}
