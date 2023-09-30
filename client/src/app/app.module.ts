import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule,NbSidebarModule, NbDatepickerModule, NbDialogModule, NbToastrModule, NbTooltipModule, NbTabsetModule, NbFormFieldModule } from '@nebular/theme';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NbMenuModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ThemeModule } from './theme/theme.module';
import { ExpensesService } from './shared/expenses.service';
import { EmployeeService } from './shared/employee.service';
import { AuthenticationService } from './shared/auth.service';
import { AuthGuard } from './core/auth.guard';
import { TransactionService } from './shared/transaction.service';
import { GalleryService } from './shared/gallery.service';
import { SiteRegService } from './shared/site-reg.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { environment } from "../environments/environment";
import { initializeApp } from "firebase/app";
import { MessageService } from './shared/message.service';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { DropzoneDirective } from './dropzone.directive';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { LoaderInterceptor } from './interceptor/loader.interceptor';
import { NgApexchartsModule } from "ng-apexcharts";





initializeApp(environment.firebase);

// import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);



@NgModule({
  declarations: [
    AppComponent,
    DropzoneDirective,
   
  
   
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NbMenuModule,
    HttpClientModule,
    FormsModule ,
    ReactiveFormsModule,
    ThemeModule.forRoot(),
    BrowserAnimationsModule,
    NbSidebarModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbMenuModule.forRoot(),
     NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbTooltipModule,
    NbFormFieldModule,
    FullCalendarModule,
    NgApexchartsModule,
    IonicModule.forRoot(),
    NbDialogModule.forRoot(),
    NbToastrModule.forRoot(
      {
       
        preventDuplicates: true,
      }
    ),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],

 
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: LoaderInterceptor,
    multi: true,
 }, ExpensesService,GalleryService,EmployeeService,AuthenticationService, AuthGuard,TransactionService,SiteRegService,MessageService ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
 
})
export class AppModule { }
