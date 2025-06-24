package com.example.demo.controlador;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;


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

import com.example.demo.modelo.Administrador;
import com.example.demo.modelo.Alquiler;
import com.example.demo.modelo.Vehiculo;
import com.example.demo.repositorio.RepositorioAdministrador;
import com.example.demo.repositorio.RepositorioAlquiler;
import com.example.demo.repositorio.RepositorioVehiculo;


@RestController
@RequestMapping("/ver/")
@CrossOrigin(origins = "http://localhost:4200/")
public class AdministradorControlador {
	@Autowired
	private RepositorioAdministrador repositorio;
	
	@Autowired
	private RepositorioAlquiler repositorioAlquiler;

	@Autowired
	private RepositorioVehiculo repositorioVehiculo;
	
	@GetMapping("/Administradores")
	public List<Administrador> verAdministradores(){
		return repositorio.findAll();
		
	}
	
	@GetMapping("/BuscarAdministrador")
	public Administrador BuscarAdministrador(@RequestParam Long id) {
		if (repositorio.existsById(id)) {
			return repositorio.findById(id).get();
			} else {
		        System.out.println("Administrador con ID " + id + " no encontrado");
		        return null;
		    }
		}
	
	@PostMapping("/GuardarAdministrador")
	public ResponseEntity<?> GuardarAdministrador(@RequestBody Administrador admin) {
	    if (admin.getUsuario() == null || admin.getUsuario().trim().isEmpty()) {
	        return ResponseEntity.badRequest().body("El campo 'usuario' es obligatorio");
	    }

	    if (admin.getPassword() == null || admin.getPassword().trim().isEmpty()) {
	        return ResponseEntity.badRequest().body("El campo 'password' es obligatorio");
	    }

	    Administrador nuevoAdmin = repositorio.save(admin);
	    return ResponseEntity.ok(nuevoAdmin);
	}
	
	@PostMapping("/EliminarAdministrador")
	public String EliminarAdministrador(@RequestParam Long id) {
	    if (repositorio.existsById(id)) {
	        repositorio.deleteById(id);
	        return "Administrador eliminado exitosamente";
	    } else {
	        return "Administrador no encontrado";
	    }
	}
	
	@PostMapping("/ActualizarAdministrador")
	public ResponseEntity<?> actualizarAdministrador(@RequestBody Administrador admin) {
	    if (admin.getId_admin() == null || !repositorio.existsById(admin.getId_admin())) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Administrador no encontrado");
	    }
	    
	    Administrador adminExistente = repositorio.findById(admin.getId_admin()).get();
	    adminExistente.setUsuario(admin.getUsuario());
	    adminExistente.setPassword(admin.getPassword());
	    
	    return ResponseEntity.ok(repositorio.save(adminExistente));
	}
	
	@PostMapping("/iniciarSesionAdmin")
	 public ResponseEntity<String> login(@RequestBody Map<String, String> datosLogin) {
	     String usuario = datosLogin.get("usuario");
	     String password = datosLogin.get("password");
	     
	     
	     System.out.println("Identificación recibida: " + usuario);
	     System.out.println("Password recibido: " + password);

	     Administrador AdminEncontrado = repositorio.loginAdmin(usuario, password);

	     if (AdminEncontrado != null) {
	         return ResponseEntity.ok("Inicio de sesión exitoso");
	     } else {
	         return ResponseEntity.status(401).body("Usuario o contraseña incorrectos");
	     }
	 }
	
	 @PostMapping("/RegistrarDevolucion")
	    public ResponseEntity<?> registrarDevolucion(@RequestBody Map<String, Object> datos) {
		
	        int numeroAlquiler = (int) datos.get("numeroAlquiler");
	        String fechaRealStr = (String) datos.get("fechaReal");
	        LocalDate fechaReal = LocalDate.parse(fechaRealStr);
	        int cobroAdicional = (int) datos.get("cobroAdicional");
	       
	        		
	        		
	        // Aquí tu lógica para registrar la devolución
	    	if(repositorioAlquiler.existsById(numeroAlquiler)) {
	    		
	    		// Registrar la fecha real de devolución y el cobro adicional 
	    		Alquiler alquiler = repositorioAlquiler.findById(numeroAlquiler).get();
	    		int valorTotalActual = alquiler.getValor_total();
	 	        int nuevoValor_total =  valorTotalActual + cobroAdicional;
	    		alquiler.setFecha_entrega(fechaReal);
	    		alquiler.setValor_total(nuevoValor_total);
	    		alquiler.setEstado("Devuelto");
	   
	    		
	    		repositorioAlquiler.save(alquiler);
	    		
	    		
	    		// Cambiar estado del vehículo a "Disponible"
	            Vehiculo vehiculo = alquiler.getVehiculo();
	            vehiculo.setEstado("Disponible");
	            repositorioVehiculo.save(vehiculo);
	    		return ResponseEntity.ok("Devolución registrada correctamente.");
	    	}
	    	else {
	    		return ResponseEntity.status(HttpStatus.NOT_FOUND)
	    				.body("No se encontro alquiler con numero: " +numeroAlquiler);
	    	}
	        
	    }
	 }
	
		
	
	

