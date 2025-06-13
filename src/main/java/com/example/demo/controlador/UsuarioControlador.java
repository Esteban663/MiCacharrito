package com.example.demo.controlador;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.modelo.Usuario;
import com.example.demo.repositorio.RepositorioUsuario;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/ver/")
public class UsuarioControlador {
	@Autowired
	private RepositorioUsuario repositorio;
	
	@GetMapping("/Usuarios")
	public List<Usuario> verUsuarios() {
		return repositorio.findAll();
	}
	
	
	
	@PostMapping("/GuardarUsuario")
	public ResponseEntity<?> GuardarUsuario(@RequestBody Usuario usu) {
		
		if(usu.getNombre_completo() == null || usu.getNombre_completo().trim().isEmpty()) {
			return ResponseEntity.badRequest().body("El campo Nombre_completo es obligatorio");
		}
		 if (usu.getFecha_expedicion_licencia() == null) {
		        return ResponseEntity.badRequest().body("El campo 'fecha_expedicion_licencia' es obligatorio");
		    }
		 if (usu.getCategoria_licencia() == null || usu.getCategoria_licencia().trim().isEmpty()) {
		        return ResponseEntity.badRequest().body("El campo 'categoria_licencia' es obligatorio");
		    }
		 if (usu.getVigencia_licencia() == null) {
		        return ResponseEntity.badRequest().body("El campo 'vigencia_licencia' es obligatorio");
		    }
		 if (usu.getCorreo_electronico() == null || usu.getCorreo_electronico().trim().isEmpty()) {
		        return ResponseEntity.badRequest().body("El campo 'correo_electronico' es obligatorio");
		    }
		 if (usu.getTelefono() == null || usu.getTelefono().trim().isEmpty()) {
		        return ResponseEntity.badRequest().body("El campo 'telefono' es obligatorio");
		    }
		 if (usu.getPassword() == null || usu.getPassword().trim().isEmpty()) {
		        return ResponseEntity.badRequest().body("El campo 'password' es obligatorio");
		    }
		 
		 Usuario NuevoUsuario = repositorio.save(usu);
		 return ResponseEntity.ok(NuevoUsuario);
		   
		
		 }
	 
	 
	 

	
	
	

}
