import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TableModule} from "primeng/table";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ButtonModule} from "primeng/button";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {ReactiveFormsModule} from "@angular/forms";
import {IGroups} from "../../model/i-groups";
import {GroupFormComponent} from "../group-form/group-form.component";
import {GroupsService} from "../../services/groups.service";
import {EnumFormType} from "../../model/enum-form-type";

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
  public formType: EnumFormType = EnumFormType.CREATE;
  public formName: string = '';

  groups: IGroups[] = [];
  @Output() toastMessage: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private translateService: TranslateService,
    private confirmationService: ConfirmationService,
    private groupsService: GroupsService
  ) {

  }

  public ngOnInit(): void {
    this.getData();
  }

  private getData(): void {
    this.groups = this.groupsService.getGroups();
  }

  public onFormOpen(type: EnumFormType, name: string): void {
    this.formShown = true;
    this.formType = type;
    if (this.formType === 'edit') {
      this.formName = name;
    }
  }

  public onFormClose(): void {
    this.formShown = false;
    this.formName = '';
    this.getData();
  }

  public onEditGroup(type: EnumFormType, name: string): void {
    this.onFormOpen(type, name);
  }

  public onDeleteGroup(name: string): void {
    this.confirmationService.confirm({
      header: this.translateService.instant('groups.operations.delete.header'),
      message: this.translateService.instant('groups.operations.delete.message'),
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: (): void => {
        this.groups = this.groupsService.deleteGroup(name);
        this.toastMessage.emit('groups.operations.delete.success');
      }
    });
  }

  protected readonly EnumFormType = EnumFormType;
}
