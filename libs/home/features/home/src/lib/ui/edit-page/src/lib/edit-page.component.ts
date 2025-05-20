import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'builder-edit-page',
  imports: [CommonModule],
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPageComponent {}
