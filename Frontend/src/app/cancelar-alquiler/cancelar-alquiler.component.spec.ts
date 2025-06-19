import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelarAlquilerComponent } from './cancelar-alquiler.component';

describe('CancelarAlquilerComponent', () => {
  let component: CancelarAlquilerComponent;
  let fixture: ComponentFixture<CancelarAlquilerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelarAlquilerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CancelarAlquilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
