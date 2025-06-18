package com.example.demo.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.modelo.Usuario;

public interface RepositorioUsuario extends JpaRepository<Usuario, String> {

	 @Query(value = "SELECT * FROM usuario WHERE identificacion = :identificacion AND password = :password", nativeQuery = true)
	  public Usuario login(@Param("identificacion") String identificacion, @Param("password") String password);
}
