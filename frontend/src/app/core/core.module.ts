import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './shell/shell.component';
import { HeaderComponent } from './shell/header/header.component';
import { FooterComponent } from './shell/footer/footer.component';
import { MainComponent } from './shell/main/main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    ShellComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule, AppRoutingModule, FormsModule, FontAwesomeModule
  ],
  exports:[ShellComponent]
})
export class CoreModule { }
