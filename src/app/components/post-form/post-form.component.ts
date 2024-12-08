import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
})
export class PostFormComponent {
  form: FormGroup;
  @Output() submit = new EventEmitter<{ username: string; text: string }>();
  @Output() cancel = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      text: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.submit.emit(this.form.value);
      this.form.reset();
    }
  }
}
