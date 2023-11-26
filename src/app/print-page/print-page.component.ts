import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreLabelComponent } from '../store-label/store-label.component';

@Component({
  selector: 'app-print-page',
  standalone: true,
  imports: [CommonModule, StoreLabelComponent],
  templateUrl: './print-page.component.html',
  styleUrl: './print-page.component.css'
})
export class PrintPageComponent {

}
