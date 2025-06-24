package com.example.demo.repositorio;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.modelo.Vehiculo;

public interface RepositorioVehiculo extends JpaRepository<Vehiculo,String> {
	@Query(value = "SELECT placa, color, valor_alquiler as valor_diario, estado FROM vehiculo WHERE tipo = :tipo and estado = 'disponible'", nativeQuery = true )
	List<Map<String, Object>> BuscarVehiculoPorTipo(@Param("tipo") String tipo);
<<<<<<< HEAD

=======
>>>>>>> rama-Samuel
	
	@Query(value = "SELECT tipo FROM vehiculo WHERE placa = :placa", nativeQuery = true)
	String findTipoByPlaca(@Param("placa") String placa);

<<<<<<< HEAD


=======
>>>>>>> rama-Samuel
}
