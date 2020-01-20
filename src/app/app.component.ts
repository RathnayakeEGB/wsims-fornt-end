import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  name = 'Angular';

  constructor(private spinner: NgxSpinnerService) {
  }

  ngOnInit() {

    this.showSpinner();
  }

  showSpinner() {
    this.spinner.show();
    setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
    }, 5000);
  }

}
