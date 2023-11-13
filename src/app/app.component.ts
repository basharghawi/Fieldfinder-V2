import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '@core/layout/footer/footer.component';
import { HeaderComponent } from '@core/layout/header/header.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FooterComponent, HeaderComponent],
  template: `
    <header-layout></header-layout>
    <router-outlet></router-outlet>
    <footer-layout></footer-layout>
  `,
  styles: [],
})
export class AppComponent {
}
