import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  isAuthenticated : boolean = false;
  email : any ;
  accessToken!: string;
  userId!: number;
  firstName!: string;
  lastName!: string;


  constructor(private http:HttpClient){
    this.loadUserFromLocalStorage();
  }
  public login(email : string , password : string){
    let options =  {
      headers : new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")
    }
    //les paramètres envoyés dans la requête
    let params = new HttpParams()
    .set("email",email).set("password",password)
    //le header 
    return this.http.post("http://localhost:8080/auth/login",params,options)
  }

  loadProfile(data : any){
    this.isAuthenticated = true;
    this.accessToken = data['access-token'];
    console.log("Loaded Access Token: ", this.accessToken);
    let decodedJwt:any = jwtDecode(this.accessToken);

    this.email = decodedJwt.sub;
    this.userId = decodedJwt.userId; 
    this.firstName = decodedJwt.firstName; 
    this.lastName = decodedJwt.lastName;
    this.saveUserToLocalStorage();
    localStorage.setItem("angular17token", this.accessToken);
  

  }

  getUserDetails() {
    return {
      userId: this.userId,
      firstName: this.firstName,
      lastName: this.lastName
    };
  }


  saveUserToLocalStorage() {
    localStorage.setItem('userDetails', JSON.stringify({
      email: this.email,
      userId: this.userId,
      firstName: this.firstName,
      lastName: this.lastName
    }));
  }

  loadUserFromLocalStorage() {
    const userDetails = localStorage.getItem('userDetails');
    if (userDetails) {
      const { email, userId, firstName, lastName } = JSON.parse(userDetails);
      this.email = email;
      this.userId = userId;
      this.firstName = firstName;
      this.lastName = lastName;
      this.isAuthenticated = true;
    }
  }


}
