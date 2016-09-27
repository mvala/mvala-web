import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServerInfoService } from './shared/server-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ServerInfoService]
})
export class AppComponent {
  title = 'app works!';
  connection: any;
  info: any;

  constructor(private appInfoService: ServerInfoService) {
    this.info = { version: '', user_count: 0 };
  }

  ngOnInit() {
    this.connection = this.appInfoService.getInfo().subscribe(info => {
      this.info = info;
    });
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
