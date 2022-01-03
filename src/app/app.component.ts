import { Component, VERSION } from '@angular/core';
import { LoggerService } from './shared/logger.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;

  constructor(private logger: LoggerService) {}

  clicked(level: number): void {
    if (level === 0) {
      this.logger.info('button with blue color clicked');
    } else if (level === 1) {
      this.logger.warn('button with orange color clicked');
    } else {
      this.logger.error('button with red color clicked');
    }
  }
}
