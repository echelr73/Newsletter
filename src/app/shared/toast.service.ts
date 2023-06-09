import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toast: ToastrService){}
  
  public logError(msg: any, showToast?: boolean, title?: string, log?: any, isAlways: boolean = false, timeout: number = 5000): void {
    if (title == null) title = 'Error';
    let message = msg;

    if (showToast) {
      if (msg.isSwaggerException) {
        message = msg.message;
      }

      if (msg instanceof (Error)) {
        message = msg.message;
      }

      if (msg instanceof (HttpErrorResponse)) {
        message = msg.message;
      }

      this.toast.toastrConfig.disableTimeOut = isAlways;

      this.toast.error(message, title, {timeOut: timeout});
    }
  }

  public showSuccessMessage(title: string, msg: string, isAlways: boolean = false): void {
    this.toast.toastrConfig.disableTimeOut = isAlways;
    this.toast.success(msg, title);
  }
}
