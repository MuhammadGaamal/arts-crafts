import { NgModule } from '@angular/core';
import {
  ServerModule,
  ServerTransferStateModule
} from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppBrowserModule } from './app.module';
import { AppComponent } from './app.component';
import { HttpUniversalInterceptor } from './interceptor';

@NgModule({
  imports: [
    AppBrowserModule,
    ServerModule,
    ModuleMapLoaderModule,
    ServerTransferStateModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpUniversalInterceptor,
      multi: true
    }
  ],
})
export class AppServerModule {}
