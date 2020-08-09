import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router';
import { ListenService } from '../../services/listen/listen.service';


@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {

    isVisitorUser = JSON.parse(localStorage.getItem("isVisitorUser"));

    constructor(private router: Router, private listenService: ListenService) {
    }

    canActivate() {
        if (!this.isVisitorUser) {
            if (localStorage.length > 0) {
                return true;
            }
        } else {
            if (this.validateHashVisitador()) {
                if (localStorage.length > 0) {
                    return true;
                }
            }
        }

        this.router.navigate(['login']);
    }

    readyToRequest() {
        this.listenService.readyToRequest().subscribe((response: any) => {
        },
            error => {
                console.log(JSON.stringify(error));
            });
    }


    validateHashVisitador() {
        let currentHash = window.location.hash;
        let result: Boolean = false;

        if (currentHash == '#/login' ||
            currentHash == '#/register' ||
            currentHash == '#/portada' ||
            currentHash == '#/my-files') {
            result = true;
        }

        return result;
    }


}
