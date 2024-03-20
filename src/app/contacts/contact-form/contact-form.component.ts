import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    InputTextModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent implements OnInit {

  @Input() formShown: boolean = false;
  @Output() formShownEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() formType: 'create' | 'edit' = 'create';

  public formGroup = this.fb.group({
    fullname: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    group: ['', Validators.required],
    tags: ['', Validators.required]
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
