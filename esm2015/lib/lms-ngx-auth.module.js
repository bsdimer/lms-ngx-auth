/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { AUTH_CONFIG } from './authentication-config';
import { LmsNgxAuthService } from './lms-ngx-auth.service';
export class LmsNgxAuthModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG1zLW5neC1hdXRoLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xtcy1uZ3gtYXV0aC8iLCJzb3VyY2VzIjpbImxpYi9sbXMtbmd4LWF1dGgubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQXFDLFFBQVEsRUFBUSxNQUFNLGVBQWUsQ0FBQztBQUNsRixPQUFPLEVBQUUsV0FBVyxFQUF3QixNQUFNLHlCQUF5QixDQUFDO0FBQzVFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRzNELE1BQU0sT0FBTyxnQkFBZ0I7Ozs7Ozs7O0lBS2xCLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBNEI7UUFDOUMsT0FBTyxtQkFBcUI7WUFDeEIsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixTQUFTLEVBQUU7Z0JBQ1AsaUJBQWlCO2dCQUNqQjtvQkFDSSxPQUFPLEVBQUUsV0FBVztvQkFDcEIsUUFBUSxFQUFFLE1BQU07aUJBQ25CO2FBQ0o7U0FDSixFQUFBLENBQUM7SUFDTixDQUFDOzs7WUFqQkosUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVycm9ySGFuZGxlciwgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUsIFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFVVEhfQ09ORklHLCBBdXRoZW50aWNhdGlvbkNvbmZpZyB9IGZyb20gJy4vYXV0aGVudGljYXRpb24tY29uZmlnJztcbmltcG9ydCB7IExtc05neEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi9sbXMtbmd4LWF1dGguc2VydmljZSc7XG5cbkBOZ01vZHVsZSgpXG5leHBvcnQgY2xhc3MgTG1zTmd4QXV0aE1vZHVsZSB7XG4gICAgLypjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnRNb2R1bGU6IExtc05neEF1dGhNb2R1bGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBMbXNOZ3hBdXRoTW9kdWxlIGhhcyBhbHJlYWR5IGJlZW4gbG9hZGVkLiBJbXBvcnQgTG1zTmd4QXV0aE1vZHVsZSBtb2R1bGVzIGluIHRoZSBBcHBNb2R1bGUgb25seS5gKTtcbiAgICB9Ki9cblxuICAgIHB1YmxpYyBzdGF0aWMgZm9yUm9vdChjb25maWc6IEF1dGhlbnRpY2F0aW9uQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgICAgIHJldHVybiA8TW9kdWxlV2l0aFByb3ZpZGVycz57XG4gICAgICAgICAgICBuZ01vZHVsZTogTG1zTmd4QXV0aE1vZHVsZSxcbiAgICAgICAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAgICAgICAgIExtc05neEF1dGhTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZTogQVVUSF9DT05GSUcsXG4gICAgICAgICAgICAgICAgICAgIHVzZVZhbHVlOiBjb25maWcsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgIH07XG4gICAgfVxufVxuIl19