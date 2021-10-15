import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

interface Apod {
  copyright?: string;
  date: Date;
  explanation: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
  hdurl?: string;
}

const key = 'ZJwrzAUjoqgPhOYDalQbvJ2epanow6vmvYX4yAOg';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private http: HttpClient) {}

  range = new FormGroup({
    start: new FormControl(new Date()),
    end: new FormControl(new Date()),
  });

  reload() {
    this.http
      .get<Apod[]>(
        `https://api.nasa.gov/planetary/apod?api_key=${key}&start_date=${this.range.value?.start?.toLocaleDateString(
          'en-CA'
        )}&end_date=${this.range.value?.end?.toLocaleDateString('en-CA')}`
      )
      .subscribe((data) => {
        this.apods = data;
      });
  }

  ngOnInit() {
    this.reload();
  }
  apods: Apod[] = [];
}
