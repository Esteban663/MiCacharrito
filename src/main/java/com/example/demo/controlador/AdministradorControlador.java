package com.example.demo.controlador;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.modelo.Administrador;

import com.example.demo.repositorio.RepositorioAdministrador;


@RestController
@RequestMapping("/ver/")
public class AdministradorControlador {
	@Autowired
	private RepositorioAdministrador repositorio;
	
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
	
		
	}
	

