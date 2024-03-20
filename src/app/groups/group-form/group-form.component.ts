import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";

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
    private fb: FormBuilder
  ) {

  }

  public ngOnInit(): void {
  }

  public onClose(): void {
    this.formShownEvent.emit(false);
  }

}
