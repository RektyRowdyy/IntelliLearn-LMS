import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/books-model';
import { BooksService } from 'src/app/services/books.service';
import { Chart, registerables } from 'chart.js';
import { map } from 'rxjs/operators';
import 'chartjs-plugin-datalabels';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  books: Book[] = [];
  labels: any = [];
  totalCount: any = [];
  totalBooksInLib: number = 0;
  

  constructor(private bookService: BooksService) { }
  
  ngOnInit(): void {

    //API call to get Books based on Category
    this.bookService.getBooksByCategory()
    .pipe(
      map((res: any[]) => {
        const categories = res.map(res => res.category);
        const total = res.map(res => res.total);
        return {categories,total};
      })
    )
    .subscribe({
      next: (res) => {
        this.labels = res.categories;
        this.totalCount = res.total;
        this.totalBooksInLib = this.totalCount.reduce((acc:number, value:number) => acc + value, 0);
        this.RenderChart(this.labels,this.totalCount)
      }
    });
    
    
    //API call to get Latest Books
    this.bookService.getLatestBooks()
    .subscribe({
      next: (res) => {
        this.books = res;
      }
    });
  }
  
  //DonutChart
  RenderChart(labels: any,data: any) {
      new Chart("donutChart", {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          label: 'Total No of Books',
          data: data,
          borderWidth: 1
        }]
      },
      options: {
        scales: {} // Empty object to remove axes
      }
    });
  }

}
