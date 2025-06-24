import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarVehiculoAdminComponent } from './consultar-vehiculo-admin.component';

describe('ConsultarVehiculoAdminComponent', () => {
  let component: ConsultarVehiculoAdminComponent;
  let fixture: ComponentFixture<ConsultarVehiculoAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarVehiculoAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultarVehiculoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
