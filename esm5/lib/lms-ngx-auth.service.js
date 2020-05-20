/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var LmsNgxAuthService = /** @class */ (function () {
    function LmsNgxAuthService(config, httpClient) {
        this.config = config;
        this.httpClient = httpClient;
        this.tokenName = '@lms/authToken';
        this.jwtHelperService = new JwtHelperService();
        /** @type {?} */
        var session = new Session({});
        if (localStorage.getItem(this.tokenName)) {
            /** @type {?} */
            var token = localStorage.getItem(this.tokenName);
            /** @type {?} */
            var decodedToken = this.jwtHelperService.decodeToken(JSON.parse(token)['accessToken']);
            session = new Session(decodedToken);
        }
        this.currentUserSubject = new BehaviorSubject(session);
        this.currentUser = this.currentUserSubject.asObservable();
        this.currentUserSubject.next(session);
    }
    Object.defineProperty(LmsNgxAuthService.prototype, "authenticationChange$", {
        get: /**
         * @return {?}
         */
        function () {
            return this.currentUserSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LmsNgxAuthService.prototype, "authenticationChangeSimple$", {
        get: /**
         * @return {?}
         */
        function () {
            var _this = this;
            return this.currentUserSubject.asObservable().pipe(map((/**
             * @return {?}
             */
            function () { return _this.isAuthenticated(); })));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    LmsNgxAuthService.prototype.getAuthorizationHeader = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var token = localStorage.getItem(this.tokenName);
        if (token) {
            /** @type {?} */
            var accessToken = JSON.parse(token)['accessToken'];
            return "Bearer " + accessToken;
        }
        return '';
    };
    /**
     * @return {?}
     */
    LmsNgxAuthService.prototype.isAuthenticated = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var token = JSON.parse(localStorage.getItem(this.tokenName));
        return token !== null && token !== undefined && !this.jwtHelperService.isTokenExpired(token.accessToken);
    };
    /**
     * @return {?}
     */
    LmsNgxAuthService.prototype.getSession = /**
     * @return {?}
     */
    function () {
        return this.currentUserSubject.value;
    };
    /**
     * @param {?} username
     * @param {?} password
     * @return {?}
     */
    LmsNgxAuthService.prototype.login = /**
     * @param {?} username
     * @param {?} password
     * @return {?}
     */
    function (username, password) {
        var _this = this;
        localStorage.removeItem(this.tokenName);
        /** @type {?} */
        var headers = new HttpHeaders({
            'Authorization': 'Basic ' + btoa(this.config.client.name + ":" + this.config.client.password),
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        });
        /** @type {?} */
        var credentials = {
            username: username,
            password: password,
            grant_type: 'password',
        };
        return this.httpClient.post(this.config.loginUrl, credentials, { headers: headers })
            .pipe(map((/**
         * @param {?} token
         * @return {?}
         */
        function (token) {
            /** @type {?} */
            var decodedToken = _this.jwtHelperService.decodeToken(token['accessToken']);
            /** @type {?} */
            var session = new Session(decodedToken);
            if (token) {
                localStorage.setItem(_this.tokenName, JSON.stringify(token));
                _this.currentUserSubject.next(session);
            }
            return session;
        })), share());
    };
    /**
     * @param {?} request
     * @return {?}
     */
    LmsNgxAuthService.prototype.signUp = /**
     * @param {?} request
     * @return {?}
     */
    function (request) {
        return this.httpClient.post(this.config.signUpUrl, request);
    };
    /**
     * @return {?}
     */
    LmsNgxAuthService.prototype.logout = /**
     * @return {?}
     */
    function () {
        localStorage.removeItem(this.tokenName);
        this.currentUserSubject.next(null);
        return of(true);
    };
    /**
     * @return {?}
     */
    LmsNgxAuthService.prototype.prepareHttpClientAuthHeader = /**
     * @return {?}
     */
    function () {
        return { headers: { 'Authorization': this.getAuthorizationHeader() } };
    };
    /**
     * @return {?}
     */
    LmsNgxAuthService.prototype.whoami = /**
     * @return {?}
     */
    function () {
        return this.httpClient.get('/user/me', this.prepareHttpClientAuthHeader());
    };
    /**
     * @param {?} role
     * @return {?}
     */
    LmsNgxAuthService.prototype.hasRole = /**
     * @param {?} role
     * @return {?}
     */
    function (role) {
        var e_1, _a;
        try {
            for (var _b = tslib_1.__values(this.getSession().authorities), _c = _b.next(); !_c.done; _c = _b.next()) {
                var ra = _c.value;
                if (ra.role === role && ra.client === this.config.client.name) {
                    return true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return false;
    };
    LmsNgxAuthService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    /** @nocollapse */
    LmsNgxAuthService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [AUTH_CONFIG,] }] },
        { type: HttpClient }
    ]; };
    /** @nocollapse */ LmsNgxAuthService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function LmsNgxAuthService_Factory() { return new LmsNgxAuthService(i0.ɵɵinject(i1.AUTH_CONFIG), i0.ɵɵinject(i2.HttpClient)); }, token: LmsNgxAuthService, providedIn: "root" });
    return LmsNgxAuthService;
}());
export { LmsNgxAuthService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG1zLW5neC1hdXRoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sbXMtbmd4LWF1dGgvIiwic291cmNlcyI6WyJsaWIvbG1zLW5neC1hdXRoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUMsZUFBZSxFQUFjLEVBQUUsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNyRCxPQUFPLEVBQUMsV0FBVyxFQUF1QixNQUFNLHlCQUF5QixDQUFDO0FBQzFFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDbEMsT0FBTyxFQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUM3RCxPQUFPLEVBQUMsR0FBRyxFQUFFLEtBQUssRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDOzs7O0FBS3BEO0lBVUksMkJBQXdDLE1BQTRCLEVBQ2pELFVBQXNCO1FBREQsV0FBTSxHQUFOLE1BQU0sQ0FBc0I7UUFDakQsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUpqQyxjQUFTLEdBQVcsZ0JBQWdCLENBQUM7UUFLekMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQzs7WUFDM0MsT0FBTyxHQUFZLElBQUksT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUN0QyxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFOztnQkFDaEMsS0FBSyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQzs7Z0JBQzVDLFlBQVksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDeEYsT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3ZDO1FBQ0QsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksZUFBZSxDQUFVLE9BQU8sQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzFELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELHNCQUFXLG9EQUFxQjs7OztRQUFoQztZQUNJLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ2xELENBQUM7OztPQUFBO0lBRUQsc0JBQVcsMERBQTJCOzs7O1FBQXRDO1lBQUEsaUJBSUM7WUFIRyxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQzlDLEdBQUc7OztZQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsZUFBZSxFQUFFLEVBQXRCLENBQXNCLEVBQUMsQ0FDcEMsQ0FBQztRQUNOLENBQUM7OztPQUFBOzs7O0lBRU0sa0RBQXNCOzs7SUFBN0I7O1lBQ1UsS0FBSyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNsRCxJQUFJLEtBQUssRUFBRTs7Z0JBQ0QsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsYUFBYSxDQUFDO1lBQ3BELE9BQU8sWUFBVSxXQUFhLENBQUM7U0FDbEM7UUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Ozs7SUFFTSwyQ0FBZTs7O0lBQXRCOztZQUNVLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzlELE9BQU8sS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDN0csQ0FBQzs7OztJQUVNLHNDQUFVOzs7SUFBakI7UUFDSSxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUM7SUFDekMsQ0FBQzs7Ozs7O0lBRU0saUNBQUs7Ozs7O0lBQVosVUFBYSxRQUFnQixFQUFFLFFBQWdCO1FBQS9DLGlCQXlCQztRQXhCRyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzs7WUFDbEMsT0FBTyxHQUFHLElBQUksV0FBVyxDQUMzQjtZQUNJLGVBQWUsRUFBRSxRQUFRLEdBQUcsSUFBSSxDQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksU0FBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFVLENBQUM7WUFDN0YsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixjQUFjLEVBQUUsa0JBQWtCO1NBQ3JDLENBQ0o7O1lBQ0ssV0FBVyxHQUFHO1lBQ2hCLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFVBQVUsRUFBRSxVQUFVO1NBQ3pCO1FBRUQsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDLENBQUM7YUFDN0UsSUFBSSxDQUFDLEdBQUc7Ozs7UUFBQyxVQUFBLEtBQUs7O2dCQUNMLFlBQVksR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQzs7Z0JBQ3RFLE9BQU8sR0FBWSxJQUFJLE9BQU8sQ0FBQyxZQUFZLENBQUM7WUFDbEQsSUFBSSxLQUFLLEVBQUU7Z0JBQ1AsWUFBWSxDQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDNUQsS0FBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUN6QztZQUNELE9BQU8sT0FBTyxDQUFDO1FBQ25CLENBQUMsRUFBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDckIsQ0FBQzs7Ozs7SUFFTSxrQ0FBTTs7OztJQUFiLFVBQWMsT0FBc0I7UUFDaEMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNoRSxDQUFDOzs7O0lBRU0sa0NBQU07OztJQUFiO1FBQ0ksWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQixDQUFDOzs7O0lBRU0sdURBQTJCOzs7SUFBbEM7UUFDSSxPQUFPLEVBQUMsT0FBTyxFQUFFLEVBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxFQUFDLEVBQUMsQ0FBQztJQUN2RSxDQUFDOzs7O0lBRU0sa0NBQU07OztJQUFiO1FBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBYSxVQUFVLEVBQUUsSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUMsQ0FBQztJQUMzRixDQUFDOzs7OztJQUVELG1DQUFPOzs7O0lBQVAsVUFBUSxJQUFZOzs7WUFDaEIsS0FBaUIsSUFBQSxLQUFBLGlCQUFBLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxXQUFXLENBQUEsZ0JBQUEsNEJBQUU7Z0JBQTNDLElBQU0sRUFBRSxXQUFBO2dCQUNULElBQUksRUFBRSxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksRUFBRSxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7b0JBQzNELE9BQU8sSUFBSSxDQUFDO2lCQUNmO2FBQ0o7Ozs7Ozs7OztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7O2dCQXhHSixVQUFVLFNBQUM7b0JBQ1IsVUFBVSxFQUFFLE1BQU07aUJBQ3JCOzs7O2dEQVFnQixNQUFNLFNBQUMsV0FBVztnQkFqQjNCLFVBQVU7Ozs0QkFKbEI7Q0FvSEMsQUF6R0QsSUF5R0M7U0F0R1ksaUJBQWlCOzs7Ozs7SUFFMUIsK0NBQXFEOztJQUNyRCx3Q0FBd0M7Ozs7O0lBQ3hDLHNDQUE2Qzs7Ozs7SUFDN0MsNkNBQTJDOztJQUUvQixtQ0FBd0Q7O0lBQ3hELHVDQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBvZn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge0FVVEhfQ09ORklHLCBBdXRoZW50aWNhdGlvbkNvbmZpZ30gZnJvbSAnLi9hdXRoZW50aWNhdGlvbi1jb25maWcnO1xuaW1wb3J0IHtTZXNzaW9ufSBmcm9tICcuL3Nlc3Npb24nO1xuaW1wb3J0IHtIdHRwQ2xpZW50LCBIdHRwSGVhZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHttYXAsIHNoYXJlfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge0p3dEhlbHBlclNlcnZpY2V9IGZyb20gJ0BhdXRoMC9hbmd1bGFyLWp3dCc7XG5pbXBvcnQge1VzZXJFbnRpdHl9IGZyb20gJy4vdXNlci1lbnRpdHknO1xuaW1wb3J0IHtTaWduVXBSZXF1ZXN0fSBmcm9tICcuL3NpZ24tdXAtcmVxdWVzdCc7XG5cblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgTG1zTmd4QXV0aFNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBjdXJyZW50VXNlclN1YmplY3Q6IEJlaGF2aW9yU3ViamVjdDxTZXNzaW9uPjtcbiAgICBwdWJsaWMgY3VycmVudFVzZXI6IE9ic2VydmFibGU8U2Vzc2lvbj47XG4gICAgcHJpdmF0ZSB0b2tlbk5hbWU6IHN0cmluZyA9ICdAbG1zL2F1dGhUb2tlbic7XG4gICAgcHJpdmF0ZSBqd3RIZWxwZXJTZXJ2aWNlOiBKd3RIZWxwZXJTZXJ2aWNlO1xuXG4gICAgY29uc3RydWN0b3IoQEluamVjdChBVVRIX0NPTkZJRykgcHVibGljIGNvbmZpZzogQXV0aGVudGljYXRpb25Db25maWcsXG4gICAgICAgICAgICAgICAgcHVibGljIGh0dHBDbGllbnQ6IEh0dHBDbGllbnQpIHtcbiAgICAgICAgdGhpcy5qd3RIZWxwZXJTZXJ2aWNlID0gbmV3IEp3dEhlbHBlclNlcnZpY2UoKTtcbiAgICAgICAgbGV0IHNlc3Npb246IFNlc3Npb24gPSBuZXcgU2Vzc2lvbih7fSk7XG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLnRva2VuTmFtZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy50b2tlbk5hbWUpO1xuICAgICAgICAgICAgY29uc3QgZGVjb2RlZFRva2VuID0gdGhpcy5qd3RIZWxwZXJTZXJ2aWNlLmRlY29kZVRva2VuKEpTT04ucGFyc2UodG9rZW4pWydhY2Nlc3NUb2tlbiddKTtcbiAgICAgICAgICAgIHNlc3Npb24gPSBuZXcgU2Vzc2lvbihkZWNvZGVkVG9rZW4pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3VycmVudFVzZXJTdWJqZWN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxTZXNzaW9uPihzZXNzaW9uKTtcbiAgICAgICAgdGhpcy5jdXJyZW50VXNlciA9IHRoaXMuY3VycmVudFVzZXJTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuICAgICAgICB0aGlzLmN1cnJlbnRVc2VyU3ViamVjdC5uZXh0KHNlc3Npb24pO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgYXV0aGVudGljYXRpb25DaGFuZ2UkKCk6IE9ic2VydmFibGU8U2Vzc2lvbj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50VXNlclN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBhdXRoZW50aWNhdGlvbkNoYW5nZVNpbXBsZSQoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRVc2VyU3ViamVjdC5hc09ic2VydmFibGUoKS5waXBlKFxuICAgICAgICAgICAgbWFwKCgpID0+IHRoaXMuaXNBdXRoZW50aWNhdGVkKCkpLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRBdXRob3JpemF0aW9uSGVhZGVyKCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy50b2tlbk5hbWUpO1xuICAgICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gSlNPTi5wYXJzZSh0b2tlbilbJ2FjY2Vzc1Rva2VuJ107XG4gICAgICAgICAgICByZXR1cm4gYEJlYXJlciAke2FjY2Vzc1Rva2VufWA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc0F1dGhlbnRpY2F0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IHRva2VuID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLnRva2VuTmFtZSkpO1xuICAgICAgICByZXR1cm4gdG9rZW4gIT09IG51bGwgJiYgdG9rZW4gIT09IHVuZGVmaW5lZCAmJiAhdGhpcy5qd3RIZWxwZXJTZXJ2aWNlLmlzVG9rZW5FeHBpcmVkKHRva2VuLmFjY2Vzc1Rva2VuKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0U2Vzc2lvbigpOiBTZXNzaW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFVzZXJTdWJqZWN0LnZhbHVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBsb2dpbih1c2VybmFtZTogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy50b2tlbk5hbWUpO1xuICAgICAgICBjb25zdCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogJ0Jhc2ljICcgKyBidG9hKGAke3RoaXMuY29uZmlnLmNsaWVudC5uYW1lfToke3RoaXMuY29uZmlnLmNsaWVudC5wYXNzd29yZH1gKSxcbiAgICAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICB9LFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBjcmVkZW50aWFscyA9IHtcbiAgICAgICAgICAgIHVzZXJuYW1lOiB1c2VybmFtZSxcbiAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZCxcbiAgICAgICAgICAgIGdyYW50X3R5cGU6ICdwYXNzd29yZCcsXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudC5wb3N0KHRoaXMuY29uZmlnLmxvZ2luVXJsLCBjcmVkZW50aWFscywge2hlYWRlcnM6IGhlYWRlcnN9KVxuICAgICAgICAgICAgLnBpcGUobWFwKHRva2VuID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkZWNvZGVkVG9rZW4gPSB0aGlzLmp3dEhlbHBlclNlcnZpY2UuZGVjb2RlVG9rZW4odG9rZW5bJ2FjY2Vzc1Rva2VuJ10pO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlc3Npb246IFNlc3Npb24gPSBuZXcgU2Vzc2lvbihkZWNvZGVkVG9rZW4pO1xuICAgICAgICAgICAgICAgIGlmICh0b2tlbikge1xuICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLnRva2VuTmFtZSwgSlNPTi5zdHJpbmdpZnkodG9rZW4pKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50VXNlclN1YmplY3QubmV4dChzZXNzaW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlc3Npb247XG4gICAgICAgICAgICB9KSwgc2hhcmUoKSk7XG4gICAgfVxuXG4gICAgcHVibGljIHNpZ25VcChyZXF1ZXN0OiBTaWduVXBSZXF1ZXN0KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudC5wb3N0KHRoaXMuY29uZmlnLnNpZ25VcFVybCwgcmVxdWVzdCk7XG4gICAgfVxuXG4gICAgcHVibGljIGxvZ291dCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy50b2tlbk5hbWUpO1xuICAgICAgICB0aGlzLmN1cnJlbnRVc2VyU3ViamVjdC5uZXh0KG51bGwpO1xuICAgICAgICByZXR1cm4gb2YodHJ1ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIHByZXBhcmVIdHRwQ2xpZW50QXV0aEhlYWRlcigpIHtcbiAgICAgICAgcmV0dXJuIHtoZWFkZXJzOiB7J0F1dGhvcml6YXRpb24nOiB0aGlzLmdldEF1dGhvcml6YXRpb25IZWFkZXIoKX19O1xuICAgIH1cblxuICAgIHB1YmxpYyB3aG9hbWkoKTogT2JzZXJ2YWJsZTxVc2VyRW50aXR5PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQuZ2V0PFVzZXJFbnRpdHk+KCcvdXNlci9tZScsIHRoaXMucHJlcGFyZUh0dHBDbGllbnRBdXRoSGVhZGVyKCkpO1xuICAgIH1cblxuICAgIGhhc1JvbGUocm9sZTogc3RyaW5nKSB7XG4gICAgICAgIGZvciAoY29uc3QgcmEgb2YgdGhpcy5nZXRTZXNzaW9uKCkuYXV0aG9yaXRpZXMpIHtcbiAgICAgICAgICAgIGlmIChyYS5yb2xlID09PSByb2xlICYmIHJhLmNsaWVudCA9PT0gdGhpcy5jb25maWcuY2xpZW50Lm5hbWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuIl19