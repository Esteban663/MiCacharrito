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
            System.out.println("Intentando cancelar alquiler: " + numeroAlquiler);
            
            Optional<Alquiler> alquilerOpt = repositorioAlquiler.findById(numeroAlquiler);
            
            if (!alquilerOpt.isPresent()) {
                System.out.println("Alquiler no encontrado: " + numeroAlquiler);
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Alquiler no encontrado");
            }
            
            Alquiler alquiler = alquilerOpt.get();
            System.out.println("Alquiler encontrado - Estado actual: " + alquiler.getEstado());
            
            // Verificar que el alquiler esté pendiente de entrega
            if (!"pendiente de entrega".equals(alquiler.getEstado())) {
                System.out.println("Estado inválido para cancelación: " + alquiler.getEstado());
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Solo se pueden cancelar alquileres pendientes de entrega");
            }
            
            // Actualizar estado del alquiler a cancelado
            alquiler.setEstado("cancelado");
            repositorioAlquiler.save(alquiler);
            System.out.println("Estado del alquiler actualizado a: cancelado");
            
            // Cambiar estado del vehículo a disponible
            Vehiculo vehiculo = alquiler.getVehiculo();
            if (vehiculo != null) {
                String estadoAnterior = vehiculo.getEstado();
                vehiculo.setEstado("disponible");
                repositorioVehiculo.save(vehiculo);
                System.out.println("Estado del vehículo cambiado de '" + estadoAnterior + "' a 'disponible'");
            } else {
                System.out.println("ADVERTENCIA: No se encontró vehículo asociado al alquiler");
            }
            
            return ResponseEntity.ok("Alquiler cancelado exitosamente");
            
        } catch (Exception e) {
            System.err.println("Error al cancelar alquiler: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al cancelar el alquiler: " + e.getMessage());
        }
    }

    @GetMapping("/AlquileresActivos")
    public ResponseEntity<?> verAlquileresActivos(@RequestParam String identificacion) {
        try {
            System.out.println("Buscando alquileres activos para usuario: " + identificacion);
            
            List<Alquiler> alquileres = repositorioAlquiler.findByUsuarioIdentificacionAndEstado(
                identificacion, "pendiente de entrega");
            
            System.out.println("Alquileres activos encontrados: " + alquileres.size());
            
            return ResponseEntity.ok(alquileres);
            
        } catch (Exception e) {
            System.err.println("Error al obtener alquileres activos: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al obtener alquileres activos: " + e.getMessage());
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
}