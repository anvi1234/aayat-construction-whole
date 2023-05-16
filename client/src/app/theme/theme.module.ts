import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbActionsModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSidebarModule,
  NbUserModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbThemeModule,
  NbFormFieldModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbSecurityModule } from '@nebular/security';

import {
  HeaderComponent,
  FooterComponent
} from './headercomponent'

// import {
//   CapitalizePipe,
//   PluralPipe,
//   RoundPipe,
//   TimingPipe,
//   NumberWithCommasPipe,
// } from './pipes';
import  {
  LoginLayoutComponent,
  OneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
} from './layouts';
// import { DEFAULT_THEME } from './styles/theme.default';
// import { COSMIC_THEME } from './styles/theme.cosmic';
// import { CORPORATE_THEME } from './styles/theme.corporate';
// import { DARK_THEME } from './styles/theme.dark';

const NB_MODULES = [
  NbLayoutModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbContextMenuModule,
  NbSecurityModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbEvaIconsModule,
  NbThemeModule,
  NbFormFieldModule
];
const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  LoginLayoutComponent,
  // SearchInputComponent,
  // TinyMCEComponent,
  OneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
];
// const PIPES = [
//   CapitalizePipe,
//   PluralPipe,
//   RoundPipe,
//   TimingPipe,
//   NumberWithCommasPipe,
// ];

@NgModule({
  declarations:[...COMPONENTS ],
  imports: [CommonModule,...NB_MODULES ],
  exports: [CommonModule,...COMPONENTS ],

  
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ThemeModule,
    //  providers: [
    //     NbThemeModule.forRoot()
        
    //   ],
    };
  }
}
