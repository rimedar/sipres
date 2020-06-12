import { Component, ElementRef, Renderer2, ViewChildren, QueryList, AfterViewInit, DoCheck, Inject } from '@angular/core';
import { SettingService } from '../../services/settings/setting.service';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements AfterViewInit, DoCheck  {
  // QueryList + @ViewChildren + ElementRef
  @ViewChildren('selector') allThemes: QueryList<ElementRef>;
  constructor(@Inject(DOCUMENT) private document,
              private renderer: Renderer2,
              private ajustesService: SettingService) {}

  ngDoCheck(): void {
      // se cambia el url elemento theme con render, no es necesario utilizar DOCUMENT
      // this.renderer.setAttribute(document.getElementById('theme'), 'href', this.ajustesService.ajustes.temaUrl);
  }

  ngAfterViewInit() {
    this.colocarCheck();
  }
  cambiarColor(tema: string, link: ElementRef) {
    this.applyCheck(link);
    this.ajustesService.aplicarTema(tema);
    // this.renderer.setAttribute(this.document.getElementById('theme'), 'href', this.ajustesService.ajustes.temaUrl);
  }
  private applyCheck( link: ElementRef ) {
    const theme: ElementRef = this.allThemes.find(ref => ref.nativeElement.classList.contains('working'));
    if (theme) {
      this.renderer.removeClass(theme.nativeElement, 'working' );
    }
    this.renderer.addClass( link, 'working' );
  }
  colocarCheck() {
    const tema = this.ajustesService.ajustes.tema;
    const theme: ElementRef = this.allThemes.find(ref => ref.nativeElement.getAttribute('data-theme') === tema);
    if (theme) {
      this.renderer.addClass(theme.nativeElement, 'working' );
    }
  }
}
