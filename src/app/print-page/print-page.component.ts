import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreLabelComponent } from '../store-label/store-label.component';
import { Item } from '../db/db';

@Component({
  selector: 'app-print-page',
  standalone: true,
  imports: [CommonModule, StoreLabelComponent],
  templateUrl: './print-page.component.html',
  styleUrl: './print-page.component.css'
})
export class PrintPageComponent {
  @Input() items!: Item[];
  item = {
    "Num": "A0001",
    "Name": "",
    "Name_EN": "Hata ramune",
    "Barcode": "4902494008004",
    "Price": "2.00",
    "Stock": "60.0",
    "Price1": "1.09",
    "Discount": "0.0",
    "TVA": "1",
    "Field10": "",
    "Field11": ""
  };
}
