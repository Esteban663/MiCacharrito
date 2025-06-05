package com.example.demo.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
	public Administrador GuardarAdministrador(@RequestBody Administrador admin) {
		return repositorio.save(admin);
		
	}
	
	
		
	}
	

