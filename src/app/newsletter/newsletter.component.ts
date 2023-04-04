/* import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Newsletter } from '../models/newsletter.model';
import { NewsletterService } from './services/newsletter.service';

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

  constructor( private http: HttpClient, private newsletterServices: NewsletterService ){}

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
    });
  }

  addClick(){
    this.modalTitle = "Add Newsletter";
    this.newsletterId = "";
    this.newsletterTitle = "";
    this.newsletterHtmlBody = "";
  }

  editClick(news: any){
    this.modalTitle = "Edit Newsletter";
    this.newsletterId = news.newsId;
    this.newsletterTitle = news.title;
    this.newsletterHtmlBody = news.htmlBody;
  }

  createClick(){
    let value = {
      title: this.newsletterTitle,
      htmlBody: this.newsletterHtmlBody
    }

    this.newsletterServices.create(value)
    .subscribe(res => {
      console.log("Res: ", res);
      if(res){alert("The object was created");}
      else{alert("There is an error");}
    
      this.refreshList();
    });
  }

  updateClick(){
    let value = {
      newsId: this.newsletterId,
      title: this.newsletterTitle,
      htmlBody: this.newsletterHtmlBody
    }

    this.newsletterServices.update(value)
    .subscribe(res => {
      if(res){alert("The object was updated");}
      else{alert("There is an error");}
        
      this.refreshList();
    });
  }

  deleteClick(id: any){
    if(confirm("Are you sure?")){

      this.newsletterServices.delete(id)
      .subscribe(res => {
        if(res){alert("The object was deleted");}
        else{alert("There is an error");}
          
        this.refreshList();
      });
    } 
  }
} */
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Newsletter } from '../models/newsletter.model';
import { NewsletterService } from './services/newsletter.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

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

  constructor(private newsletterServices: NewsletterService ){}

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

  editClick(news: any){
    this.modalTitle = "Edit Newsletter";
    this.newsletterId = news.newsId;
    this.newsletterTitle = news.title;
    this.newsletterHtmlBody = news.htmlBody;
  }

  createClick(){
    let value = {
      title: this.newsletterTitle,
      htmlBody: this.newsletterHtmlBody
    }

    this.newsletterServices.create(value)
      .pipe(
        catchError((error) => {
          console.error(error);
          alert('An error occurred while creating the newsletter.');
          return of(null);
        })
      )
      .subscribe(res => {
        if (res) {
          alert("The object was created");
        } else {
          alert("There is an error");
        }
        this.refreshList();
      });
  }

  updateClick(){
    let value = {
      newsId: this.newsletterId,
      title: this.newsletterTitle,
      htmlBody: this.newsletterHtmlBody
    }

    this.newsletterServices.update(value)
      .pipe(
        catchError((error) => {
          console.error(error);
          alert('An error occurred while updating the newsletter.');
          return of(null);
        })
      )
      .subscribe(res => {
        if (res) {
          alert("The object was updated");
        } else {
          alert("There is an error");
        }
        this.refreshList();
      });
  }

  deleteClick(id: any){
    if(confirm("Are you sure?")){
      this.newsletterServices.delete(id)
        .pipe(
          catchError((error) => {
            console.error(error);
            alert('An error occurred while deleting the newsletter.');
            return of(null);
          })
        )
        .subscribe(res => {
          if (res) {
            alert("The object was deleted");
          } else {
            alert("There is an error");
          }
          this.refreshList();
        });
    } 
  }
}
