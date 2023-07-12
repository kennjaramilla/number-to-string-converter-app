import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { KeypadButtonComponent } from './converter/keypad-button/keypad-button.component';
import { ConverterComponent } from './converter/converter.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [AppComponent, ConverterComponent, KeypadButtonComponent],
    imports: [BrowserModule, ReactiveFormsModule, NgxsModule.forRoot([]), AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
