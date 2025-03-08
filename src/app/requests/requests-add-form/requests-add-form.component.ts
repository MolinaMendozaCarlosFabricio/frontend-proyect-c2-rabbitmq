import { Component, OnInit } from '@angular/core';
import { Requests } from '../../models/request';
import { RequestsService } from '../../services/requests.service';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { Acquire } from '../../models/acquire';

@Component({
  selector: 'app-requests-add-form',
  templateUrl: './requests-add-form.component.html',
  styleUrl: './requests-add-form.component.css'
})
export class RequestsAddFormComponent implements OnInit {
  new_request: Requests = {
    ID: 0,
    Id_user: 1,
    Id_status: 3,
    Date_request: new Date
  }
  new_id: number = 0;

  product_list: Product[] = [];

  acquires: Acquire[] = [];

  constructor(private requestServices: RequestsService, private productServices: ProductsService){}

  ngOnInit(): void {
      this.productServices.getProducts().subscribe(
        response => {
          console.log("Respuesta correcta del servidor")
          this.product_list = response.Results
        },
        error => console.log("Error:", error)
      )
  }

  create(){
    console.log("Creando pedido")
    this.requestServices.createRequest(this.new_request).subscribe(
      response => {
        console.log("Respuesta del servidor:", response);
        this.new_id = response.Results[0]
      },
      error => console.log("Error:", error)
    )

    console.log("ID del pedido:", this.new_id)

    for(let i = 0; i < this.acquires.length; i++){
      this.acquires[i].Id_request = this.new_id;
      this.requestServices.addProductToRequest(this.acquires[i]).subscribe(
        response => console.log("Respuesta del servidor:", response),
        error => console.log("Error:", error)
      )
    }

    this.new_request = {
      ID: 0,
      Id_user: 1,
      Id_status: 3,
      Date_request: new Date
    }

    this.new_id = 0
  }

  addProduct(id_product: number){
    let new_acquire: Acquire = {
      Id_product: id_product,
      Id_request: 0,
      Quantity: 1
    };

    console.log("Agregando producto")

    this.acquires.push(new_acquire)
  }
}
