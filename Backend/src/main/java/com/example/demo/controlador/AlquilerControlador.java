package com.example.demo.controlador;

import java.util.List;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.modelo.Alquiler;
import com.example.demo.modelo.Vehiculo;
import com.example.demo.repositorio.RepositorioAlquiler;
import com.example.demo.repositorio.RepositorioVehiculo;

@RestController
@CrossOrigin(origins = "http://localhost:4200") 
@RequestMapping("/ver/")
public class AlquilerControlador {
    
    @Autowired
    private RepositorioAlquiler repositorioAlquiler;
    
    @Autowired
    private RepositorioVehiculo repositorioVehiculo;
    
    @GetMapping("/Alquileres")
    public List<Alquiler> verAlquileres() {
        return repositorioAlquiler.findAll();
    }
    
    @GetMapping("/AlquileresUsuario")
    public List<Alquiler> verAlquileresUsuario(@RequestParam String identificacion) {
        return repositorioAlquiler.findByUsuarioIdentificacion(identificacion);
    }
    
    @GetMapping("/AlquileresActivos")
    public List<Alquiler> verAlquileresActivos(@RequestParam String identificacion) {
        return repositorioAlquiler.findByUsuarioIdentificacionAndEstado(identificacion, "pendiente de entrega");
    }
    
    @PostMapping("/GuardarAlquiler")
    public ResponseEntity<?> guardarAlquiler(@RequestBody Alquiler alquiler) {
        try {
            Alquiler nuevoAlquiler = repositorioAlquiler.save(alquiler);
            return ResponseEntity.ok(nuevoAlquiler);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al guardar el alquiler: " + e.getMessage());
        }
    }
    
    @PostMapping("/CancelarAlquiler")
    public ResponseEntity<?> cancelarAlquiler(@RequestParam int numeroAlquiler) {
        try {
            Optional<Alquiler> alquilerOpt = repositorioAlquiler.findById(numeroAlquiler);
            
            if (!alquilerOpt.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Alquiler no encontrado");
            }
            
            Alquiler alquiler = alquilerOpt.get();
            
            // Verificar que el alquiler esté pendiente de entrega
            if (!"pendiente de entrega".equals(alquiler.getEstado())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Solo se pueden cancelar alquileres pendientes de entrega");
            }
            
            // Actualizar estado del alquiler a cancelado
            alquiler.setEstado("cancelado");
            repositorioAlquiler.save(alquiler);
            
            // Cambiar estado del vehículo a disponible
            Vehiculo vehiculo = alquiler.getVehiculo();
            if (vehiculo != null) {
                vehiculo.setEstado("disponible");
                repositorioVehiculo.save(vehiculo);
            }
            
            return ResponseEntity.ok("Alquiler cancelado exitosamente");
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al cancelar el alquiler: " + e.getMessage());
        }
    }
    
    @GetMapping("/BuscarAlquiler")
    public ResponseEntity<?> buscarAlquiler(@RequestParam int numeroAlquiler) {
        Optional<Alquiler> alquiler = repositorioAlquiler.findById(numeroAlquiler);
        
        if (alquiler.isPresent()) {
            return ResponseEntity.ok(alquiler.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Alquiler no encontrado");
        }
    }
    
    @GetMapping("/AlquileresPendientesEntrega")
    public List<Alquiler> verAlquileresPendientesEntrega() {
        return repositorioAlquiler.findByEstado("pendiente de entrega");
    }

    @GetMapping("/AlquileresPendientesEntregaPorTipo")
    public List<Alquiler> verAlquileresPendientesEntregaPorTipo(@RequestParam String tipoVehiculo) {
        return repositorioAlquiler.findByEstadoAndVehiculoTipo("pendiente de entrega", tipoVehiculo);
    }
    
    
    @GetMapping("/BuscarAlquilerPorVehiculo")
    public List<Alquiler> verBuscarAlquilerVehiculo(@RequestParam String placa){
    	return repositorioAlquiler.findByVehiculoPlaca(placa);
    }
    
   
}