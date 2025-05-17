import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'builder-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
