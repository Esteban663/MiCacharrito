package com.example.demo.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.modelo.Vehiculo;
import com.example.demo.repositorio.RepositorioVehiculo;

@RestController
@RequestMapping("/ver/")
public class VehiculoControlador {
	@Autowired
	private RepositorioVehiculo repositorio;
	
	@GetMapping("/Vehiculos")
	public List<Vehiculo> verVehiculos() {
		return this.repositorio.findAll();
	}
	
	@GetMapping("/BuscarVehiculo")
	public Vehiculo BuscarVehiculo(@RequestParam String id_veh) {
		if(repositorio.existsById(id_veh)) {
			return repositorio.findById(id_veh).get();
		}
		else {
			System.out.println("Vehiculo con ID " + id_veh + " no encontrado");
		    return null;
		}
	}
	
	@PostMapping("/GuardarVehiculo")
	public Vehiculo GuardarVehiculo(@RequestBody Vehiculo vehiculo) {
		return repositorio.save(vehiculo);
	}
	
	@PostMapping("/EliminarVehiculo")
	public String EliminarVehiculo(@RequestParam String id_veh) {
		if(repositorio.existsById(id_veh)) {
			repositorio.deleteById(id_veh);
			return "Eliminado Exitosamente";
		}
		else {
			System.out.println("Vehiculo con ID " + id_veh + " no encontrado");
		    return null;
		}
	}
	
	

}
