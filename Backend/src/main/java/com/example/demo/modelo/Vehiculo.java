package com.example.demo.modelo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Vehiculo")
public class Vehiculo {
	@Id
	@Column(name = "placa", length = 20, nullable = false)
	private String placa;
	
	@Column(name = "tipo", length = 30, nullable = false )
	private String tipo;
	
	@Column(name = "color", length = 10, nullable = false)
	private String color;
	
	@Column(name = "valor_alquiler", nullable = false)
	private int valor_alquiler;
	
	@Column(name = "estado", length = 50, nullable = false)
	private String estado;

	public Vehiculo(String placa, String tipo, String color, int valor_alquiler, String estado) {
		super();
		this.placa = placa;
		this.tipo = tipo;
		this.color = color;
		this.valor_alquiler = valor_alquiler;
		this.estado = estado;
	}

	public Vehiculo() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getPlaca() {
		return placa;
	}

	public void setPlaca(String placa) {
		this.placa = placa;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public int getValor_alquiler() {
		return valor_alquiler;
	}

	public void setValor_alquiler(int valor_alquiler) {
		this.valor_alquiler = valor_alquiler;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}
	
	
}
