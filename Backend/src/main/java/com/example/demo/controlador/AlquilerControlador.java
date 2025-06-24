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
    
    // Guardar un nuevo alquiler
    @PostMapping("/GuardarAlquiler")
    public ResponseEntity<?> guardarAlquiler(@RequestBody Alquiler alquiler) {
        try {
<<<<<<< HEAD
            // Validaciones básicas
            if (alquiler.getUsuario() == null) {
                return ResponseEntity.badRequest().body("El usuario es obligatorio");
            }
            if (alquiler.getVehiculo() == null) {
                return ResponseEntity.badRequest().body("El vehículo es obligatorio");
            }
            if (alquiler.getFecha_inicio() == null) {
                return ResponseEntity.badRequest().body("La fecha de inicio es obligatoria");
            }
            if (alquiler.getFecha_entrega() == null) {
                return ResponseEntity.badRequest().body("La fecha de entrega es obligatoria");
=======
            Alquiler nuevoAlquiler = repositorioAlquiler.save(alquiler);
            return ResponseEntity.ok(nuevoAlquiler);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al guardar el alquiler: " + e.getMessage());
        }
    }
    
    
    
    @PostMapping("/actualizarAlquiler")
    public ResponseEntity<Alquiler> actualizarAlquiler(@RequestBody Alquiler alquiler) {
        if (!repositorioAlquiler.existsById(alquiler.getNumero_alquiler())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // o HttpStatus.BAD_REQUEST
        }

        Alquiler actualizado = repositorioAlquiler.save(alquiler);
        return ResponseEntity.ok(actualizado);
    }

    
    
    
    @PostMapping("/CancelarAlquiler")
    public ResponseEntity<?> cancelarAlquiler(@RequestParam int numeroAlquiler) {
        try {
            System.out.println("Intentando cancelar alquiler: " + numeroAlquiler);
            
            Optional<Alquiler> alquilerOpt = repositorioAlquiler.findById(numeroAlquiler);
            
            if (!alquilerOpt.isPresent()) {
                System.out.println("Alquiler no encontrado: " + numeroAlquiler);
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Alquiler no encontrado");
>>>>>>> rama-Samuel
            }
            
            // Establecer estado por defecto
            if (alquiler.getEstado() == null || alquiler.getEstado().trim().isEmpty()) {
                alquiler.setEstado("pendiente de entrega");
            }
            
            Alquiler nuevoAlquiler = repositorioAlquiler.save(alquiler);
            return ResponseEntity.ok(nuevoAlquiler);
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error al guardar el alquiler: " + e.getMessage());
        }
    }

    
   
    // Obtener alquileres activos (pendientes de entrega) de un usuario
    @GetMapping("AlquileresActivos")
    public List<Alquiler> obtenerAlquileresActivos(@RequestParam String identificacion) {
        return repositorioAlquiler.findByUsuarioIdentificacionAndEstado(identificacion, "pendiente de entrega");
    }
    
    
    

    // Cancelar un alquiler
    @PostMapping("/CancelarAlquiler")
    public ResponseEntity<String> cancelarAlquiler(@RequestParam int numeroAlquiler) {
        try {
            // Buscar el alquiler
            Alquiler alquiler = repositorioAlquiler.findByNumeroAlquiler(numeroAlquiler);
            
            if (alquiler == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Alquiler no encontrado");
            }
            
            // Verificar que esté pendiente de entrega
            if (!"pendiente de entrega".equals(alquiler.getEstado())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Solo se pueden cancelar alquileres pendientes de entrega");
            }
            
            // Actualizar estado del alquiler a cancelado
            alquiler.setEstado("cancelado");
            repositorioAlquiler.save(alquiler);
            
            // Actualizar estado del vehículo a disponible
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


   
    @GetMapping("/BuscarAlquilerPorVehiculo")
    public List<Alquiler> verBuscarAlquilerVehiculo(@RequestParam String placa){
    	return repositorioAlquiler.findByVehiculoPlaca(placa);
    }
    
   
}