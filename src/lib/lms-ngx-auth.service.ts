import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {AUTH_CONFIG, AuthenticationConfig} from './authentication-config';
import {Session} from './session';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, share} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {UserEntity} from './user-entity';
import {SignUpRequest} from './sign-up-request';


@Injectable({
    providedIn: 'root',
})
export class LmsNgxAuthService {

    private currentUserSubject: BehaviorSubject<Session>;
    public currentUser: Observable<Session>;
    private tokenName: string = '@lms/authToken';
    private jwtHelperService: JwtHelperService;

    constructor(@Inject(AUTH_CONFIG) public config: AuthenticationConfig,
                public httpClient: HttpClient) {
        this.jwtHelperService = new JwtHelperService();
        let session: Session = new Session({});
        if (localStorage.getItem(this.tokenName)) {
            const token = localStorage.getItem(this.tokenName);
            const decodedToken = this.jwtHelperService.decodeToken(JSON.parse(token)['accessToken']);
            session = new Session(decodedToken);
        }
        this.currentUserSubject = new BehaviorSubject<Session>(session);
        this.currentUser = this.currentUserSubject.asObservable();
        this.currentUserSubject.next(session);
    }

    public get authenticationChange$(): Observable<Session> {
        return this.currentUserSubject.asObservable();
    }

    public get authenticationChangeSimple$(): Observable<boolean> {
        return this.currentUserSubject.asObservable().pipe(
            map(() => this.isAuthenticated()),
        );
    }

    public getAuthorizationHeader(): string {
        const token = localStorage.getItem(this.tokenName);
        if (token) {
            const accessToken = JSON.parse(token)['accessToken'];
            return `Bearer ${accessToken}`;
        }
        return '';
    }

    public isAuthenticated(): boolean {
        const token = JSON.parse(localStorage.getItem(this.tokenName));
        return token !== null && token !== undefined && !this.jwtHelperService.isTokenExpired(token.accessToken);
    }

    public getSession(): Session {
        return this.currentUserSubject.value;
    }

    public login(username: string, password: string): Observable<any> {
        localStorage.removeItem(this.tokenName);
        const headers = new HttpHeaders(
            {
                'Authorization': 'Basic ' + btoa(`${this.config.client.name}:${this.config.client.password}`),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        );
        const credentials = {
            username: username,
            password: password,
            grant_type: 'password',
        };

        return this.httpClient.post(this.config.loginUrl, credentials, {headers: headers})
            .pipe(map(token => {
                const decodedToken = this.jwtHelperService.decodeToken(token['accessToken']);
                const session: Session = new Session(decodedToken);
                if (token) {
                    localStorage.setItem(this.tokenName, JSON.stringify(token));
                    this.currentUserSubject.next(session);
                }
                return session;
            }), share());
    }

    public signUp(request: SignUpRequest): Observable<any> {
        return this.httpClient.post(this.config.signUpUrl, request);
    }

    public logout(): Observable<boolean> {
        localStorage.removeItem(this.tokenName);
        this.currentUserSubject.next(null);
        return of(true);
    }

    public prepareHttpClientAuthHeader() {
        return {headers: {'Authorization': this.getAuthorizationHeader()}};
    }

    public whoami(): Observable<UserEntity> {
        return this.httpClient.get<UserEntity>('/user/me', this.prepareHttpClientAuthHeader());
    }

    hasRole(role: string) {
        for (const ra of this.getSession().authorities) {
            if (ra.role === role && ra.client === this.config.client.name) {
                return true;
            }
        }
        return false;
    }
}
