import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
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
  physicalPositions = NbGlobalPhysicalPosition;
  logicalPositions = NbGlobalLogicalPosition;
  siteRegisterationForm!: FormGroup;
  public siteName = [
    { name: 'Company Operator(CC)', value: 'Company Operator(CC)' },
    { name: 'Dealer Operator(DC)', value: 'Dealer Operator(DC)' },
    { name: 'CC CNG', value: 'CC CNG' },
    { name: 'DC CNG', value: 'DC CNG' },
    { name: 'Measure Upgradation', value: 'Measure Upgradation' },
    { name: 'Small Upgradation', value: 'Small Upgradation' },
    { name: 'Other', value: 'Other' },
  ];
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
  submitted: boolean;
  constructor(
    private siteService: SiteRegService,
    private route: ActivatedRoute,
    private toastrService: NbToastrService,
    private router: Router,
    private formBuilder:FormBuilder
  ) {
    this.formInitialization()
  }
  ngOnInit(): void {
    this.fetchId = this.route.snapshot.paramMap.get('id');
    if (this.fetchId) {
      (this.dialogTiltle = 'Edit Site'), (this.clickTitle = 'Update');
      this.getSiteByID(this.fetchId);
    }
  }

  saveData(type: any) {
    this.submitted = true;
    if (this.siteRegisterationForm.invalid) {
      return;
    }

    else{
      if (type === 'Save') {
          this.siteService.createSite(this.siteRegisterationForm.value).subscribe((e: any) => {
            if (e) {
              this.showToast('success', 'Site Details Added Successfully');
              this.router.navigate(['site']);
            } else {
              this.showToast('success', 'Site Details Not Added');
            }
          });
        
      
      }
  
      if (type == 'Update') {
        this.siteService
          .updateSite(this.fetchId, this.siteRegisterationForm.value)
          .subscribe((res: any) => {
            this.showToast('success', 'Sites Updated Successfully');
            this.router.navigate(['site']);
          });
      }
    }

   
  }

  showToast(status: NbComponentStatus, msg: any) {
    this.toastrService.show(status, msg, { status });
  }

  siteValueChange(data: any) {
    let value  = data.target.value
    if (value === 'Other') {
      this.isOther = true;
      this.siteRegisterationForm.get('siteName')?.setValue('')
    }
  }

  getSiteByID(id: any) {
    this.siteService.getSiteById(id).subscribe((data) => {
      this.siteRegisterationForm.patchValue(data.user)
      this.siteRegisterationForm.get("date")?.patchValue(this.getConvert(data.user.date));
      if(data.user.closingDate){
        this.siteRegisterationForm.get("closingdate")?.patchValue(this.getConvert(data.user.closingDate));
      }
      
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


  formInitialization(){
    this.siteRegisterationForm = this.formBuilder.group({
      siteName: ['',Validators.required],
      location: ['',Validators.required],
      poNo: [''],
      work:['',Validators.required],
      number:[''],
      billNo: ['',Validators.required],
      date: ['',Validators.required],
      status:['',Validators.required],
      closingdate:[''],
      uniqueSiteId:[this.genterateRandom()]
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.siteRegisterationForm.controls;
  }
}
