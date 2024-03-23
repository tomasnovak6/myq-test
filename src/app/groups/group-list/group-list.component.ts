import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TableModule} from "primeng/table";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ButtonModule} from "primeng/button";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {ReactiveFormsModule} from "@angular/forms";
import {IGroups} from "../../model/i-groups";
import {GroupFormComponent} from "../group-form/group-form.component";
import {LocalStorageService} from "../../services/local-storage.service";
import {GroupsService} from "../../services/groups.service";

@Component({
  selector: 'app-group-list',
  standalone: true,
  imports: [
    TableModule,
    TranslateModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    DialogModule,
    InputTextModule,
    ReactiveFormsModule,
    GroupFormComponent
  ],
  templateUrl: './group-list.component.html',
  styleUrl: './group-list.component.scss',
  providers: [ConfirmationService]
})
export class GroupListComponent implements OnInit {

  public formShown: boolean = false;
  public formType: 'create' | 'edit' = 'create';

  groups: IGroups[] = [];
  @Output() toastMessage: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private translateService: TranslateService,
    private confirmationService: ConfirmationService,
    private groupsService: GroupsService,
    private localStorageService: LocalStorageService
  ) {

  }

  public ngOnInit(): void {
    this.groups = this.groupsService.getGroups();
    if (this.groups) {
      this.localStorageService.setItemObject('groups_local', this.groups);
    }
  }

  public onFormOpen(type: 'create' | 'edit'): void {
    this.formShown = true;
    this.formType = type;
  }

  public onFormClose(): void {
    this.formShown = false;
  }

  public onEditGroup(name: string): void {
    this.onFormOpen('edit');
  }

  public onDeleteConfirm(name: string): void {
    this.confirmationService.confirm({
      header: this.translateService.instant('groups.operations.delete.header'),
      message: this.translateService.instant('groups.operations.delete.message'),
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.onDeleteGroup(name);
      },
    });
  }

  public onDeleteGroup(name: string): void {
    this.toastMessage.emit('groups.operations.delete.success');
  }

}
