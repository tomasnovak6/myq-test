import {Component, OnInit} from '@angular/core';
import {TableModule} from "primeng/table";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ButtonModule} from "primeng/button";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";

export interface IGroup {
  id: number;
  name: string;
}

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
    ReactiveFormsModule
  ],
  templateUrl: './group-list.component.html',
  styleUrl: './group-list.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class GroupListComponent implements OnInit {

  public formShown: boolean = false;
  public formGroup = this.fb.group({
    name: ['', Validators.required]
  });

  public groups: IGroup[] = [
    {id: 1, name: 'Skupina 1'},
    {id: 2, name: 'Skupina 2'}
  ];

  constructor(
    private transateService: TranslateService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {}

  public ngOnInit(): void {
  }

  public onCreateGroup(): void {
    this.formShown = true;
  }

  public onEditGroup(name: string): void {
    this.formShown = true;
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
