import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheMapComponent } from './the-map.component';

describe('TheMapComponent', () => {
  let component: TheMapComponent;
  let fixture: ComponentFixture<TheMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
