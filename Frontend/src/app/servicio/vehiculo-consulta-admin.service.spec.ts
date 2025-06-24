import { TestBed } from '@angular/core/testing';

import { VehiculoConsultaAdminService } from './vehiculo-consulta-admin.service';

describe('VehiculoConsultaAdminService', () => {
  let service: VehiculoConsultaAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehiculoConsultaAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
