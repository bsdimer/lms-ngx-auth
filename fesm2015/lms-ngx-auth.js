import { InjectionToken, Injectable, Inject, ɵɵdefineInjectable, ɵɵinject, NgModule } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map, share } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const AUTH_CONFIG = new InjectionToken('AuthenticationConfig');
/**
 * @record
 */
function ClientConfig() { }
if (false) {
    /** @type {?} */
    ClientConfig.prototype.name;
    /** @type {?} */
    ClientConfig.prototype.password;
}
/**
 * @record
 */
function AuthenticationConfig() { }
if (false) {
    /** @type {?} */
    AuthenticationConfig.prototype.client;
    /** @type {?} */
    AuthenticationConfig.prototype.loginUrl;
    /** @type {?} */
    AuthenticationConfig.prototype.signUpUrl;
    /** @type {?} */
    AuthenticationConfig.prototype.userInfoUrl;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Session {
    /**
     * @param {?} token
     */
    constructor(token) {
        this.authorities = [];
        this.email = token['email'];
        this.emailVerified = token['email_verified'];
        this.expiresAt = token['exp'];
        this.givenName = token['given_name'];
        this.familyName = token['family_name'];
        this.phone = token['phone_number'];
        this.picture = token['picture'];
        this.scope = token['scope'];
        this.id = token['sub'];
        this.authorities = token['roles'];
    }
}
if (false) {
    /** @type {?} */
    Session.prototype.id;
    /** @type {?} */
    Session.prototype.username;
    /** @type {?} */
    Session.prototype.expiresAt;
    /** @type {?} */
    Session.prototype.givenName;
    /** @type {?} */
    Session.prototype.familyName;
    /** @type {?} */
    Session.prototype.phone;
    /** @type {?} */
    Session.prototype.picture;
    /** @type {?} */
    Session.prototype.scope;
    /** @type {?} */
    Session.prototype.email;
    /** @type {?} */
    Session.prototype.emailVerified;
    /** @type {?} */
    Session.prototype.authorities;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LmsNgxAuthService {
    /**
     * @param {?} config
     * @param {?} httpClient
     */
    constructor(config, httpClient) {
        this.config = config;
        this.httpClient = httpClient;
        this.tokenName = '@lms/authToken';
        this.jwtHelperService = new JwtHelperService();
        /** @type {?} */
        let session = new Session({});
        if (localStorage.getItem(this.tokenName)) {
            /** @type {?} */
            const token = localStorage.getItem(this.tokenName);
            /** @type {?} */
            const decodedToken = this.jwtHelperService.decodeToken(JSON.parse(token)['accessToken']);
            session = new Session(decodedToken);
        }
        this.currentUserSubject = new BehaviorSubject(session);
        this.currentUser = this.currentUserSubject.asObservable();
        this.currentUserSubject.next(session);
    }
    /**
     * @return {?}
     */
    get authenticationChange$() {
        return this.currentUserSubject.asObservable();
    }
    /**
     * @return {?}
     */
    get authenticationChangeSimple$() {
        return this.currentUserSubject.asObservable().pipe(map((/**
         * @return {?}
         */
        () => this.isAuthenticated())));
    }
    /**
     * @return {?}
     */
    getAuthorizationHeader() {
        /** @type {?} */
        const token = localStorage.getItem(this.tokenName);
        if (token) {
            /** @type {?} */
            const accessToken = JSON.parse(token)['accessToken'];
            return `Bearer ${accessToken}`;
        }
        return '';
    }
    /**
     * @return {?}
     */
    isAuthenticated() {
        /** @type {?} */
        const token = JSON.parse(localStorage.getItem(this.tokenName));
        return token !== null && token !== undefined && !this.jwtHelperService.isTokenExpired(token.accessToken);
    }
    /**
     * @return {?}
     */
    getSession() {
        return this.currentUserSubject.value;
    }
    /**
     * @param {?} username
     * @param {?} password
     * @return {?}
     */
    login(username, password) {
        localStorage.removeItem(this.tokenName);
        /** @type {?} */
        const headers = new HttpHeaders({
            'Authorization': 'Basic ' + btoa(`${this.config.client.name}:${this.config.client.password}`),
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        });
        /** @type {?} */
        const credentials = {
            username: username,
            password: password,
            grant_type: 'password',
        };
        return this.httpClient.post(this.config.loginUrl, credentials, { headers: headers })
            .pipe(map((/**
         * @param {?} token
         * @return {?}
         */
        token => {
            /** @type {?} */
            const decodedToken = this.jwtHelperService.decodeToken(token['accessToken']);
            /** @type {?} */
            const session = new Session(decodedToken);
            if (token) {
                localStorage.setItem(this.tokenName, JSON.stringify(token));
                this.currentUserSubject.next(session);
            }
            return session;
        })), share());
    }
    /**
     * @param {?} request
     * @return {?}
     */
    signUp(request) {
        return this.httpClient.post(this.config.signUpUrl, request);
    }
    /**
     * @return {?}
     */
    logout() {
        localStorage.removeItem(this.tokenName);
        this.currentUserSubject.next(null);
        return of(true);
    }
    /**
     * @return {?}
     */
    prepareHttpClientAuthHeader() {
        return { headers: { 'Authorization': this.getAuthorizationHeader() } };
    }
    /**
     * @return {?}
     */
    whoami() {
        return this.httpClient.get('/user/me', this.prepareHttpClientAuthHeader());
    }
    /**
     * @param {?} role
     * @return {?}
     */
    hasRole(role) {
        for (const ra of this.getSession().authorities) {
            if (ra.role === role && ra.client === this.config.client.name) {
                return true;
            }
        }
        return false;
    }
}
LmsNgxAuthService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
/** @nocollapse */
LmsNgxAuthService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [AUTH_CONFIG,] }] },
    { type: HttpClient }
];
/** @nocollapse */ LmsNgxAuthService.ngInjectableDef = ɵɵdefineInjectable({ factory: function LmsNgxAuthService_Factory() { return new LmsNgxAuthService(ɵɵinject(AUTH_CONFIG), ɵɵinject(HttpClient)); }, token: LmsNgxAuthService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    LmsNgxAuthService.prototype.currentUserSubject;
    /** @type {?} */
    LmsNgxAuthService.prototype.currentUser;
    /**
     * @type {?}
     * @private
     */
    LmsNgxAuthService.prototype.tokenName;
    /**
     * @type {?}
     * @private
     */
    LmsNgxAuthService.prototype.jwtHelperService;
    /** @type {?} */
    LmsNgxAuthService.prototype.config;
    /** @type {?} */
    LmsNgxAuthService.prototype.httpClient;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LmsNgxAuthModule {
    /*constructor(@Optional() @SkipSelf() parentModule: LmsNgxAuthModule) {
            throw new Error(`LmsNgxAuthModule has already been loaded. Import LmsNgxAuthModule modules in the AppModule only.`);
        }*/
    /**
     * @param {?} config
     * @return {?}
     */
    static forRoot(config) {
        return (/** @type {?} */ ({
            ngModule: LmsNgxAuthModule,
            providers: [
                LmsNgxAuthService,
                {
                    provide: AUTH_CONFIG,
                    useValue: config,
                },
            ],
        }));
    }
}
LmsNgxAuthModule.decorators = [
    { type: NgModule }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class UserEntityProperty {
}
if (false) {
    /** @type {?} */
    UserEntityProperty.prototype.id;
    /** @type {?} */
    UserEntityProperty.prototype.key;
    /** @type {?} */
    UserEntityProperty.prototype.value;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SignUpRequest {
    constructor() {
        this.properties = {};
    }
}
if (false) {
    /** @type {?} */
    SignUpRequest.prototype.firstName;
    /** @type {?} */
    SignUpRequest.prototype.lastName;
    /** @type {?} */
    SignUpRequest.prototype.email;
    /** @type {?} */
    SignUpRequest.prototype.phone;
    /** @type {?} */
    SignUpRequest.prototype.username;
    /** @type {?} */
    SignUpRequest.prototype.password;
    /** @type {?} */
    SignUpRequest.prototype.properties;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class UserEntity {
}
if (false) {
    /** @type {?} */
    UserEntity.prototype.authorities;
    /** @type {?} */
    UserEntity.prototype.email;
    /** @type {?} */
    UserEntity.prototype.emailVerified;
    /** @type {?} */
    UserEntity.prototype.enabled;
    /** @type {?} */
    UserEntity.prototype.firstName;
    /** @type {?} */
    UserEntity.prototype.password;
    /** @type {?} */
    UserEntity.prototype.id;
    /** @type {?} */
    UserEntity.prototype.imageUrl;
    /** @type {?} */
    UserEntity.prototype.lastName;
    /** @type {?} */
    UserEntity.prototype.phone;
    /** @type {?} */
    UserEntity.prototype.properties;
    /** @type {?} */
    UserEntity.prototype.provider;
    /** @type {?} */
    UserEntity.prototype.providerId;
    /** @type {?} */
    UserEntity.prototype.username;
    /** @type {?} */
    UserEntity.prototype.acknowledged;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class RoleEntity {
}
if (false) {
    /** @type {?} */
    RoleEntity.prototype.id;
    /** @type {?} */
    RoleEntity.prototype.authority;
    /** @type {?} */
    RoleEntity.prototype.client;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { AUTH_CONFIG, LmsNgxAuthModule, LmsNgxAuthService, RoleEntity, Session, SignUpRequest, UserEntity, UserEntityProperty };
//# sourceMappingURL=lms-ngx-auth.js.map
