import { NgtToastService } from '@ng-tailwind/ui-components';

/**
 * Copies text to clipboard and shows a success toast notification
 * @param text - The text to copy to clipboard
 * @param toastService - The toast service instance to show the notification
 * @returns Promise that resolves when copy is complete
 */
export async function copyToClipboard(
  text: string,
  toastService: NgtToastService
): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
    toastService.show({
      severity: 'success',
      summary: 'Copied!',
      detail: 'Code copied to clipboard',
      delay: 2000
    });
  } catch (err) {
    console.error('Failed to copy:', err);
    toastService.show({
      severity: 'danger',
      summary: 'Error',
      detail: 'Failed to copy to clipboard',
      delay: 3000
    });
  }
}

