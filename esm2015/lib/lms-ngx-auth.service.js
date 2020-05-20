/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { AUTH_CONFIG } from './authentication-config';
import { Session } from './session';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, share } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as i0 from "@angular/core";
import * as i1 from "./authentication-config";
import * as i2 from "@angular/common/http";
export class LmsNgxAuthService {
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
/** @nocollapse */ LmsNgxAuthService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function LmsNgxAuthService_Factory() { return new LmsNgxAuthService(i0.ɵɵinject(i1.AUTH_CONFIG), i0.ɵɵinject(i2.HttpClient)); }, token: LmsNgxAuthService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG1zLW5neC1hdXRoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sbXMtbmd4LWF1dGgvIiwic291cmNlcyI6WyJsaWIvbG1zLW5neC1hdXRoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBQyxlQUFlLEVBQWMsRUFBRSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3JELE9BQU8sRUFBQyxXQUFXLEVBQXVCLE1BQU0seUJBQXlCLENBQUM7QUFDMUUsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUNsQyxPQUFPLEVBQUMsVUFBVSxFQUFFLFdBQVcsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQzdELE9BQU8sRUFBQyxHQUFHLEVBQUUsS0FBSyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7Ozs7QUFRcEQsTUFBTSxPQUFPLGlCQUFpQjs7Ozs7SUFPMUIsWUFBd0MsTUFBNEIsRUFDakQsVUFBc0I7UUFERCxXQUFNLEdBQU4sTUFBTSxDQUFzQjtRQUNqRCxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBSmpDLGNBQVMsR0FBVyxnQkFBZ0IsQ0FBQztRQUt6QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDOztZQUMzQyxPQUFPLEdBQVksSUFBSSxPQUFPLENBQUMsRUFBRSxDQUFDO1FBQ3RDLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7O2tCQUNoQyxLQUFLLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDOztrQkFDNUMsWUFBWSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FB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QixNQUFNLFNBQUMsV0FBVztZQWpCM0IsVUFBVTs7Ozs7Ozs7SUFZZCwrQ0FBcUQ7O0lBQ3JELHdDQUF3Qzs7Ozs7SUFDeEMsc0NBQTZDOzs7OztJQUM3Qyw2Q0FBMkM7O0lBRS9CLG1DQUF3RDs7SUFDeEQsdUNBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIG9mfSBmcm9tICdyeGpzJztcbmltcG9ydCB7QVVUSF9DT05GSUcsIEF1dGhlbnRpY2F0aW9uQ29uZmlnfSBmcm9tICcuL2F1dGhlbnRpY2F0aW9uLWNvbmZpZyc7XG5pbXBvcnQge1Nlc3Npb259IGZyb20gJy4vc2Vzc2lvbic7XG5pbXBvcnQge0h0dHBDbGllbnQsIEh0dHBIZWFkZXJzfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge21hcCwgc2hhcmV9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7Snd0SGVscGVyU2VydmljZX0gZnJvbSAnQGF1dGgwL2FuZ3VsYXItand0JztcbmltcG9ydCB7VXNlckVudGl0eX0gZnJvbSAnLi91c2VyLWVudGl0eSc7XG5pbXBvcnQge1NpZ25VcFJlcXVlc3R9IGZyb20gJy4vc2lnbi11cC1yZXF1ZXN0JztcblxuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBMbXNOZ3hBdXRoU2VydmljZSB7XG5cbiAgICBwcml2YXRlIGN1cnJlbnRVc2VyU3ViamVjdDogQmVoYXZpb3JTdWJqZWN0PFNlc3Npb24+O1xuICAgIHB1YmxpYyBjdXJyZW50VXNlcjogT2JzZXJ2YWJsZTxTZXNzaW9uPjtcbiAgICBwcml2YXRlIHRva2VuTmFtZTogc3RyaW5nID0gJ0BsbXMvYXV0aFRva2VuJztcbiAgICBwcml2YXRlIGp3dEhlbHBlclNlcnZpY2U6IEp3dEhlbHBlclNlcnZpY2U7XG5cbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KEFVVEhfQ09ORklHKSBwdWJsaWMgY29uZmlnOiBBdXRoZW50aWNhdGlvbkNvbmZpZyxcbiAgICAgICAgICAgICAgICBwdWJsaWMgaHR0cENsaWVudDogSHR0cENsaWVudCkge1xuICAgICAgICB0aGlzLmp3dEhlbHBlclNlcnZpY2UgPSBuZXcgSnd0SGVscGVyU2VydmljZSgpO1xuICAgICAgICBsZXQgc2Vzc2lvbjogU2Vzc2lvbiA9IG5ldyBTZXNzaW9uKHt9KTtcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMudG9rZW5OYW1lKSkge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLnRva2VuTmFtZSk7XG4gICAgICAgICAgICBjb25zdCBkZWNvZGVkVG9rZW4gPSB0aGlzLmp3dEhlbHBlclNlcnZpY2UuZGVjb2RlVG9rZW4oSlNPTi5wYXJzZSh0b2tlbilbJ2FjY2Vzc1Rva2VuJ10pO1xuICAgICAgICAgICAgc2Vzc2lvbiA9IG5ldyBTZXNzaW9uKGRlY29kZWRUb2tlbik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdXJyZW50VXNlclN1YmplY3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFNlc3Npb24+KHNlc3Npb24pO1xuICAgICAgICB0aGlzLmN1cnJlbnRVc2VyID0gdGhpcy5jdXJyZW50VXNlclN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG4gICAgICAgIHRoaXMuY3VycmVudFVzZXJTdWJqZWN0Lm5leHQoc2Vzc2lvbik7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBhdXRoZW50aWNhdGlvbkNoYW5nZSQoKTogT2JzZXJ2YWJsZTxTZXNzaW9uPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRVc2VyU3ViamVjdC5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGF1dGhlbnRpY2F0aW9uQ2hhbmdlU2ltcGxlJCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFVzZXJTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKCkgPT4gdGhpcy5pc0F1dGhlbnRpY2F0ZWQoKSksXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEF1dGhvcml6YXRpb25IZWFkZXIoKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLnRva2VuTmFtZSk7XG4gICAgICAgIGlmICh0b2tlbikge1xuICAgICAgICAgICAgY29uc3QgYWNjZXNzVG9rZW4gPSBKU09OLnBhcnNlKHRva2VuKVsnYWNjZXNzVG9rZW4nXTtcbiAgICAgICAgICAgIHJldHVybiBgQmVhcmVyICR7YWNjZXNzVG9rZW59YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgcHVibGljIGlzQXV0aGVudGljYXRlZCgpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgdG9rZW4gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMudG9rZW5OYW1lKSk7XG4gICAgICAgIHJldHVybiB0b2tlbiAhPT0gbnVsbCAmJiB0b2tlbiAhPT0gdW5kZWZpbmVkICYmICF0aGlzLmp3dEhlbHBlclNlcnZpY2UuaXNUb2tlbkV4cGlyZWQodG9rZW4uYWNjZXNzVG9rZW4pO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRTZXNzaW9uKCk6IFNlc3Npb24ge1xuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50VXNlclN1YmplY3QudmFsdWU7XG4gICAgfVxuXG4gICAgcHVibGljIGxvZ2luKHVzZXJuYW1lOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSh0aGlzLnRva2VuTmFtZSk7XG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiAnQmFzaWMgJyArIGJ0b2EoYCR7dGhpcy5jb25maWcuY2xpZW50Lm5hbWV9OiR7dGhpcy5jb25maWcuY2xpZW50LnBhc3N3b3JkfWApLFxuICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGNyZWRlbnRpYWxzID0ge1xuICAgICAgICAgICAgdXNlcm5hbWU6IHVzZXJuYW1lLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkLFxuICAgICAgICAgICAgZ3JhbnRfdHlwZTogJ3Bhc3N3b3JkJyxcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwQ2xpZW50LnBvc3QodGhpcy5jb25maWcubG9naW5VcmwsIGNyZWRlbnRpYWxzLCB7aGVhZGVyczogaGVhZGVyc30pXG4gICAgICAgICAgICAucGlwZShtYXAodG9rZW4gPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRlY29kZWRUb2tlbiA9IHRoaXMuand0SGVscGVyU2VydmljZS5kZWNvZGVUb2tlbih0b2tlblsnYWNjZXNzVG9rZW4nXSk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2Vzc2lvbjogU2Vzc2lvbiA9IG5ldyBTZXNzaW9uKGRlY29kZWRUb2tlbik7XG4gICAgICAgICAgICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMudG9rZW5OYW1lLCBKU09OLnN0cmluZ2lmeSh0b2tlbikpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRVc2VyU3ViamVjdC5uZXh0KHNlc3Npb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gc2Vzc2lvbjtcbiAgICAgICAgICAgIH0pLCBzaGFyZSgpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2lnblVwKHJlcXVlc3Q6IFNpZ25VcFJlcXVlc3QpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwQ2xpZW50LnBvc3QodGhpcy5jb25maWcuc2lnblVwVXJsLCByZXF1ZXN0KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbG9nb3V0KCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSh0aGlzLnRva2VuTmFtZSk7XG4gICAgICAgIHRoaXMuY3VycmVudFVzZXJTdWJqZWN0Lm5leHQobnVsbCk7XG4gICAgICAgIHJldHVybiBvZih0cnVlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcHJlcGFyZUh0dHBDbGllbnRBdXRoSGVhZGVyKCkge1xuICAgICAgICByZXR1cm4ge2hlYWRlcnM6IHsnQXV0aG9yaXphdGlvbic6IHRoaXMuZ2V0QXV0aG9yaXphdGlvbkhlYWRlcigpfX07XG4gICAgfVxuXG4gICAgcHVibGljIHdob2FtaSgpOiBPYnNlcnZhYmxlPFVzZXJFbnRpdHk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudC5nZXQ8VXNlckVudGl0eT4oJy91c2VyL21lJywgdGhpcy5wcmVwYXJlSHR0cENsaWVudEF1dGhIZWFkZXIoKSk7XG4gICAgfVxuXG4gICAgaGFzUm9sZShyb2xlOiBzdHJpbmcpIHtcbiAgICAgICAgZm9yIChjb25zdCByYSBvZiB0aGlzLmdldFNlc3Npb24oKS5hdXRob3JpdGllcykge1xuICAgICAgICAgICAgaWYgKHJhLnJvbGUgPT09IHJvbGUgJiYgcmEuY2xpZW50ID09PSB0aGlzLmNvbmZpZy5jbGllbnQubmFtZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG4iXX0=