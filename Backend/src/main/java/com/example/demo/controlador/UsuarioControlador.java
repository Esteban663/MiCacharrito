package com.example.demo.controlador;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.modelo.Usuario;
import com.example.demo.repositorio.RepositorioUsuario;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/ver/")
@CrossOrigin(origins = "http://localhost:4200/")
public class UsuarioControlador {
	@Autowired
	private RepositorioUsuario repositorio;
	
	@GetMapping("/Usuarios")
	public List<Usuario> verUsuarios() {
		return repositorio.findAll();
	}
	
	@GetMapping("/BuscarUsuario")
	public Usuario BuscarUsuario(@RequestParam String id_usu) {
		if(repositorio.existsById(id_usu)) {
			return repositorio.findById(id_usu).get();
		}
		else {
			 System.out.println("Usuario con ID " + id_usu + " no encontrado");
		     return null;
		}
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
	 @PostMapping("/EliminarUsuario")
	 public String EliminarUsuario(@RequestParam String id_usu) {
		 if(repositorio.existsById(id_usu)) {
			repositorio.deleteById(id_usu);
			return "Eliminado Exitosamente";
		 }
		 else {
			 return "No se encontro el usuario a eliminar";
		 }
		 
	}
	 
	 @PostMapping("/ActualizarUsuario")
	 public ResponseEntity<?> ActualizarUsuario(@RequestBody Usuario usuarioActualizado) {

	     // Validar ID de usuario
	     if (usuarioActualizado.getIdentificacion() == null || usuarioActualizado.getIdentificacion().trim().isEmpty()) {
	         return ResponseEntity.badRequest().body("El campo 'id_usuario' es obligatorio para actualizar.");
	     }

	     // Verificar si el usuario existe
	     if (!repositorio.existsById(usuarioActualizado.getIdentificacion())) {
	         return ResponseEntity.status(HttpStatus.NOT_FOUND)
	                 .body("Usuario no encontrado con ID: " + usuarioActualizado.getIdentificacion());
	     }

	     // Validar nombre completo
	     if (usuarioActualizado.getNombre_completo() == null || usuarioActualizado.getNombre_completo().trim().isEmpty()) {
	         return ResponseEntity.badRequest().body("El campo 'nombre_completo' es obligatorio");
	     }

	     // Validar fecha de expedición de licencia
	     if (usuarioActualizado.getFecha_expedicion_licencia() == null) {
	         return ResponseEntity.badRequest().body("El campo 'fecha_expedicion_licencia' es obligatorio");
	     }

	     // Validar categoría de licencia
	     if (usuarioActualizado.getCategoria_licencia() == null || usuarioActualizado.getCategoria_licencia().trim().isEmpty()) {
	         return ResponseEntity.badRequest().body("El campo 'categoria_licencia' es obligatorio");
	     }

	     // Validar vigencia de la licencia
	     if (usuarioActualizado.getVigencia_licencia() == null) {
	         return ResponseEntity.badRequest().body("El campo 'vigencia_licencia' es obligatorio");
	     }

	     // Validar correo electrónico
	     if (usuarioActualizado.getCorreo_electronico() == null || usuarioActualizado.getCorreo_electronico().trim().isEmpty()) {
	         return ResponseEntity.badRequest().body("El campo 'correo_electronico' es obligatorio");
	     }

	     // Validar teléfono
	     if (usuarioActualizado.getTelefono() == null || usuarioActualizado.getTelefono().trim().isEmpty()) {
	         return ResponseEntity.badRequest().body("El campo 'telefono' es obligatorio");
	     }

	     // Validar contraseña
	     if (usuarioActualizado.getPassword() == null || usuarioActualizado.getPassword().trim().isEmpty()) {
	         return ResponseEntity.badRequest().body("El campo 'password' es obligatorio");
	     }

	     // Guardar los cambios
	     Usuario usuarioGuardado = repositorio.save(usuarioActualizado);
	     return ResponseEntity.ok(usuarioGuardado);
	 }
	 
	 
	 /*INICIAR SESION
	 @PostMapping("/iniciarSesion")
	    public ResponseEntity<String> login(@RequestParam String identificacion, @RequestParam String contra) {
	        Usuario usuario = repositorio.login(identificacion, contra);

	        if (usuario != null) {
	            return ResponseEntity.ok("Inicio de sesión exitoso");
	        } else {
	            return ResponseEntity.status(401).body("Identificación o contraseña incorrectos");
	        }
	    }
	    */
	 
	 @PostMapping("/iniciarSesion")
	 public ResponseEntity<String> login(@RequestBody Map<String, String> datosLogin) {
	     String identificacion = datosLogin.get("identificacion");
	     String password = datosLogin.get("password");
	     
	     
	     System.out.println("Identificación recibida: " + identificacion);
	     System.out.println("Password recibido: " + password);

	     Usuario usuarioEncontrado = repositorio.login(identificacion, password);

	     if (usuarioEncontrado != null) {
	         return ResponseEntity.ok("Inicio de sesión exitoso");
	     } else {
	         return ResponseEntity.status(401).body("Usuario o contraseña incorrectos");
	     }
	 }
}
	


