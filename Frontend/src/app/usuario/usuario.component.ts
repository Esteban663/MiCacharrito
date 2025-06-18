import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Usuario } from '../entities/usuario';
import { UsuarioService } from '../servicio/usuario.service';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {
  usuario: Usuario[];

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
