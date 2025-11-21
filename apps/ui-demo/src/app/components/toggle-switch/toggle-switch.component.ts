import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgtToggleSwitch } from '@ng-tailwind/ui-components';

@Component({
  selector: 'section.toggle-switch',
  imports: [NgtToggleSwitch, FormsModule],
  templateUrl: './toggle-switch.component.html'
})
export class ToggleSwitchDemoComponent {
  basicToggle = false;
  emailNotifications = true;
  pushNotifications = false;
  smsNotifications = true;
  disabledToggle = true;
}

