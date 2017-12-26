import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from '../service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private authService : AuthService,
    private router : Router){

    }

    canActivate(){
        if(this.authService.loggedIn()){
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}