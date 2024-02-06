import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor(private toastrService: ToastrService) {}

  success(data: any) {
    this.toastrService.success(data.message || '', data.title || '', {
      timeOut: data.timeOut || 1000,
      progressBar: data.progressBarr || true,
    });
  }

  error(data: any) {
    let title = data?.title || data?.status + ' ' + data?.statusText || '';
    this.toastrService.error(data.message || '', title || '', {
      timeOut: data.timeOut || 2000,
      progressBar: data.progressBarr || true,
    });
  }
}
