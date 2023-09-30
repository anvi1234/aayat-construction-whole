import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { MaterialOnSiteComponent } from './materialOnSite/materialOnSite.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { AddExpensesComponent } from './expenses/add-expenses/add-expenses.component';
import { AdminSiteExpensesComponent } from './admin/siteexpenses/siteexpenses.component';
import { EmployeeComponent } from './employee/employee.component';
import { AddEmployeeComponent } from './employee/add-employee/add-exployee.component';
import { TransactionComponent } from './transaction/transaction.component';
import { AddTransactionComponent } from './transaction/add-transaction/add-transaction.component';
import { AddGalleryComponent } from './gallery/add-gallery/add-gallery.component';
import { GalleryComponent } from './gallery/gallery.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskComponent } from './task/task.component';
import { AddTaskComponent } from './task/add-task/add-task.component';
import { SiteRegComponent } from './siteRegistration/siteReg.component';
import { AddSiteRegComponent } from './siteRegistration/add-site/add-site.component';
import { AttendenceComponent } from './attendence/attendence.component';
import { MobileViewComponent } from './mobile-view/mobile-view.component';
import { AttemdemceListComponent } from './attendence/attemdemce-list/attemdemce-list.component';
import { PayslipComponent } from './payslip/payslip.component';
import { SorComponent } from './sor/sor.component';
import { DrawingComponent } from './drawing/drawing.component';
import { SorListComponent } from './sor/sor-list/sor-list.component';
import { AddSorComponent } from './sor/add-sor/add-sor.component';
import { GenerateInvoiceComponent } from './sor/generate-invoice/generate-invoice.component';
import { ViewSorWbmComponent } from './sor/view-sor-wbm/view-sor-wbm.component';
import { ViewSorBillComponent } from './sor/view-sor-bill/view-sor-bill.component';
import { SorIstRegSiteComponent } from './sor/sor-ist-reg-site/sor-ist-reg-site.component';
import { LedgerComponent } from './ledger/ledger.component';
import { AddLedgerComponent } from './ledger/add-ledger/add-ledger.component';
import { ViewLedgerComponent } from './ledger/view-ledger/view-ledger.component';
import { AttendenceDashboardComponent } from './attendence-dashboard/attendence-dashboard.component';


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path:'add-expense',
      component: AddExpensesComponent,
    },
    {
      path:'edit-expense/:id',
      component: AddExpensesComponent,
    },
    {
      path: 'expenses',
      component: ExpensesComponent,
     
    },
    {
      path: 'expenses/:id',
      component: ExpensesComponent,
     
    },
    {
      path: 'admin-site-expenses',
      component: AdminSiteExpensesComponent,
  },
  {
    path: 'user',
    component: EmployeeComponent,
},
{
  path: 'user/:id',
  component: EmployeeComponent,
},


{
  path: 'add-user',
  component: AddEmployeeComponent,
},
{
  path: 'edit-user/:id',
  component: AddEmployeeComponent,
},
{
  path: 'transaction',
  component: TransactionComponent,
},
{
  path: 'transaction/:id',
  component: TransactionComponent,
},
{
  path: 'add-transaction',
  component: AddTransactionComponent,
},
{
  path: 'edit-transaction/:id',
  component:AddTransactionComponent,
},
{
  path:"add-gallery",
  component:AddGalleryComponent
},
{
  path:"add-gallery/:id",
  component:AddGalleryComponent
},
{
  path:"gallery",
  component:GalleryComponent
},
{
  path:"gallery/:id",
  component:GalleryComponent
},
{
  path:"dashboard",
  component:DashboardComponent
},
{
  path:"task",
  component:TaskComponent
},
{
  path:"task/:id",
  component:TaskComponent
},
{
  path:"add-task",
  component:AddTaskComponent
},
{
  path:"edit-task/:id",
  component:AddTaskComponent
},
{
  path:"site",
  component:SiteRegComponent
},

{
  path:"add-site",
  component:AddSiteRegComponent
},
{
  path:"edit-site/:id",
  component:AddSiteRegComponent
}, 
{
  path:"add-attendence",
  component:AttendenceComponent
},
{
  path:"attendence",
  component:AttemdemceListComponent
},
{
  path:"attendence-dashboard/:id",
  component: AttendenceDashboardComponent
},
{
  path:"mobile-view",
  component:MobileViewComponent
},
{
  path:"pay-slip",
  component: PayslipComponent
},
{
  path:"sor",
  component: SorComponent
},
{
  path:"sor-list",
  component: SorListComponent
},
{
  path:"add-sor",
  component: AddSorComponent
},
{
  path:"generate-sor-invoice",
  component: GenerateInvoiceComponent
},
{
  path:"drawing",
  component: DrawingComponent
},
{
  path:"view-sor-bill",
  component: ViewSorBillComponent
},
{
  path:"view-sor-wbm",
  component:  ViewSorWbmComponent
},
{
  path:"sor-list-reg-site",
  component:SorIstRegSiteComponent
},
{
  path:"ledger",
  component:LedgerComponent
},
{
  path:"add-ledger",
  component:AddLedgerComponent
},
{
  path:"view-ledger",
  component:ViewLedgerComponent
},


  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
  
}
