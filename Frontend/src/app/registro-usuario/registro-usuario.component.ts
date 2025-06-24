import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../entities/usuario';
import { UsuarioService } from '../servicio/usuario.service';

@Component({
  selector: 'app-registro-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registro-usuario.component.html',
  styleUrl: './registro-usuario.component.css'
})
export class RegistroUsuarioComponent {
  mostrarFormulario2 = true;
  registroForm: FormGroup;
  errorMsg: string | null = null;
  usuario: Usuario;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
    identificacion: ['', Validators.required],
    nombre_completo: ['', Validators.required],
    fecha_expedicion_licencia: ['', Validators.required],
    categoria_licencia: ['', Validators.required],
    vigencia_licencia: ['', Validators.required],
    correo_electronico: ['', [Validators.required, Validators.email]],
    telefono: ['', Validators.required],
    password: ['', Validators.required],
    confirmar_contraseña: ['', Validators.required]
    });
  }

  irAUsuario() {
    this.router.navigate(['/login-usuario']);
    this.mostrarFormulario2 = false;
  }

  irAAdministrador() {
    this.router.navigate(['/login-admin']);
    this.mostrarFormulario2 = false;
  }

  irLoginUsuario() {
    this.router.navigate(['/login-usuario']);
    this.mostrarFormulario2 = false;
  }

  onSubmit() {
    if (this.registroForm.invalid) {
      this.errorMsg = 'Por favor, completa todos los campos correctamente.';
      return;
    }
    if (this.registroForm.value.password !== this.registroForm.value.confirmar_contraseña) {
      this.errorMsg = 'Las contraseñas no coinciden.';
      return;
    }
    this.errorMsg = null;
    // Lógica para enviar el formulario
    console.log('Formulario enviado:', this.registroForm.value);
    this.usuario = this.registroForm.value as Usuario;
    // Aquí puedes llamar al servicio para registrar el usuario
    this.usuarioService.registrarUsuario(this.usuario).subscribe({
      next: (resp) => {
        alert('Usuario registrado exitosamente');
        this.router.navigate(['/login-usuario']);
      },
      error: (err) => {
        this.errorMsg = 'Error al registrar el usuario. Inténtalo de nuevo.';
      }
    });
  }
}