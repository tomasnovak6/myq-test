import {Component, Input, OnInit, Output, EventEmitter, Inject} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {DOCUMENT} from "@angular/common";
import {LocalStorageService} from "../../services/local-storage.service";

@Component({
  selector: 'app-group-form',
  standalone: true,
    imports: [
        ButtonModule,
        DialogModule,
        InputTextModule,
        ReactiveFormsModule,
        TranslateModule
    ],
  templateUrl: './group-form.component.html',
  styleUrl: './group-form.component.scss'
})
export class GroupFormComponent implements OnInit {

  @Input() formShown: boolean = false;
  @Output() formShownEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() formType: 'create' | 'edit' = 'create';

  public formGroup = this.fb.group({
    name: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService
  ) {

  }

  public ngOnInit(): void {

  }

  public onClose(): void {
    this.formShownEvent.emit(false);
  }

  public onSubmit(): void {
    // if (this.formGroup.valid) {
    //   const nameValue = this.formGroup.value.name as string;
    //   this.groupEdit.emit({oldValue: this.nameEdit, newValue: nameValue})
    // } else {
    //   this.formGroup.markAsTouched();
    // }

    // console.log('local', this.localStorageService.getItemObject('groups_local'));
  }

}
