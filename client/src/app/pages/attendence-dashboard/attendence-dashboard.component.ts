import {
  Component,
  HostListener,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  NbComponentStatus,
  NbDialogRef,
  NbDialogService,
  NbToastrService,
} from '@nebular/theme';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { EmployeeService } from 'src/app/shared/employee.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-attendence-dashboard',
  templateUrl: './attendence-dashboard.component.html',
  styleUrls: ['./attendence-dashboard.component.scss'],
})
export class AttendenceDashboardComponent implements OnInit {
  public lineChart = [{ data: [90, 10], label: 'Attendecne %' }];
  public monthCountArray: any = [];
  public chartLabel = ['Present', 'Abscent'];
  public lineChart1 = [
    {
      data: [5, 10, 15, 19, 30, 10, 26, 23, 12, 12, 14, 11],
      label: 'Attendence',
    },
  ];
  public monthIndex = 0;
  public monthName = [
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
  public chartLabel1 = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];

  public fetchId: any;
  currentMonthAtt: any;
  allData: any;
  approvalType: any;
  currentDate = new Date();
  approvedData: any;
  employeeData: any;
  totalpayment: { totalPayment: any; LWP: any; netSalary: number };
  aatendecneObj: any;
  currentMonthAbscent: any;
  monthDetails: { Present: any; absent: number; noOfDay: number };
  constructor(
    private route: ActivatedRoute,
    private attendenceService: EmployeeService,
    private employeeService: EmployeeService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService
  ) {}
  private paySlipDialogRef: NbDialogRef<TemplateRef<any>>;
  @ViewChild('payslipValue') paySlipValueModal: TemplateRef<any>;
  @ViewChild('approvalAttendence') approvedAttendecneModal: TemplateRef<any>;
  private approvedAttendecneDialogRef: NbDialogRef<TemplateRef<any>>;
  @ViewChild('payslip') paySlipModal: TemplateRef<any>;
  public AttendecneMonth = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  public month = [
    { id: 0, name: 'Jan' },
    { id: 1, name: 'Feb' },
    { id: 2, name: 'Mar' },
    { id: 3, name: 'Apr' },
    { id: 4, name: 'May' },
    { id: 5, name: 'June' },
    { id: 6, name: 'July' },
    { id: 7, name: 'Aug' },
    { id: 8, name: 'Sept' },
    { id: 9, name: 'Oct' },
    { id: 9, name: 'Sept' },
    { id: 10, name: 'Nov' },
    { id: 11, name: 'Dec' },
  ];

  siteDetails: any = [];
  ngOnInit(): void {
    this.fetchId = this.route.snapshot.paramMap.get('id');
    if (this.fetchId) {
      this.getAttendenceByID(this.fetchId);

      this.getEmployeeByID(this.fetchId)
    }
  }

  getEmployeeByID(id: any) {
    this.employeeService.getEmployeeById(id).subscribe((data) => {
      this.employeeData = data.user;
    });
  }

