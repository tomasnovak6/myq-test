import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {TranslateModule} from "@ngx-translate/core";
import {ContactsService} from "../../services/contacts.service";
import {CommonService} from "../../services/common.service";
import {IContacts} from "../../model/i-contacts";
import {EnumFormType} from "../../model/enum-form-type";
import {NgIf} from "@angular/common";
import {DropdownModule} from "primeng/dropdown";
import {GroupsService} from "../../services/groups.service";
import {IGroups} from "../../model/i-groups";

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    InputTextModule,
    ReactiveFormsModule,
    TranslateModule,
    NgIf,
    DropdownModule
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactFormComponent implements OnInit, OnChanges {

  @Input() formShown: boolean = false;
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() toastMessage: EventEmitter<string> = new EventEmitter<string>();

  @Input() formType: 'create' | 'edit' = 'create';
  @Input() formEmail: string = '';

  public groups: IGroups[] = [];

  // todo: newValue neco

  public contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactsService: ContactsService,
    private groupsService: GroupsService,
    private commonService: CommonService
  ) {
    this.contactForm = this.fb.group({
      fullname: [''],
      email: ['', Validators.required],
      phone: [''],
      group: [''],
      tags: ['']
    });
  }

  ngOnInit(): void {
    this.groups = this.groupsService.getGroups();
  }

  ngOnChanges(): void {
    if (this.formType === EnumFormType.EDIT) {
      this.groups = this.groupsService.getGroups();
    }
  }

  public onClose(): void {
    this.close.emit(true);
  }

  public onSubmit(): void {
    if (this.contactForm.valid) {
      const tagsArr: string[] = (this.contactForm.get('tags')!.value).split(',');

      const contactNew: IContacts = {
        fullname: this.contactForm.get('fullname')!.value,
        email: this.contactForm.get('email')!.value,
        phone: this.contactForm.get('phone')!.value,
        group: (this.contactForm.get('group')!.value).name,
        tags: tagsArr
      };

      console.log('contactNew', contactNew);

      if (this.formType === EnumFormType.CREATE) {
        this.contactsService.createContact(contactNew);
        this.toastMessage.emit('contacts.operations.create.success');
      } else if (this.formType === EnumFormType.EDIT) {

        this.toastMessage.emit('contacts.operations.edit.success');
      }

      this.onClose();
    } else {
      this.commonService.markFormGroupTouched(this.contactForm);
    }
  }

}
