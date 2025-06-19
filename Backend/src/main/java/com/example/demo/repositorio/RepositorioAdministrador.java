package com.example.demo.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.modelo.Administrador;


public interface RepositorioAdministrador extends JpaRepository<Administrador, Long> {
	 @Query(value = "SELECT * FROM administrador WHERE usuario = :usuario AND password = :password", nativeQuery = true)
	  public Administrador loginAdmin(@Param("usuario") String usuario, @Param("password") String password);
}