  public Download(): void {
    let DATA: any;
    DATA = document.getElementById('salarySlip');

    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('l', 'mm', 'a4');
      var yPos = 30;
      var xPos = 30;
      PDF.addImage(FILEURI, 'PNG', yPos, xPos, fileWidth, fileHeight);
      PDF.save('salarySlip.pdf');
    });
  }

  getAttendenceByID(id: any) {
    this.attendenceService.getAttendById(id).subscribe((e: any) => {
      let data = e.attendance;
      data.map((e: any) => {
        e['month'] = e.date
          ? this.getMonthOfDate(e.date)
          : this.getMonthOfDate(e.startDate);
        if (e.date) {
          e['date'] = e.date;
        }
        if (e.startDate || e.endDate) {
          e['start'] = e.startDate;
          e['end'] = e.endDate;
        }
        return e;
      });
      this.allData = data;
      this.countAttendence(this.allData);
      this.monthDetails = this.getAbsentAndPresent(new Date().getMonth());
      this.currentMonthAtt = data.filter((y: any) => {
        return y.status === 'Present' && y.month == new Date().getMonth();
      });
      this.currentMonthAbscent = data.filter((y: any) => {
        return y.status === 'Absent' && y.month == new Date().getMonth();
      });
    });
  }

  getMonthOfDate(dateString: any) {
    const parts = dateString?.split('-');
    let month = 0;

    // Extract the month (parts[1] - 1 because months are 0-indexed)
    if (parts) {
      month = parseInt(parts[1]) - 1;
    }

    return month;
  }

  approvedEvent(type: any, data: any) {
    this.approvalType = type;
    this.approvedAttendecneDialogRef = this.dialogService.open(
      this.approvedAttendecneModal,
      { context: 'this is some additional data passed to dialog' }
    );
    this.approvedAttendecneDialogRef.onBackdropClick.subscribe(
      (result: any) => {}
    );
    this.approvedData = data;
  }

  submitApproval(type: any) {
    console.log('aprrovedData', type, this.approvedData);
    this.approvedData.approvalStatus = type;
    this.attendenceService
      .updateAttendecne(this.approvedData._id, this.approvedData)
      .subscribe((res) => {
        this.showToast('success', 'User Updated Successfully');
        this.approvedAttendecneDialogRef.close();
      });
  }

  showToast(status: NbComponentStatus, msg: any) {
    this.toastrService.show(status, msg, { status });
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    this.approvedAttendecneDialogRef.close();
  }

  monthChange(data: any) {
    this.paySlipDialogRef = this.dialogService.open(this.paySlipValueModal, {
      context: 'this is some additional data passed to dialog',
    });
    this.paySlipDialogRef.onBackdropClick.subscribe((result: any) => {});
    let monthValue = parseInt(data.target.value);
    let index = this.AttendecneMonth.indexOf(monthValue);
    let b = this.monthCountArray[index];
    this.daysInMonth(index + 1, new Date().getFullYear());
    let absent =
      this.daysInMonth(index + 1, new Date().getFullYear()) - Number(b);
    this.aatendecneObj = {
      present: b,
      abscent: absent,
      noOfDay: this.daysInMonth(index + 1, new Date().getFullYear()),
    };

      this.getDataOfAttendenceRecode();
  }


  getDataOfAttendenceRecode(){
    let perDaySalary =
    this.employeeData.basicPay / this.aatendecneObj.noOfDay;
  let toalpayment: any = this.employeeData.basicPay;
  let absentofMonth: any = (
    perDaySalary * this.aatendecneObj.abscent
  ).toFixed(2);
  let netSalary: any = (perDaySalary * this.aatendecneObj.present).toFixed(
    2
  );
  this.totalpayment = {
    totalPayment: toalpayment,
    LWP: absentofMonth,
    netSalary: netSalary,
  };
  setTimeout(this.Download, 3000);
  }

  getAbsentAndPresent(value: any) {
    let monthValue = parseInt(value);
    let index = this.AttendecneMonth.indexOf(monthValue);

    let b = this.monthCountArray[index];
    this.monthIndex = index;
    this.daysInMonth(index + 1, new Date().getFullYear());
    let absent =
      this.daysInMonth(index + 1, new Date().getFullYear()) - Number(b);
    this.lineChart = [{ data: [b, absent], label: 'Series A' }];
    return {
      Present: b,
      absent: absent,
      noOfDay: this.daysInMonth(index + 1, new Date().getFullYear()),
    };
  }

  daysInMonth(month: any, year: any) {
    return new Date(year, month, 0).getDate();
  }

  countAttendence(data: any) {
    this.monthCountArray = new Array(12).fill(0);
    data.forEach((e: any) => {
      if (
        new Date(e.date).getFullYear() === new Date().getFullYear() &&
        e.approvalStatus === 'Approved' &&
        e.status === 'Present'
      ) {
        this.monthCountArray[new Date(e.date).getMonth()] += 1;
        this.lineChart1 = [{ data: this.monthCountArray, label: 'Present' }];
      }
    });
  }
}
