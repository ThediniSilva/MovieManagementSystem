import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTheaterDialogComponent } from './update-theater-dialog.component';

describe('UpdateTheaterDialogComponent', () => {
  let component: UpdateTheaterDialogComponent;
  let fixture: ComponentFixture<UpdateTheaterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateTheaterDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTheaterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
