import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { SiteDetails } from 'src/app/model/site.model';
import { SiteRegService } from 'src/app/shared/site-reg.service';

@Component({
  selector: 'app-add-site',
  templateUrl: '/add-site.component.html',
  styleUrls: ['/add-site.component.scss'],
})
export class AddSiteRegComponent implements OnInit {
  public ngModelDate = new Date();
  public partDetails: boolean = false;
  public closingDate = '2020-08-09';
  public productDetails: boolean = false;
  public isOther: boolean = false;
  public clickTitle = 'Save';
  public fetchId: any;
  public dialogTiltle = 'Add Site';
  public siteName = [
    { name: 'Company Operator(CC)', value: 'Company Operator(CC)' },
    { name: 'Dealer Operator(DC)', value: 'Dealer Operator(DC)' },
    { name: 'CC CNG', value: 'CC CNG' },
    { name: 'DC CNG', value: 'DC CNG' },
    { name: 'Measure Upgradation', value: 'Measure Upgradation' },
    { name: 'Small Upgradation', value: 'Small Upgradation' },
    { name: 'Other', value: 'Other' },
  ];
  public SiteFormModel: SiteDetails = new SiteDetails();
  // error = ExpensesValidation(this.ExpensesFormModel, "init")

  public month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  constructor(
    private siteService: SiteRegService,
    private route: ActivatedRoute,
    private toastrService: NbToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.fetchId = this.route.snapshot.paramMap.get('id');
    if (this.fetchId) {
      (this.dialogTiltle = 'Edit Site'), (this.clickTitle = 'Update');
      this.getSiteByID(this.fetchId);
    }
  }

  saveData(type: any) {
    if (type === 'Save') {
      this.SiteFormModel.uniqueSiteId = this.genterateRandom()
      if( this.SiteFormModel.uniqueSiteId){
        this.siteService.createSite(this.SiteFormModel).subscribe((e: any) => {
          if (e) {
            this.showToast('success', 'Site Details Added Successfully');
            this.router.navigate(['site']);
          } else {
            this.showToast('success', 'Site Details Not Added');
          }
        });
      }
    
    }

    if (type == 'Update') {
      this.siteService
        .updateSite(this.fetchId, this.SiteFormModel)
        .subscribe((res: any) => {
          this.showToast('success', 'Sites Updated Successfully');
          this.router.navigate(['site']);
        });
    }
  }

  showToast(status: NbComponentStatus, msg: any) {
    this.toastrService.show(status, msg, { status });
  }

  siteValueChange(data: any) {
    if (data === 'Other') {
      this.isOther = true;
      this.SiteFormModel.siteName = '';
    }
  }

  getSiteByID(id: any) {
    this.siteService.getSiteById(id).subscribe((data) => {
      let a = this.siteName.filter((e: any) => {
        if (e.name === data.user.siteName) {
          return true;
        } else {
          return false;
        }
      });

      if (a.length > 0) {
        this.isOther = false;
      } else {
        this.isOther = true;
      }
      this.SiteFormModel = data.user;
      this.SiteFormModel.number = data.user.number;
      // this.closingDate = new Date(this.closingDate

       if( this.SiteFormModel.closingdate!= null){
        this.SiteFormModel.closingdate = this.getConvert(
          this.SiteFormModel.closingdate
        );
       }
    
      this.SiteFormModel.date = this.getConvert(this.SiteFormModel.date);
    });
  }

  getConvert(str) {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
  }

  genterateRandom(){
    const result = Date.now() + Math.random().toString(36).substring(2,7);
    return result;

  }

}
