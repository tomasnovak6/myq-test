import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {HttpClient, HttpClientModule, provideHttpClient, withFetch} from "@angular/common/http";
import { TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {ActionReducerMap, provideStore, StoreModule} from '@ngrx/store';
import {EffectsModule} from "@ngrx/effects";
import {GroupEffects} from "./store/group.effects";
import {groupReducer} from "./store/group.reducer";
import {IGroups} from "./model/i-groups";

// required for AoT
export function createTranslationLoader(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http);
}

export interface AppState {
  groups: IGroups[];
}

export const reducers: ActionReducerMap<AppState> = {
  groups: groupReducer,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    TranslateService,
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(StoreModule.forRoot(reducers)),
    importProvidersFrom(EffectsModule.forRoot([GroupEffects])),
    importProvidersFrom(HttpClientModule, TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
            provide: TranslateLoader,
            useFactory: createTranslationLoader,
            deps: [HttpClient]
        }
    })),
    provideStore()
]
};
