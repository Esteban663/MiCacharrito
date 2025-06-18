package com.example.demo.modelo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "ManejoAlquiler")
public class ManejoAlquiler {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long id_manejo;
	
	
	@ManyToOne()
	@JoinColumn (name = "id_admin", referencedColumnName = "id_admin")
	private Administrador administrador;
	
	@ManyToOne()
	@JoinColumn (name = "numero_alquiler", referencedColumnName = "numero_alquiler")
	private Alquiler alquiler;
	
	@Column(name = "observaciones", length = 100, nullable = false)
	private String observaciones;

	public ManejoAlquiler(Long id_manejo, Administrador administrador, Alquiler alquiler, String observaciones) {
		super();
		this.id_manejo = id_manejo;
		this.administrador = administrador;
		this.alquiler = alquiler;
		this.observaciones = observaciones;
	}

	public ManejoAlquiler() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	

}
