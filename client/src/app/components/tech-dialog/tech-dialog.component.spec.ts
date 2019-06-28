import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechDialogComponent } from './tech-dialog.component';

describe('TechDialogComponent', () => {
  let component: TechDialogComponent;
  let fixture: ComponentFixture<TechDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
