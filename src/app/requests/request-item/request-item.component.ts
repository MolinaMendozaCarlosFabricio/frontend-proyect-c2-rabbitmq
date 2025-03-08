import { Component, Input, OnInit } from '@angular/core';
import { Requests } from '../../models/request';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { RequestWhitStatus } from '../../models/request-whit-status';

@Component({
  selector: 'app-request-item',
  templateUrl: './request-item.component.html',
  styleUrl: './request-item.component.css'
})
export class RequestItemComponent implements OnInit {
  @Input() request: RequestWhitStatus = {
    ID: 0,
    Date_request: new Date,
    Id_user: 0,
    Status: "Pendiente"
  };

  products: Product[] = [];

  constructor(private productsServices: ProductsService){}

  ngOnInit(): void {
    this.productsServices.getProductsOfRequest(this.request.ID).subscribe(
      response => {
        console.log("Respuesta correcta del servidor")
        this.products = response.Results
      },
      error => console.log("Error:", error)
    )
  }
}
