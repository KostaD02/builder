import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CapitalizePipe } from '@builder/infra/pipes';
import { Metadata } from '@builder/infra/types';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';

@Component({
  selector: 'builder-metadata',
  imports: [
    ReactiveFormsModule,
    CapitalizePipe,
    MatFormField,
    MatInput,
    MatButton,
    MatLabel,
    MatError
  ],
  templateUrl: './metadata.component.html',
  styleUrl: './metadata.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataComponent {
  private readonly fb = inject(FormBuilder);
  private readonly snackbar = inject(MatSnackBar);

  readonly isIndexPage = input<boolean>(false);
  readonly isEdit = input<boolean>(false);
  readonly data = input<Metadata | null>(null);
  readonly result = output<Metadata>();
  readonly delete = output<void>();

  readonly metadata = this.fb.group({
    title: this.fb.control('', {
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
      ],
    }),
    description: this.fb.control('', {
      validators: [Validators.maxLength(200)],
    }),
    slug: this.fb.control('', {
      validators: [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
      ],
    }),
    imageUrl: this.fb.control('', {
      validators: [
        Validators.pattern(
          'https?://(?:www\\.)?[a-zA-Z0-9./-]+\\.(?:jpg|jpeg|png|gif|webp)',
        ),
      ],
    }),
  });

  readonly formItems = Object.entries(this.metadata.controls);

  constructor() {
    effect(() => {
      const slugControl = this.metadata.controls.slug;
      if (this.isIndexPage()) {
        slugControl.setValue('index');
        slugControl.disable();
      } else {
        slugControl.enable();
      }
      const data = this.data();
      if (data && this.isEdit()) {
        this.metadata.patchValue(data);
      }
    });
  }

  emitResult(): void {
    // Double check if the form is valid
    if (this.metadata.invalid) {
      this.snackbar.open('Please fill all inputs accordingly.', 'Close', {
        duration: 3000,
      });
      return;
    }

    this.result.emit(this.metadata.getRawValue() as Metadata);

    if (!this.isEdit()) {
      this.reset();
    }
  }

  reset(): void {
    const data = this.data();
    if (data && this.isEdit()) {
      this.metadata.patchValue(data);
      return;
    }
    this.metadata.reset({
      slug: '',
      title: '',
      imageUrl: '',
      description: '',
    });
    this.metadata.markAsPristine();
    this.metadata.markAsUntouched();
  }
}
