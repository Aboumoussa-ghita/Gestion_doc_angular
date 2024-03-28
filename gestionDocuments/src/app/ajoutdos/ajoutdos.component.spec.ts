import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutdosComponent } from './ajoutdos.component';

describe('AjoutdosComponent', () => {
  let component: AjoutdosComponent;
  let fixture: ComponentFixture<AjoutdosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjoutdosComponent]
    });
    fixture = TestBed.createComponent(AjoutdosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
