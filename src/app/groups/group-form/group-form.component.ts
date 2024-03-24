import {Component, Input, OnInit, Output, EventEmitter, OnChanges, ChangeDetectionStrategy} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {NgIf} from "@angular/common";
import {GroupsService} from "../../services/groups.service";
import {CommonService} from "../../services/common.service";

@Component({
  selector: 'app-group-form',
  standalone: true,
    imports: [
      NgIf,
      ButtonModule,
      DialogModule,
      InputTextModule,
      ReactiveFormsModule,
      TranslateModule
    ],
  templateUrl: './group-form.component.html',
  styleUrl: './group-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupFormComponent implements OnInit, OnChanges {

  @Input() formShown: boolean = false;
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() toastMessage: EventEmitter<string> = new EventEmitter<string>();

  @Input() formType: 'create' | 'edit' = 'create';
  @Input() formName: string = '';
  private nameValueOrig: string = '';

  groupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private groupsService: GroupsService,
    private commonService: CommonService,
  ) {
    this.groupForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.formType === 'edit') {
      this.nameValueOrig = this.formName;
      this.groupForm.get('name')?.setValue(this.nameValueOrig);
    }
  }

  public onClose(): void {
    this.close.emit(true);
  }

  public onSubmit(): void {
    if (this.groupForm.valid) {
      const nameNew: string = this.groupForm.get('name')!.value;

      if (this.formType === 'create') {
        this.groupsService.createGroup(nameNew);
        this.toastMessage.emit('groups.operations.create.success');
      } else if (this.formType === 'edit') {
        this.groupsService.editGroup(this.nameValueOrig, nameNew);
        this.toastMessage.emit('groups.operations.edit.success');
      }

      this.onClose();
    } else {
      this.commonService.markFormGroupTouched(this.groupForm);
    }
  }

}
