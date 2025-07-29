import {appConfig} from './app/app.config'
import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {environment} from "./enviroments/enviroment";
import {enableProdMode} from "@angular/core";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
