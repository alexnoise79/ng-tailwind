import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgtButton, NgtNav, NgtNavItem, NgtToastContainer, NgtToggleSwitch } from '@ng-tailwind/ui-components';
import { ThemeConfiguratorComponent } from './components/theme-configurator/theme-configurator.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, NgtButton, NgtNav, NgtNavItem, NgtToastContainer, NgtToggleSwitch, ThemeConfiguratorComponent],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  isDarkMode = false;

  ngOnInit(): void {
    // Load saved preference or default to system preference
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      this.isDarkMode = saved === 'true';
    } else {
      this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    this.updateTheme();

    // Set default theme if not already set
    if (!document.documentElement.getAttribute('data-theme')) {
      const savedTheme = localStorage.getItem('theme') || 'default';
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }

  onToggleChange(): void {
    this.updateTheme();
    localStorage.setItem('darkMode', this.isDarkMode.toString());
  }

  private updateTheme(): void {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
