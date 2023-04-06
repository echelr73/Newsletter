import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Newsletter } from '../models/newsletter.model';
import { NewsletterService } from './services/newsletter.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from '../shared/toast.service';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})

export class NewsletterComponent implements OnInit{

  newsletters: Newsletter[] = [];
  modalTitle = "";
  newsletterId = "";
  newsletterTitle = "";
  newsletterHtmlBody = "";

  constructor(private newsletterServices: NewsletterService, private toastMessage: ToastService){}

  ngOnInit(): void{
    this.refreshList();
  }

  refreshList(){
    this.newsletterServices.getAll()
      .subscribe((data: Newsletter[]) => {
        this.newsletters = data.map((item) => {
          return {
            newsId: item.newsId,
            title: item.title,
            htmlBody: item.htmlBody
          }
        });
      }, error => {
        console.error(error);
        alert('An error occurred while retrieving newsletters.');
      });
  }

  addClick(){
    this.modalTitle = "Add Newsletter";
    this.newsletterId = "";
    this.newsletterTitle = "";
    this.newsletterHtmlBody = "";
  }

  createClick(){
    let value = {
      title: this.newsletterTitle,
      htmlBody: this.newsletterHtmlBody
    }

    this.newsletterServices.create(value)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          alert(error.error.error);
          return of(null);
        })
      )
      .subscribe(res => {
        if (res) {
          alert("The object was created");
        }
        this.refreshList();
      });
  }

  deleteClick(id: any){
    if(confirm("Are you sure?")){
      this.newsletterServices.delete(id)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 400) {
              this.toastMessage.logError(error.error.error, true);
            }
            return of(null);
          })
        )
        .subscribe(res => {
          if (res) {
            this.toastMessage.showSuccessMessage("Succes", "The object was deleted");
          }
          this.refreshList();
        });
    } 
  }
}
