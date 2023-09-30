import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() lineChartData: Chart.ChartDataSets[] = [
    { data: [90,10], label: 'Series A' },
  ];
   @Input() lineChartLabels: string[] = ['Present', 'Abscent'];
  lineChartOptions: Chart.ChartOptions = { responsive: true };
  lineChartLegend = true;
  lineChartPlugins = [];
  @Input() lineChartType: Chart.ChartType = 'line';
  constructor() { }

  ngOnInit(): void {
  }

}
