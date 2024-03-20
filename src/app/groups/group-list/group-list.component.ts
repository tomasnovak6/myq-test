import {Component, Input, OnInit} from '@angular/core';
import {TableModule} from "primeng/table";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ButtonModule} from "primeng/button";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {IGroups} from "../../model/i-groups";
import {GroupFormComponent} from "../group-form/group-form.component";

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
  providers: [ConfirmationService, MessageService]
})
export class GroupListComponent implements OnInit {

  public formShown: boolean = false;
  public formType: 'create' | 'edit' = 'create';

  @Input() groups: IGroups[] = []

  constructor(
    private transateService: TranslateService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
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

  public onEditGroup(name: string): void {
    this.onFormOpen('edit');
  }

  public onDeleteConfirm(name: string): void {
    this.confirmationService.confirm({
      header: this.transateService.instant('groups.operations.delete.header'),
      message: this.transateService.instant('groups.operations.delete.message'),
      icon: 'pi pi-info-circle',
      accept: () => {
        this.onDeleteGroup(name);
      },
    });
  }

  public onDeleteGroup(name: string): void {
    this.messageService.add({severity: 'success', summary: this.transateService.instant('groups.operations.delete.success')});
  }

}
