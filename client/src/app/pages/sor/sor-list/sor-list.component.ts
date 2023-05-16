import {
  Component,
  HostListener,
  OnInit,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { SorService } from 'src/app/shared/sor.service';
import {
  NbComponentStatus,
  NbDialogRef,
  NbDialogService,
  NbToastrService,
} from '@nebular/theme';
import { SOR } from 'src/app/model/sor.model';

@Component({
  selector: 'app-sor-list',
  templateUrl: './sor-list.component.html',
  styleUrls: ['./sor-list.component.scss'],
})
export class SorListComponent implements OnInit {
  p: number = 1;
  gridData: any = [];
  public serviceNumber: any;
  ID: String;
  ul = document.getElementById('siteTableBody');
  liSelected: any;
  index = -1;
  selectedRow = 0;
  @ViewChild('dialogsor') sorModal: TemplateRef<any>;
  private sorDialogRef: NbDialogRef<TemplateRef<any>>;
  public SorFormModel: SOR = new SOR();
  constructor(
    private sorSerive: SorService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.getSor();
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    var len = document.getElementsByTagName('tr').length - 1;
    if (event.key === 'ArrowDown') {
      this.index++;
      //down
      if (this.liSelected) {
        this.removeClass(this.liSelected, 'selected');
        let next = document.getElementsByTagName('tr')[this.index];
        console.log('next', next, this.liSelected);
        if (typeof next !== undefined && this.index <= len) {
          this.liSelected = next;
        } else {
          this.index = 0;
          this.liSelected = document.getElementsByTagName('tr')[0];
        }
        this.addClass(this.liSelected, 'selected');
        console.log(this.index);
      } else {
        this.index = 0;

        this.liSelected = document.getElementsByTagName('tr')[0];
        this.addClass(this.liSelected, 'selected');
      }
    } else if (event.key === 'ArrowUp') {
      //up
      if (this.liSelected) {
        this.removeClass(this.liSelected, 'selected');
        this.index--;
        let next = document.getElementsByTagName('tr')[this.index];
        if (typeof next !== undefined && this.index >= 0) {
          this.liSelected = next;
        } else {
          this.index = len;
          this.liSelected = document.getElementsByTagName('tr')[len];
        }
        this.addClass(this.liSelected, 'selected');
      } else {
        this.index = 0;
        this.liSelected = document.getElementsByTagName('tr')[len];
        this.addClass(this.liSelected, 'selected');
      }
    }
  }

  removeClass(el: any, className: any) {
    if (el.classList) {
      el.classList.remove(className);
    } else {
      el.className = el.className.replace(
        new RegExp(
          '(^|\\b)' + className.split(' ').join('|') + '(\\b|$)',
          'gi'
        ),
        ' '
      );
    }
  }

  addClass(el: any, className: any) {
    if (el.classList) {
      el.classList.add(className);
    } else {
      el.className += ' ' + className;
    }
  }

  getSor() {
    this.sorSerive.getSOR().subscribe((res: any) => {
      console.log('sor', res);
      this.gridData = res;
    });
  }
  Search() {
    if (this.serviceNumber == '') {
      this.ngOnInit();
    } else {
      this.gridData = this.gridData.filter((res: any) => {
        return res.ServiceNo.toLocaleLowerCase().match(
          this.serviceNumber.toLocaleLowerCase()
        );
      });
    }
  }
  edit(type: any, item: any) {
    console.log('dataaaaaa', item);
    this.ID = item._id;
    this.sorDialogRef = this.dialogService.open(this.sorModal, {
      context: 'this is some additional data passed to dialog',
    });
    this.sorDialogRef.onBackdropClick.subscribe((result: any) => {});
    this.SorFormModel = item;
  }

  update() {
    this.sorSerive.updateSOR(this.ID, this.SorFormModel).subscribe((res) => {
      this.showToast('success', 'SOR Updated Successfully');
      this.ngOnInit();
      this.sorDialogRef.close();
    });
  }

  showToast(status: NbComponentStatus, msg: any) {
    this.toastrService.show(status, msg, { status });
  }
}
