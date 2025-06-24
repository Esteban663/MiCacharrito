import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Usuario } from '../entities/usuario';
import { UsuarioService } from '../servicio/usuario.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {
  searchId: string;

  usuariosFiltrados: any[] = [];

  usuario: Usuario[];

  searchUsuarios() {
    if (this.searchId) {
      this.usuariosFiltrados = this.usuario.filter(
        
        u => u.identificacion.toString().includes(this.searchId));
        alert("Filtrando usuarios por ID: " + this.searchId);
    } else {
      this.usuariosFiltrados = [...this.usuario];
      alert("Mostrando todos los usuarios");
    }
  }

  ngOnInit(): void {
    this.verUsuarios();
   
  }
  constructor(private usuarioService: UsuarioService) {
    this.usuario = [];
  }
  private verUsuarios(){
       this.usuarioService.obtenerListaUsuarios().subscribe(
        (dato: Usuario[]) => {
      this.usuario = dato;
    });
  }
  


}
