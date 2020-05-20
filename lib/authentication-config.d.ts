import { InjectionToken } from '@angular/core';
export declare const AUTH_CONFIG: InjectionToken<AuthenticationConfig>;
export interface ClientConfig {
    name: string;
    password: string;
}
export interface AuthenticationConfig {
    client: ClientConfig;
    loginUrl: string;
    signUpUrl: string;
    userInfoUrl: string;
}
