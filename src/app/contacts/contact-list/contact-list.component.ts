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
import {LocalStorageService} from "../../services/local-storage.service";

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [
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

  @Input() contacts: IContacts[] = [];
  @Output() toastMessage: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private translateService: TranslateService,
    private confirmationService: ConfirmationService,
    private localStorageService: LocalStorageService
  ) {}

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
    this.confirmationService.confirm({
      header: this.translateService.instant('contacts.operations.delete.header'),
      message: this.translateService.instant('contacts.operations.delete.message'),
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.onDeleteContact(email);
      },
    });

  }

  public onDeleteContact(email: string): void {
    this.toastMessage.emit('contacts.operations.delete.success');
  }

}
