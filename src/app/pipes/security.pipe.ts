import { Pipe, PipeTransform } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'security'
})
export class SecurityPipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {

  }

  transform(url: string): unknown {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
