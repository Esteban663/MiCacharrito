
import { Component, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { LoginUsuarioService } from '../servicio/login-usuario.service';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-login-usuario',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login-usuario.component.html',
  styleUrl: './login-usuario.component.css'
})
export class LoginUsuarioComponent {
  loginForm: FormGroup;
  errorMsg: string = '';

  // Inyecta el identificador de plataforma en el constructor
    constructor(
    private fb: FormBuilder,
    private authService: LoginUsuarioService, // Asegúrate de que este servicio esté correctamente importado
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      identificacion: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
   
  mostrarFormulario = true;

    // Cuando quieras ocultar el formulario, pon:
  onSubmit() {
    console.log('submit');
    console.log(this.loginForm.value);
    if (this.loginForm.invalid) return;

    const { identificacion, password } = this.loginForm.value;
    this.authService.login(identificacion, password).subscribe({
      next: (resp) => {
        // Si el login es exitoso, redirige
        alert('Login exitoso');
        this.router.navigate(['/lista-vehiculos']);
        this.mostrarFormulario = false; // Oculta el formulario después del login exitoso
      },
      error: (err) => {
        this.errorMsg = 'Usuario o contraseña incorrectos';
      }
    });
  }

  irAUsuario() {
  
}

irAAdministrador() {
  this.router.navigate(['/login-admin']);
  this.mostrarFormulario = false;
}


/*
abrirLoginUsuario() {
    const modal = document.getElementById('login');
    if (modal !== null) {
      modal.style.display = 'block';
    }
  }
  cerrarLoginUsuario() {
  const modal = document.getElementById('login');
  
  if (modal !== null) {
    // 1. Eliminar el foco del elemento actualmente enfocado
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    // 2. Ocultar el modal y marcarlo como inaccesible para lectores de pantalla
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
  }
}

  */
}
