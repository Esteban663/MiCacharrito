package com.example.demo.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.modelo.Alquiler;

@Repository
public interface RepositorioAlquiler extends JpaRepository<Alquiler,Integer> {
    
    // Buscar alquileres por identificación del usuario
    @Query("SELECT a FROM Alquiler a WHERE a.usuario.identificacion = :identificacion")
    List<Alquiler> findByUsuarioIdentificacion(@Param("identificacion") String identificacion);
    
    // Buscar alquileres por identificación del usuario y estado
    @Query("SELECT a FROM Alquiler a WHERE a.usuario.identificacion = :identificacion AND a.estado = :estado")
    List<Alquiler> findByUsuarioIdentificacionAndEstado(@Param("identificacion") String identificacion, @Param("estado") String estado);
    
    // Buscar alquileres por estado
    @Query("SELECT a FROM Alquiler a WHERE a.estado = :estado")
    List<Alquiler> findByEstado(@Param("estado") String estado);
    
    // Buscar alquileres por placa del vehículo
    @Query("SELECT a FROM Alquiler a WHERE a.vehiculo.placa = :placa")
    List<Alquiler> findByVehiculoPlaca(@Param("placa") String placa);
    

    // Buscar alquileres por estado y tipo de vehículo
    @Query("SELECT a FROM Alquiler a WHERE a.estado = :estado AND a.vehiculo.tipo = :tipoVehiculo")
    List<Alquiler> findByEstadoAndVehiculoTipo(@Param("estado") String estado, @Param("tipoVehiculo") String tipoVehiculo);

    // Nota: El método findByEstado ya existe en tu código, así 
    //que no necesitas agregarlo de nuevo
}
