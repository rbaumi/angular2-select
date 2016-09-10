import { Injectable }                   from '@angular/core';
import { Router }                       from '@angular/router';
import { Http }                         from '@angular/http';
import { AuthHttp, JwtHelper }          from 'angular2-jwt';
import { Observable }                   from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ContentHeaders }               from '../headers';
import { AuthentificateResponse }       from '../interfaces/api-response.interface';

@Injectable()
export class AuthService {
    private publicRoutes: Array<string> = [];
    private jwtHelper: JwtHelper = new JwtHelper();

    constructor(private authHttp: AuthHttp, private http: Http, private router: Router) { }

    public authentificate(email, password): Observable<AuthentificateResponse> {
        let body = JSON.stringify({ email: email, password: password.hashCode() });
        return this.http.post('/api/auth/login', body, { headers: ContentHeaders })
            .map(result => result.json());
    }

    public setJWT(token: string): void {
        localStorage.setItem('jwt', token);
        this.router.navigate(['/']);
    }
    public getJWT(): string {
        return localStorage.getItem('jwt');
    }
    public getAuthorizationHeader(): string {
        return 'Bearer ' + this.getJWT();
    }

    public logout(): Observable<boolean> {
        let router: Router = this.router;
        let token: string = localStorage.getItem('jwt');
        let body: Object = {};

        // when modifying the jwt token it can throw an exception of malformed URI
        try { body['jwt'] = token; } catch (err) {}

        localStorage.removeItem('jwt');
        return this.http.post('/api/auth/logout', JSON.stringify(body), { headers: ContentHeaders })
            .map(result => {
                router.navigate(['/auth']);
                return false;
            });
    }

    public canAccess(checkOnLoginPage : boolean): Observable<boolean> | boolean {
        let token: string = localStorage.getItem('jwt');
        let router: Router = this.router;
        let obs;

        // when modifying the jwt token it can throw an exception of malformed URI
        try {
            if (!token || this.jwtHelper.isTokenExpired(token))
                throw new Error();

            obs = this.authHttp.get('/api/auth')
                .map(result => result.json())
                .map(resultJson => (resultJson && resultJson.success));

        } catch (err) {
            // seems like token is invalid
            if (checkOnLoginPage)
                return true;

            obs = Observable.of(false);
        }

        return obs
            .map(success => {
                // if we check on normal page than we redirect to login only
                // when no success (user has to login)
                if (!checkOnLoginPage) {
                    if (!success)
                        router.navigate(['/auth']);

                    return success;

                // if we check on login page we redirect to home only
                // when success (no need to login)
                } else {
                    if (success)
                        router.navigate(['/']);

                    return !success;
                }
            });
    }

}
