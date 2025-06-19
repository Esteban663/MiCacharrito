import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendientesEntregaComponent } from './pendientes-entrega.component';

describe('PendientesEntregaComponent', () => {
  let component: PendientesEntregaComponent;
  let fixture: ComponentFixture<PendientesEntregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendientesEntregaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PendientesEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
