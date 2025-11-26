import { Directive, inject, Input, OnInit, PLATFORM_ID, TemplateRef, ViewContainerRef } from '@angular/core';

/**
 * A directive that conditionally renders content based on the current platform (browser or server).
 * This is useful for server-side rendering (SSR) scenarios where certain content should only be rendered
 * on the server or in the browser.
 */
@Directive({
  selector: '[ssrRender]'
})
export class SsrRenderDirective<T> implements OnInit {

  /**
   * Specifies the platform on which the content should be rendered.
   * @param {'browser' | 'server'} ssrRender - The target platform for rendering.
   */
  @Input()
  ssrRender: 'browser' | 'server' = 'browser';

  /**
   * Creates an instance of SsrRenderDirective.
   * @param platformId - The current platform ID ('browser' or 'server').
   * @param viewContainer - The view container to manage the rendered content.
   * @param templateRef - The template reference containing the content to be conditionally rendered.
   */
    //*constructor(@Inject(PLATFORM_ID) private platformId: 'browser' | 'server', private viewContainer: ViewContainerRef, private templateRef: TemplateRef<T>) {
    //}*/
  private platformId: 'browser' | 'server' = inject<'browser' | 'server'>(PLATFORM_ID);
  private viewContainer = inject(ViewContainerRef);
  private templateRef = inject(TemplateRef<T>);

  /**
   * It determines whether to render the content based on the current platform and the specified ssrRender value.
   */
  ngOnInit() {
    if (this.platformId === this.ssrRender) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}
