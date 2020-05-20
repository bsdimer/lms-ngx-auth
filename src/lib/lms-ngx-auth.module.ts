import { ErrorHandler, ModuleWithProviders, NgModule, Type } from '@angular/core';
import { AUTH_CONFIG, AuthenticationConfig } from './authentication-config';
import { LmsNgxAuthService } from './lms-ngx-auth.service';

@NgModule()
export class LmsNgxAuthModule {
    /*constructor(@Optional() @SkipSelf() parentModule: LmsNgxAuthModule) {
        throw new Error(`LmsNgxAuthModule has already been loaded. Import LmsNgxAuthModule modules in the AppModule only.`);
    }*/

    public static forRoot(config: AuthenticationConfig): ModuleWithProviders {
        return <ModuleWithProviders>{
            ngModule: LmsNgxAuthModule,
            providers: [
                LmsNgxAuthService,
                {
                    provide: AUTH_CONFIG,
                    useValue: config,
                },
            ],
        };
    }
}
