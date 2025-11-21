import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgtButton, NgtNav, NgtNavItem, NgtToastContainer } from '@ng-tailwind/ui-components';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgtButton, NgtNav, NgtNavItem, NgtToastContainer],
  templateUrl: './app.component.html'
})
export class AppComponent {}
