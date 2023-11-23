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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ZXingScannerModule,
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule,
    MatToolbarModule, MatCardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'wwang';
  AllowedFormats = [BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX /*, ...*/];

  ScanResult = "";
  SuccessScan(result: string): void {
    console.log(result);
    this.ScanResult = result;
  }
}
