import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreLabelComponent } from './store-label.component';

describe('StoreLabelComponent', () => {
  let component: StoreLabelComponent;
  let fixture: ComponentFixture<StoreLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreLabelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StoreLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
