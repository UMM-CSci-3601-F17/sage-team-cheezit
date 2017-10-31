import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveCardDialogComponent } from './save-card-dialog.component';

describe('SaveCardDialogComponent', () => {
  let component: SaveCardDialogComponent;
  let fixture: ComponentFixture<SaveCardDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveCardDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
