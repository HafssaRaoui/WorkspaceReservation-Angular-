import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  constructor(private router: Router, private authService:AuthService) {}

  onLogin(event: Event) {
    event.preventDefault();
    this.handleLogin()
  }


  handleLogin(){

    
  
    this.authService.login(this.email, this.password).subscribe({
      next: data => {
        this.authService.loadProfile(data);
        console.log("Login Response Data: ", data);
    
        localStorage.setItem("angular17token",this.authService.accessToken);
        
         
         this.router.navigate(['/plateau']);
        
        
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

}
