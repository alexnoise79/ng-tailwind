import { Component, OnInit, signal, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LocalStorage } from '@universal/universal.providers';

export type ThemeName = 'default' | 'cyberpunk' | 'minimalist' | 'nature' | 'tech' | 'elegant';

@Component({
  selector: 'app-theme-configurator',
  imports: [],
  templateUrl: './theme-configurator.component.html',
  styleUrls: ['./theme-configurator.component.css']
})
export class ThemeConfiguratorComponent implements OnInit {
  isOpen = signal(false);
  currentTheme = signal<ThemeName>('default');
  private document = inject(DOCUMENT);
  private localStorage = inject(LocalStorage);

  themes: Array<{ name: ThemeName; label: string; description: string }> = [
    { name: 'default', label: 'Default', description: 'Original blue theme' },
    { name: 'cyberpunk', label: 'Cyberpunk', description: 'Neon purple and pink' },
    { name: 'minimalist', label: 'Minimalist', description: 'Clean black and white' },
    { name: 'nature', label: 'Nature', description: 'Green and earth tones' },
    { name: 'tech', label: 'Tech', description: 'Blue and cyan' },
    { name: 'elegant', label: 'Elegant', description: 'Purple and gold' }
  ];

  ngOnInit(): void {
    const saved = this.localStorage.getItem('theme');
    if (saved && this.themes.some(t => t.name === saved)) {
      this.currentTheme.set(saved as ThemeName);
    }
    this.applyTheme(this.currentTheme());
  }

  toggle(): void {
    this.isOpen.set(!this.isOpen());
  }

  selectTheme(theme: ThemeName): void {
    this.currentTheme.set(theme);
    this.applyTheme(theme);
    this.localStorage.setItem('theme', theme);
  }

  private applyTheme(theme: ThemeName): void {
    this.document.documentElement.setAttribute('data-theme', theme);
  }
}
