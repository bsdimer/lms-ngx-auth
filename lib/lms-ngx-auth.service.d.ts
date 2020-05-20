import { Observable } from 'rxjs';
import { AuthenticationConfig } from './authentication-config';
import { Session } from './session';
import { HttpClient } from '@angular/common/http';
import { UserEntity } from './user-entity';
import { SignUpRequest } from './sign-up-request';
export declare class LmsNgxAuthService {
    config: AuthenticationConfig;
    httpClient: HttpClient;
    private currentUserSubject;
    currentUser: Observable<Session>;
    private tokenName;
    private jwtHelperService;
    constructor(config: AuthenticationConfig, httpClient: HttpClient);
    readonly authenticationChange$: Observable<Session>;
    readonly authenticationChangeSimple$: Observable<boolean>;
    getAuthorizationHeader(): string;
    isAuthenticated(): boolean;
    getSession(): Session;
    login(username: string, password: string): Observable<any>;
    signUp(request: SignUpRequest): Observable<any>;
    logout(): Observable<boolean>;
    prepareHttpClientAuthHeader(): {
        headers: {
            'Authorization': string;
        };
    };
    whoami(): Observable<UserEntity>;
    hasRole(role: string): boolean;
}
