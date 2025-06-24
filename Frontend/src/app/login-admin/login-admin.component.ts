import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { LoginAdminService } from '../servicio/login-admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})
export class LoginAdminComponent {

  loginForm: FormGroup;
  errorMsg: string = '';
  loginExitoso: boolean = false;

  // Inyecta el identificador de plataforma en el constructor
  constructor(
    private fb: FormBuilder,
    private authService: LoginAdminService, // Asegúrate de que este servicio esté correctamente importado
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  mostrarFormulario = true;
  onSubmit() {
    console.log(this.loginForm.value);
    if (this.loginForm.invalid) return;

    const { usuario, password } = this.loginForm.value;
    this.authService.loginAdmin(usuario, password).subscribe({
      next: (resp) => {
        this.loginExitoso = true;
        setTimeout(() => {
          this.loginExitoso = false;
          this.router.navigate(['/admin-control']);
          this.mostrarFormulario = false;
        }, 1500); // Muestra el mensaje 1.5 segundos antes de redirigir
      },
      error: (err) => {
        this.errorMsg = 'Usuario o contraseña incorrectos Admin';

        setTimeout(() => {
          this.errorMsg = '';
        }, 3000);
      }
    });
  }

  irAUsuario() {
    this.router.navigate(['/login-usuario']);
    this.mostrarFormulario = false;
  }

  irAAdministrador() {

  }

}
