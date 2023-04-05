import { Component, OnInit } from '@angular/core';
import { Newsletter } from '../models/newsletter.model';
import { NewsletterService } from '../newsletter/services/newsletter.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  newsletters: Newsletter[] = [];
  newsletter: Newsletter = {newsId:"",title:"",htmlBody:""};
  modalTitle = "";
  newsletterId = "";
  newsletterTitle = "";
  newsletterHtmlBody = "";
  newsletterEdit : any;
  showButtonUpdate: boolean = false;
  
  constructor(private newsletterServices: NewsletterService ){
  }
  
  ngOnInit(): void{ 
  }

  searchNewsletter(){
    if(this.newsletterId != ""){
      this.deleteElement();
      this.newsletterServices.get(this.newsletterId)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        alert(error.error.error);
        this.newsletterId="";
        return of(null);
      })
    )
    .subscribe((res: Newsletter) => {
      this.newsletter = res;
      this.showButtonUpdate = true;
      this.crearDiv();
    });
    } 
  }

  crearDiv() {
    const container = document.getElementById("container");
    
    if (!container) {
      console.error("Container element not found.");
      return;
    }
  
    const div = document.createElement("div");
    div.id = "card";
    div.classList.add("card"); // Agrega la clase 'card' al div

    const header = document.createElement("h5");
    header.id = "card-header";
    header.classList.add("card-header"); // Agrega la clase 'card-header' al h5
    header.textContent = this.newsletter.title;

    const body = document.createElement("div");
    body.id = "card-body";
    body.classList.add("card-body"); // Agrega la clase 'card-body' al div
    body.textContent = this.newsletter.htmlBody;

    // Agrega los elementos creados como hijos de los elementos correspondientes
    div.appendChild(header);
    div.appendChild(body);
    container.appendChild(div);

    }

    addClick(){
      this.modalTitle = "Add Newsletter";
      this.newsletter.newsId = "";
      this.newsletter.title = "";
      this.newsletter.htmlBody = "";
    }

    editClick(){
      this.searchNewsletter();
      this.modalTitle = "Edit Newsletter";
      this.newsletterId = this.newsletter.newsId;
      this.newsletterTitle = this.newsletter.title;
      this.newsletterHtmlBody = this.newsletter.htmlBody;
    }

    createClick(){
      let value = {
        title: this.newsletter.title,
        htmlBody: this.newsletter.htmlBody
      }
  
      this.newsletterServices.create(value)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            alert(error.error.error);
            this.deleteElement();
            return of(null);
          })
        )
        .subscribe(res => {
          if (res) {
            alert("The object was created");
            this.deleteElement();
          }
        });
    }
  
    updateClick(){
      let value = {
        newsId: this.newsletter.newsId,
        title: this.newsletter.title,
        htmlBody: this.newsletter.htmlBody
      }
  
      this.newsletterServices.update(value)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            alert(error.error.error);
            this.deleteElement();
            return of(null);
          })
        )
        .subscribe(res => {
          if (res) {
            alert("The object was updated");
            this.deleteElement();
          }
        });
    }

  deleteElement(){
    var elementCard = document.getElementById('card');
    elementCard ? elementCard.remove() : "";
    var elementCardHeader = document.getElementById('card-header');
    elementCardHeader ? elementCardHeader.remove() : "";
    var elementCardBody = document.getElementById('card-body');
    elementCardBody ? elementCardBody.remove() : "";
    this.showButtonUpdate = false;
  }
}
