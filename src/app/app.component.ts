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
import { Item, Db, PrettyItem } from '../app/db/db';

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
  readonly LS_KEY_PRINT_ITEMS: string = "PrintItems";
  constructor() {
    this.UpdateDbVisitCount();

    // Load array in case of refresh
    const storedArray: string = localStorage.getItem(this.LS_KEY_PRINT_ITEMS) ?? "";
    if (storedArray !== "") {
      try {
        this.PrintItems = JSON.parse(storedArray);
      }
      catch (e) {
        console.error("Error loading PrintItems", e);
      }
    }
  }
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

  UpdateDbVisitCount(): void {
    const url = "https://script.google.com/macros/s/AKfycbxkh7Sq_1On4Go3JVRAleISpWRgqYYj3s_-44tjhtuS3BFcRbWILOEDsA6hf8BNEBd2/exec";
    fetch(url, {
      method: 'GET',
      // options here, like the method (GET, POST, etc.) and maybe headers for authentication (this will depend on what the AlphaVantage API wants)
    }).then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const json = response.json(); // assuming they return json
      console.log(json);
      return json;
    }).then(body => {
      // do what you want with the response body here
    });
  }

  Items: Item[] = Db.Items;
  MatchingItems: PrettyItem[] = [];
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
    const matching_items = this.Items.filter(o => o.Barcode.includes(this.ScanResult)).slice(0, max_results);
    this.MatchingItems = [];
    matching_items.forEach((item) => {
      // Make barcode more readable by adding separtor every X char
      const separator = "_";
      let pretty_barcode: string = "";
      let chars: number = 0;
      for (let i = item.Barcode.length - 1; i >= 0; i--) {
        chars = (chars + 1) % 6;
        pretty_barcode = item.Barcode[i] + pretty_barcode;
        // Text cannot start with separator
        if (chars === 0 && i > 0) {
          pretty_barcode = separator + pretty_barcode;
        }
      }
      const pretty_item: PrettyItem = {
        Num: item.Num,
        Name: item.Name,
        Name_EN: item.Name_EN,
        Barcode: item.Barcode,
        Price: item.Price,
        Stock: item.Stock,
        Price1: item.Price1,
        Discount: item.Discount,
        TVA: item.TVA,
        Field10: item.Field10,
        Field11: item.Field11,
        PrettyBarcode: pretty_barcode,
      };
      this.MatchingItems.push(pretty_item);
    })
  }

  PrintPage() {
    window.print();
  }

  AddToPrint(element: Item) {
    console.log("AddToPrint:", element);
    this.PrintItems.push(element);
    localStorage.setItem(this.LS_KEY_PRINT_ITEMS, JSON.stringify(this.PrintItems));
  }

  PopToPrint() {
    console.log("PopToPrint:", this.PrintItems.pop());
    localStorage.setItem(this.LS_KEY_PRINT_ITEMS, JSON.stringify(this.PrintItems));
  }

  ClearToPrint() {
    console.log("ClearToPrint:", this.PrintItems);
    this.PrintItems = [];
    localStorage.setItem(this.LS_KEY_PRINT_ITEMS, JSON.stringify(this.PrintItems));
  }
}
