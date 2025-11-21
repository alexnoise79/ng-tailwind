import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgtButton, NgtNav, NgtNavItem } from '@ng-tailwind/ui-components';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgtButton, NgtNav, NgtNavItem],
  templateUrl: './app.component.html'
})
export class AppComponent {}
