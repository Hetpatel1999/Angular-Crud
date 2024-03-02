import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

// for Table
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Order } from '../interface/order.interface';



@Component({
  selector: 'app-order-traking',
  templateUrl: './order-traking.component.html',
  styleUrls: ['./order-traking.component.scss']
})
export class OrderTrakingComponent implements OnInit {
  title = 'crud';
  displayedColumns: string[] = ['buyerName', 'catalogName', 'quantity ', 'freshness', 'date', 'price', 'comment', 'orderStatus', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: ApiService) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    this.api.getOrders()
      .subscribe({
        next: (res: Order[]) => {
          const processedOrders = res.filter(order => order.orderStatus === 'Delivered' || order.orderStatus === 'Dispatched');
          this.dataSource = new MatTableDataSource(processedOrders);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          alert("Error while loading Orders");
        }
      })
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '40%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllOrders();
      }
    })
  }

  editOrder(row: any) {
    this.dialog.open(DialogComponent, {
      width: '80% !important',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllOrders();
      }
    })
  }
  deleteOrderTraking(id: number) {
    if (confirm('Are you sure you want to delete this order?')) {
      this.deleteOrder(id);
    }
  }

  deleteOrder(id: number) {
    this.api.deleteOrder(id).subscribe({
      next: (res) => {
        this.getAllOrders();
      },
      error: (err) => {
        alert("Error while deleting Order");
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
