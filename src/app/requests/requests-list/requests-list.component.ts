import { Component, OnInit } from '@angular/core';
import { Requests } from '../../models/request';
import { RequestsService } from '../../services/requests.service';
import { catchError, interval, of, startWith, Subscription, switchMap } from 'rxjs';
import { RequestWhitStatus } from '../../models/request-whit-status';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrl: './requests-list.component.css'
})
export class RequestsListComponent implements OnInit{
  request_list: RequestWhitStatus[] = [];
  isLoading: boolean = true;
  private pollingSubscription!: Subscription;

  constructor(private requestServices: RequestsService){}

  ngOnInit(): void {

    this.requestServices.getRequestsMine(1).subscribe({
      next: (response) => {
        console.log('✅ Prueba directa:', response);
        this.request_list = response.Results
      },
      error: (err) => console.error('❌ Error directo:', err),
    });
    
    //this.startPolling()
  }

  startPolling() {
    this.isLoading = true;
    this.pollingSubscription = interval(5000).pipe(
      startWith(0),
      switchMap(() => {
        console.log('Realizando petición...');
        return this.requestServices.getRequestsMine(1);
      }),
      catchError((error) => {
        console.error('Error en la petición:', error);
        return of({ Results: [] });
      })
    ).subscribe({
      next: (response) => {
        console.log('Respuesta recibida:', response);
        this.isLoading = false;
        this.request_list = response.Results ?? [];
      },
      error: (error) => console.error('Error en polling:', error),
    });
  }
  
  ngOnDestroy(): void {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }
}
