import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatriesListComponent } from './patries-list.component';

describe('PatriesListComponent', () => {
  let component: PatriesListComponent;
  let fixture: ComponentFixture<PatriesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatriesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
