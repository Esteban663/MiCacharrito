package com.example.demo.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.modelo.Alquiler;

public interface RepositorioAlquiler extends JpaRepository<Alquiler, Integer> {
    
    // Buscar alquileres por identificación del usuario
    @Query("SELECT a FROM Alquiler a WHERE a.usuario.identificacion = :identificacion")
    List<Alquiler> findByUsuarioIdentificacion(@Param("identificacion") String identificacion);
    
    // Buscar alquileres activos (por estado) de un usuario específico
    @Query("SELECT a FROM Alquiler a WHERE a.usuario.identificacion = :identificacion AND a.estado = :estado")
    List<Alquiler> findByUsuarioIdentificacionAndEstado(@Param("identificacion") String identificacion, @Param("estado") String estado);
    
    // Buscar alquiler por número de alquiler
    @Query("SELECT a FROM Alquiler a WHERE a.numero_alquiler = :numeroAlquiler")
    Alquiler findByNumeroAlquiler(@Param("numeroAlquiler") int numeroAlquiler);
    
    // Buscar alquileres por estado
    @Query("SELECT a FROM Alquiler a WHERE a.estado = :estado")
    List<Alquiler> findByEstado(@Param("estado") String estado);
    
    // Buscar alquileres por placa del vehículo
    @Query("SELECT a FROM Alquiler a WHERE a.vehiculo.placa = :placa")
    List<Alquiler> findByVehiculoPlaca(@Param("placa") String placa);
}