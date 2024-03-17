import {Component, OnInit} from '@angular/core';
import {TableModule} from "primeng/table";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ButtonModule} from "primeng/button";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";

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
    ToastModule
  ],
  templateUrl: './group-list.component.html',
  styleUrl: './group-list.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class GroupListComponent implements OnInit {

  public groups: IGroup[] = [
    {id: 1, name: 'Skupina 1'},
    {id: 2, name: 'Skupina 2'}
  ];

  constructor(
    private transateService: TranslateService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  public ngOnInit(): void {

  }

  public onCreateGroup(): void {
    console.log('onCreateGroup');
  }

  public onEditGroup(id: number): void {
    console.log('onEditGroup');
  }

  public onDeleteConfirm(id: number): void {
    this.confirmationService.confirm({
      header: this.transateService.instant('groups.operations.delete.header'),
      message: this.transateService.instant('groups.operations.delete.message'),
      icon: 'pi pi-info-circle',
      accept: () => {
        this.onDeleteGroup(id);
      },
    });
  }

  public onDeleteGroup(id: number): void {
    this.messageService.add({severity: 'success', summary: this.transateService.instant('groups.operations.delete.success')});
  }

}
