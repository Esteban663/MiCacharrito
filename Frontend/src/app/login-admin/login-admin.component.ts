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
        // Si el login es exitoso, redirige
        alert('Login exitoso');
        this.router.navigate(['/admin-control']);
        this.mostrarFormulario = false; // Oculta el formulario después del login exitoso
      },
      error: (err) => {
        this.errorMsg = 'Usuario o contraseña incorrectos Admin';
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
