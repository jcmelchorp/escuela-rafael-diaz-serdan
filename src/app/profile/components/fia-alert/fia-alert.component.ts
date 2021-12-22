import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertComponent } from 'ngx-bootstrap/alert';

@Component({
  selector: 'app-fia-alert',
  templateUrl: './fia-alert.component.html',
  styleUrls: ['./fia-alert.component.scss']
})
export class FiaAlertComponent implements OnInit {
  dismissible: boolean = true;
  alertPlaceholder = document.getElementById('liveAlertPlaceholder')
  alertTrigger = document.getElementById('liveAlertBtn')
  alerts: any[] = [{
    type: 'success',
    msg: `Los invitamos a contestar la Ficha Individual Acumulativa, haciendo click <a href=\"http://rds.edu.mx/historial\" target=\"_blank\">aquí.</a>`,
    timeout: 5000
  }];
  constructor(sanitizer: DomSanitizer) {
    this.alerts = this.alerts.map((alert: any) => ({
      type: alert.type,
      msg: sanitizer.sanitize(SecurityContext.HTML, alert.msg)
    }));
  }
  ngOnInit(): void {
  }
  alert(message, type) {
    var wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible fade show" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

    this.alertPlaceholder.append(wrapper)
  }
  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }
  /*  if(alertTrigger) {
     alertTrigger.addEventListener('click', () => {
       alert('Nice, you triggered this alert message!', 'success')
     })
   } */
}
