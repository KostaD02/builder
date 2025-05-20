import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'builder-create-page',
  imports: [CommonModule],
  templateUrl: './create-page.component.html',
  styleUrl: './create-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePageComponent {}
