import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonasCrudComponent } from './personas-crud.component';

describe('PersonasCrudComponent', () => {
  let component: PersonasCrudComponent;
  let fixture: ComponentFixture<PersonasCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonasCrudComponent]
    });
    fixture = TestBed.createComponent(PersonasCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
