import { NgModule } from '@angular/core';
import { NbButtonModule, NbDatepickerModule, NbDialogModule, NbMenuModule, NbToastrModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ThemeModule } from '../theme/theme.module';

// import { DashboardModule } from './dashboard/dashboard.module';
// import { ECommerceModule } from './e-commerce/e-commerce.module';

import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule,NbSelectModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';
import { ExpensesService } from '../shared/expenses.service';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule  } from '../auth/auth-routing.module';
import { IonicModule } from '@ionic/angular';
// import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';

@NgModule({
  imports: [
    ThemeModule,
    NbMenuModule,
    NbButtonModule,
    NbEvaIconsModule,
    FormsModule,
    NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule, NbDatepickerModule,
    Ng2SmartTableModule,
    AuthRoutingModule ,
    NbSelectModule,
    IonicModule,
    NbDialogModule.forChild(),
  ],
  declarations: [
    LoginComponent,
    AuthComponent
  ],

  exports:[
    LoginComponent,
    AuthComponent
  ],
  providers: [ExpensesService],
})
export class AuthModule {
}
