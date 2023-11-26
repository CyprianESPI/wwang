import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from '../app.component';

@Component({
  selector: 'app-store-label',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './store-label.component.html',
  styleUrl: './store-label.component.css'
})
export class StoreLabelComponent {
  @Input() item!: Item;
}
