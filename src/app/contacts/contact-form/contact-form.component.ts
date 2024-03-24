import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {TranslateModule} from "@ngx-translate/core";
import {ContactsService} from "../../services/contacts.service";
import {CommonService} from "../../services/common.service";
import {IContacts} from "../../model/i-contacts";

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
  styleUrl: './contact-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactFormComponent implements OnInit {

  @Input() formShown: boolean = false;
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() toastMessage: EventEmitter<string> = new EventEmitter<string>();

  @Input() formType: 'create' | 'edit' = 'create';

  public contactForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private contactsService: ContactsService,
    private commonService: CommonService
  ) {
    this.contactForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      phone: [''],
      group: [''],
      tags: ['']
    });
  }

  ngOnInit(): void {

  }

  ngOnChanges(): void {

  }

  public onClose(): void {
    this.close.emit(true);
  }

  public onSubmit(): void {
    if (this.contactForm.valid) {
      const contact: IContacts = {
        fullname: this.contactForm.get('fullname')!.value,
        email: this.contactForm.get('email')!.value,
        phone: this.contactForm.get('phone')!.value,
        group: this.contactForm.get('group')!.value,
        tags: this.contactForm.get('tags')!.value
      };

      if (this.formType === 'create') {

        this.toastMessage.emit('contacts.operations.create.success');
      } else if (this.formType === 'edit') {

        this.toastMessage.emit('contacts.operations.edit.success');
      }

      this.onClose();
    } else {
      this.commonService.markFormGroupTouched(this.contactForm);
    }
  }

}
