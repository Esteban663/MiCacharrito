
package com.example.demo.modelo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "administrador")
public class Administrador {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long id_admin;
	
	@Column(name="usuario", length = 30, nullable = false)
	private String usuario;
	
	@Column(name="password", length = 40, nullable = false)
	private String password;

	public Administrador(String usuario, String password) {
		super();
		this.usuario = usuario;
		this.password = password;
	}

	public Administrador() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getId_admin() {
		return id_admin;
	}

	public void setId_admin(Long id_admin) {
		this.id_admin = id_admin;
	}

	public String getUsuario() {
		return usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	
	
}
