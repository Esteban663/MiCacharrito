package com.example.demo.modelo;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "usuario")
public class Usuario {
	@Id
	@Column(name="identificacion", length = 15, nullable = false)
	private String identificacion;
	
	@Column(name="nombre_completo", length = 30, nullable = false)
	private String nombre_completo;
	
	@Column(name="fecha_expedicion_licencia", nullable = false)
	private Date fecha_expedicion_licencia;
	
	@Column(name="categoria_licencia", length = 4, nullable = false)
	private String categoria_licencia;
	
	@Column(name="vigencia_licencia",nullable = false)
	private Date vigencia_licencia;
	
	@Column(name="correo_electronico", length = 50, nullable = false, unique = true)
	private String correo_electronico;
	
	@Column(name="telefono", length = 10, nullable = false)
	private String telefono;
	
	@Column(name="password", length = 40, nullable = false)
	private String password;
	
	

	public Usuario() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Usuario(String identificacion, String nombre_completo, Date fecha_expedicion_licencia,
			String categoria_licencia, Date vigencia_licencia, String correo_electronico, String telefono,
			String password) {
		super();
		this.identificacion = identificacion;
		this.nombre_completo = nombre_completo;
		this.fecha_expedicion_licencia = fecha_expedicion_licencia;
		this.categoria_licencia = categoria_licencia;
		this.vigencia_licencia = vigencia_licencia;
		this.correo_electronico = correo_electronico;
		this.telefono = telefono;
		this.password = password;
	}

	public String getIdentificacion() {
		return identificacion;
	}

	public void setIdentificacion(String identificacion) {
		this.identificacion = identificacion;
	}

	public String getNombre_completo() {
		return nombre_completo;
	}

	public void setNombre_completo(String nombre_completo) {
		this.nombre_completo = nombre_completo;
	}

	public Date getFecha_expedicion_licencia() {
		return fecha_expedicion_licencia;
	}

	public void setFecha_expedicion_licencia(Date fecha_expedicion_licencia) {
		this.fecha_expedicion_licencia = fecha_expedicion_licencia;
	}

	public String getCategoria_licencia() {
		return categoria_licencia;
	}

	public void setCategoria_licencia(String categoria_licencia) {
		this.categoria_licencia = categoria_licencia;
	}

	public Date getVigencia_licencia() {
		return vigencia_licencia;
	}

	public void setVigencia_licencia(Date vigencia_licencia) {
		this.vigencia_licencia = vigencia_licencia;
	}

	public String getCorreo_electronico() {
		return correo_electronico;
	}

	public void setCorreo_electronico(String correo_electronico) {
		this.correo_electronico = correo_electronico;
	}

	public String getTelefono() {
		return telefono;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
	
	

	