import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  catalog = ["RM Gold", "RM Star"];
  FreshnessList = ["New", "Old"];
  orderForm !: FormGroup;
  actionBtn: string = "Save";
  orderStatusList = ["Initiated","In-Process","Dispatched","Delivered"];

  constructor(private formBuilder: FormBuilder, 
    private api: ApiService, 
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      buyerName: ['', Validators.required],
      catalogName: ['', Validators.required],
      quantity : ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required],
      orderStatus: ['', Validators.required],
    });

    if(this.editData){
      this.actionBtn = "Update";
      this.orderForm.controls['buyerName'].setValue(this.editData.buyerName);
      this.orderForm.controls['catalogName'].setValue(this.editData.catalogName);
      this.orderForm.controls['freshness'].setValue(this.editData.freshness);
      this.orderForm.controls['price'].setValue(this.editData.price);
      this.orderForm.controls['comment'].setValue(this.editData.comment);
      this.orderForm.controls['date'].setValue(this.editData.date);
      this.orderForm.controls['quantity'].setValue(this.editData.quantity);
      this.orderForm.controls['orderStatus'].setValue(this.editData.orderStatus);
    }
  }

  addOrder() {
    if(!this.editData){
      if (this.orderForm.valid) {
        this.api.postOrder(this.orderForm.value)
          .subscribe({
            next: (res) => {
              this.orderForm.reset();
              this.dialogRef.close('save');
            },
            error: () => {
              alert("Error while adding Order.")
            }
          })
      }
    }else{
      this.updateOrder();
    }
  }

  updateOrder() {
    this.api.putOrder(this.orderForm.value, this.editData.id)
    .subscribe({
      next: (res) => {
        this.orderForm.reset();
        this.dialogRef.close('update');
      },
      error: () => {
        alert("Error while updating Order!!");
      }
    })
  }

}
