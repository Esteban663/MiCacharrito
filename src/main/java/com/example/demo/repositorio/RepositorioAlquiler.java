package com.example.demo.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.modelo.Alquiler;

@Repository
public interface RepositorioAlquiler extends JpaRepository<Alquiler,Integer> {

}
