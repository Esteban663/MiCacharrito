package com.example.demo.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.modelo.Administrador;

public interface RepositorioAdministrador extends JpaRepository<Administrador, Long> {

}
