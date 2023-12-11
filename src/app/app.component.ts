import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PrintPageComponent } from '../app/print-page/print-page.component'
import { Item, Db } from '../app/db/db';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ZXingScannerModule,
    PrintPageComponent,
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule,
    MatToolbarModule, MatCardModule, MatListModule, MatTableModule, MatProgressBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'wwang';
  AllowedFormats = [BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, /*, ...*/];
  ScannerEnabled = false;

  ScanResult = "";
  SuccessScan(result: string): void {
    console.log(result);

    // TODO: filter out values with letters

    this.ScanResult = result;
    this.ScannerEnabled = false;

    this.GetDbInfo();
  }

  Items: Item[] = Db.Items;
  MatchingItems: Item[] = [];
  PrintItems: Item[] = [];
  displayedColumns: string[] = ['Barcode', 'Price', 'Name'];

  GetDbInfo(): void {
    console.log("Searching for:", this.ScanResult);
    if (this.ScanResult === "" || this.ScanResult === null) {
      console.log("Clear matching items");
      this.MatchingItems = [];
      return;
    }

    // We limit the results to avoid slow loading
    const max_results: number = 10;
    this.MatchingItems = this.Items.filter(o => o.Barcode.includes(this.ScanResult)).slice(0, max_results);
  }

  PrintPage() {
    window.print();
  }

  AddToPrint(element: Item) {
    console.log("AddToPrint:", element);
    this.PrintItems.push(element);
  }

  ClearToPrint() {
    console.log("ClearToPrint:", this.PrintItems);
    this.PrintItems = [];
  }
}
