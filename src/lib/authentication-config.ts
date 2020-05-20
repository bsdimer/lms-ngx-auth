import { InjectionToken } from '@angular/core';

export const AUTH_CONFIG = new InjectionToken<AuthenticationConfig>('AuthenticationConfig');


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

