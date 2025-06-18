package com.example.demo.modelo;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Alquiler")
public class Alquiler {
	@Id
	@Column(name = "numero_alquiler", length = 20, nullable = false)
	private int numero_alquiler;
	
	@ManyToOne()
	@JoinColumn (name = "identificacion", referencedColumnName = "identificacion")
	private Usuario usuario;
	
	@ManyToOne()
	@JoinColumn (name = "placa", referencedColumnName = "placa")
	private Vehiculo vehiculo;
	
	
	@Column(name = "fecha_inicio", nullable = false)
	private LocalDate fecha_inicio;
	
	@Column(name = "fecha_entrega", nullable = false)
	private LocalDate fecha_entrega;
	
	@Column(name = "valor_total", nullable = false)
	private int valor_total;
	
	@Column(name = "estado", length = 50,nullable = false)
	private String estado;

	public Alquiler(int numero_alquiler, Usuario usuario, Vehiculo vehiculo, LocalDate fecha_inicio,
			LocalDate fecha_entrega, int valor_total, String estado) {
		super();
		this.numero_alquiler = numero_alquiler;
		this.usuario = usuario;
		this.vehiculo = vehiculo;
		this.fecha_inicio = fecha_inicio;
		this.fecha_entrega = fecha_entrega;
		this.valor_total = valor_total;
		this.estado = estado;
	}

	public Alquiler() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getNumero_alquiler() {
		return numero_alquiler;
	}

	public void setNumero_alquiler(int numero_alquiler) {
		this.numero_alquiler = numero_alquiler;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public Vehiculo getVehiculo() {
		return vehiculo;
	}

	public void setVehiculo(Vehiculo vehiculo) {
		this.vehiculo = vehiculo;
	}

	public LocalDate getFecha_inicio() {
		return fecha_inicio;
	}

	public void setFecha_inicio(LocalDate fecha_inicio) {
		this.fecha_inicio = fecha_inicio;
	}

	public LocalDate getFecha_entrega() {
		return fecha_entrega;
	}

	public void setFecha_entrega(LocalDate fecha_entrega) {
		this.fecha_entrega = fecha_entrega;
	}

	public int getValor_total() {
		return valor_total;
	}

	public void setValor_total(int valor_total) {
		this.valor_total = valor_total;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}
	
	


}