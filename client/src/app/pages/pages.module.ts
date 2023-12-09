import { NgModule } from '@angular/core';
import { NbButtonModule, NbDatepickerModule, NbDialogModule, NbMenuModule, NbTabsetModule, NbToastrModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ThemeModule } from '../theme/theme.module';
import { PagesComponent } from './pages.component';
import { MaterialOnSiteComponent } from './materialOnSite/materialOnSite.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { AddExpensesComponent } from './expenses/add-expenses/add-expenses.component';
// import { DashboardModule } from './dashboard/dashboard.module';
// import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PdfViewerModule } from 'ng2-pdf-viewer'; 
import { PagesRoutingModule } from './pages-routing.module';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule,NbSelectModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExpensesService } from '../shared/expenses.service';
import { AdminSiteExpensesComponent } from './admin/siteexpenses/siteexpenses.component';
import { AddEmployeeComponent } from './employee/add-employee/add-exployee.component';
import { EmployeeComponent } from './employee/employee.component';
import { TransactionComponent } from './transaction/transaction.component';
import { AddTransactionComponent } from './transaction/add-transaction/add-transaction.component';
import { AddGalleryComponent } from './gallery/add-gallery/add-gallery.component';
import { GalleryComponent } from './gallery/gallery.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskComponent } from './task/task.component';
import { AddTaskComponent } from './task/add-task/add-task.component';
import { AddSiteRegComponent } from './siteRegistration/add-site/add-site.component';
import { SiteRegComponent } from './siteRegistration/siteReg.component';
import { AttendenceComponent } from './attendence/attendence.component';
import { SanitizeURLPipe } from 'src/util/domsanitize.pipe';
import { AttemdemceListComponent } from './attendence/attemdemce-list/attemdemce-list.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MobileViewComponent } from './mobile-view/mobile-view.component';
import { PayslipComponent } from './payslip/payslip.component';
import { SorComponent } from './sor/sor.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {   Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { DrawingComponent } from './drawing/drawing.component';
import { SorListComponent } from './sor/sor-list/sor-list.component'
import { AddSorComponent } from './sor/add-sor/add-sor.component';
import { GenerateInvoiceComponent } from './sor/generate-invoice/generate-invoice.component';
import { ViewSorBillComponent } from './sor/view-sor-bill/view-sor-bill.component';
import { ViewSorWbmComponent } from './sor/view-sor-wbm/view-sor-wbm.component';
import { NgxPrintModule } from 'ngx-print';
import { SorIstRegSiteComponent } from './sor/sor-ist-reg-site/sor-ist-reg-site.component';
import { LedgerComponent } from './ledger/ledger.component';
import { AddLedgerComponent } from './ledger/add-ledger/add-ledger.component';
import { ViewLedgerComponent } from './ledger/view-ledger/view-ledger.component';

import { LoaderComponent } from './loader/loader.component';
import { CustomDatePipe } from '../pipe/custom-date.pipe';
import { AttendenceDashboardComponent } from './attendence-dashboard/attendence-dashboard.component';
import { ChartComponent } from '../chart/chart.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
   ThemeModule,
    NbMenuModule,
    NbButtonModule,
    PagesRoutingModule,
    NbEvaIconsModule,
    FormsModule,
    ReactiveFormsModule,
    NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule, NbDatepickerModule,
    Ng2SmartTableModule,
    NbSelectModule,
    NbTabsetModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    FullCalendarModule,
    PdfViewerModule,
    NgxPrintModule,
    ChartsModule,
    NbDialogModule.forChild(),
  
    
  ],
  declarations: [
    PagesComponent,
    DashboardComponent,
    EmployeeComponent,
    AddEmployeeComponent,
    MaterialOnSiteComponent,
    ExpensesComponent,
    AddExpensesComponent,
    AdminSiteExpensesComponent,
    AddTransactionComponent,
    TransactionComponent,
    AddGalleryComponent,
    GalleryComponent,
    TaskComponent,
    AddTaskComponent,
    AddSiteRegComponent,
    SiteRegComponent,
    AttendenceComponent,
    SanitizeURLPipe,
    AttemdemceListComponent,
    MobileViewComponent,
    PayslipComponent,
    SorComponent,
    DrawingComponent,
    SorListComponent,
    AddSorComponent,
    GenerateInvoiceComponent,
    ViewSorBillComponent,
    ViewSorWbmComponent,
    SorIstRegSiteComponent,
    LedgerComponent,
    AddLedgerComponent,
    ViewLedgerComponent,
    LoaderComponent,
    CustomDatePipe,
    ChartComponent,
    AttendenceDashboardComponent,
   
  ],
  exports:[SanitizeURLPipe],
  providers: [ExpensesService],
})
export class PagesModule {
}
