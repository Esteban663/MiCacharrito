
import { Component, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { LoginUsuarioService } from '../servicio/login-usuario.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../servicio/auth.service';





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
  mostrarFormulario = true;
  cargando = false;

  // Inyecta el identificador de plataforma en el constructor
    constructor(
    private fb: FormBuilder,
    private authService: LoginUsuarioService, 
    private authStateService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      identificacion: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
   

    // Cuando quieras ocultar el formulario, pon:
  onSubmit() {
    console.log('submit');
    console.log(this.loginForm.value);
    if (this.loginForm.invalid) {
      this.errorMsg = 'Por favor completa todos los campos';
      return;
    } 

    const { identificacion, password } = this.loginForm.value;
      this.cargando = true;
      this.errorMsg = '';

    // Llama al servicio de autenticación para hacer login
    this.authService.login(identificacion, password).subscribe({
      next: (resp) => {
        // Si el login es exitoso, redirige
        alert('Login exitoso');
        this.router.navigate(['/lista-vehiculos']);
        this.mostrarFormulario = false; // Oculta el formulario después del login exitoso
        this.cargando = false;
        
        // Pequeña pausa para que el AuthService procese los datos del usuario
        setTimeout(() => {
          this.router.navigate(['/lista-vehiculos']);
        }, 500);
      },
      error: (err) => {
        this.errorMsg = 'Usuario o contraseña incorrectos';
         this.cargando = false;
        console.error('Error en login:', err);
      }
    });
  }


irAAdministrador() {
  this.router.navigate(['/login-admin']);
  this.mostrarFormulario = false;
}
}
