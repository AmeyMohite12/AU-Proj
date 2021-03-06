import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { GoogleLoginService } from "../shared/google-login.service";
@Injectable({
  providedIn: "root",
})
export class GetRequestService {
  constructor(
    private router: Router,
    private http: HttpClient,
    private googlelogin: GoogleLoginService
  ) {}
  data: any;

  checkEmail(form: any) {
    this.http
      .get("http://localhost:8080/person/get/" + form.username)
      .subscribe((res) => {
        if (res != null) {
          this.data = res;
          console.log(this.data.password);
          console.log(form.password);
          if (this.data.password == form.password) {
            console.log("it is correct");
            this.googlelogin.loggedIn = true;
            this.googlelogin.currentUser = this.data.username;
            this.googlelogin.currentUserName = this.data.firstName;
            this.googlelogin.superUser = true;
            this.router.navigate(["Welcome"]);
          } else {
            this.router.navigate([""]);
          }
        }
      });
  }

  getData() {
    return this.http.get("http://localhost:8080/course/get");
  }
}
