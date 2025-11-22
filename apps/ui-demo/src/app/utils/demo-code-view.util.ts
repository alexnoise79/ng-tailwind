import { signal, WritableSignal } from '@angular/core';

/**
 * Utility class for managing demo code view state
 * Handles toggling between showcase and code views, and managing code tabs
 */
export class DemoCodeViewUtil {
  // View mode for each demo section (showcase or code)
  demoViewMode: WritableSignal<Record<string, 'showcase' | 'code'>>;
  
  // Active code tab for each demo (html or ts)
  activeCodeTab: WritableSignal<Record<string, 'html' | 'ts'>>;

  constructor(
    initialViewModes: Record<string, 'showcase' | 'code'>,
    initialCodeTabs: Record<string, 'html' | 'ts'>
  ) {
    this.demoViewMode = signal(initialViewModes);
    this.activeCodeTab = signal(initialCodeTabs);
  }

  /**
   * Toggle between showcase and code view for a specific demo
   */
  toggleDemoView(demoKey: string): void {
    const current = this.demoViewMode();
    this.demoViewMode.set({
      ...current,
      [demoKey]: current[demoKey] === 'showcase' ? 'code' : 'showcase'
    });
  }

  /**
   * Set the active code tab (html or ts) for a specific demo
   */
  setActiveCodeTab(demoKey: string, tab: 'html' | 'ts'): void {
    const current = this.activeCodeTab();
    this.activeCodeTab.set({
      ...current,
      [demoKey]: tab
    });
  }

  /**
   * Check if a demo is currently showing code view
   */
  isShowingCode(demoKey: string): boolean {
    return this.demoViewMode()[demoKey] === 'code';
  }

  /**
   * Get the active code tab for a specific demo
   */
  getActiveCodeTab(demoKey: string, defaultTab: 'html' | 'ts' = 'html'): 'html' | 'ts' {
    return this.activeCodeTab()[demoKey] || defaultTab;
  }

  /**
   * Get tab file name based on demo key and component name
   */
  getTabFileName(
    componentName: string,
    demoKey: string,
    fileType: 'html' | 'ts',
    customFileNames?: Record<string, Record<'html' | 'ts', string>>
  ): string {
    if (customFileNames && customFileNames[demoKey]?.[fileType]) {
      return customFileNames[demoKey][fileType];
    }
    return `${componentName}-${demoKey}.${fileType}`;
  }

  /**
   * Get code snippet for a specific tab
   * Handles both string snippets and object snippets with html/ts properties
   */
  getCodeSnippet(
    codeSnippets: Record<string, string | { html: string; ts: string }>,
    demoKey: string,
    fileType: 'html' | 'ts'
  ): string {
    const snippet = codeSnippets[demoKey];
    
    if (!snippet) {
      return '';
    }

    // If snippet is an object with html/ts properties
    if (typeof snippet === 'object' && 'html' in snippet && 'ts' in snippet) {
      return snippet[fileType] || '';
    }

    // If snippet is a string, return it (for single-tab demos)
    if (typeof snippet === 'string') {
      return snippet;
    }

    return '';
  }
}

