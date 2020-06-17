import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { AuthGuard } from './authorization/authGuard/auth-guard';
import { PortadaComponent } from './jsViews/portada/portada/portada.component';
import { UserComponent } from './jsViews/user/user/user.component';
import { UserRoleComponent } from './jsViews/userRole/user-role/user-role.component';
import { RoleComponent } from './jsViews/role/role/role.component';
import { ConfigurationParameterComponent } from './jsViews/configurationParameter/configuration-parameter/configuration-parameter.component';
import { PersonTypeComponent } from './jsViews/personType/person-type/person-type.component';
import { AccompanimentInstrumentComponent } from './jsViews/domain/accompanimentInstrument/accompaniment-instrument/accompaniment-instrument.component';
import { RegionalComponent } from './jsViews/domain/regional/regional/regional.component';
import { DistrictComponent } from './jsViews/domain/district/district.component';
import { EducativeCenterComponent } from './jsViews/domain/educativeCenter/educative-center/educative-center.component';
import { TandaComponent } from './jsViews/domain/tanda/tanda/tanda.component';
import { GradeComponent } from './jsViews/domain/grade/grade/grade.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '404',
    canActivate: [AuthGuard],
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    canActivate: [AuthGuard],
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: DefaultLayoutComponent,
    data: {
      
    },
    children: [
      {
        path: 'base',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
      },
      {
        path: 'buttons',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule)
      },
      {
        path: 'charts',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/chartjs/chartjs.module').then(m => m.ChartJSModule)
      },
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'icons',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
      },
      {
        path: 'notifications',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule)
      },
      {
        path: 'theme',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/theme/theme.module').then(m => m.ThemeModule)
      },
      {
        path: 'widgets',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/widgets/widgets.module').then(m => m.WidgetsModule)
      },
      {
        path: 'portada',
        canActivate: [AuthGuard],
        component: PortadaComponent,
        data: {
          title: 'Portada'
        }
      },
      {
        path: 'user',
        canActivate: [AuthGuard],
        component: UserComponent,
        data: {
          title: 'Usuarios'
        }
      },
      {
        path: 'userRole',
        canActivate: [AuthGuard],
        component: UserRoleComponent,
        data: {
          title: 'Asignar rol'
        }
      },
      {
        path: 'role',
        canActivate: [AuthGuard],
        component: RoleComponent,
        data: {
          title: 'Mantenimiento de roles'
        }
      },
      {
        path: 'configuration-parameter',
        canActivate: [AuthGuard],
        component: ConfigurationParameterComponent,
        data: {
          title: 'Mantenimiento de parámetros de configuraciones del sistema'
        }
      },
      {
        path: 'person-type',
        canActivate: [AuthGuard],
        component: PersonTypeComponent,
        data: {
          title: 'Mantenimiento de tipos de personas'
        }
      },

      //domain
      {
        path: 'accompaniment-instrument',
        canActivate: [AuthGuard],
        component: AccompanimentInstrumentComponent,
        data: {
          title: 'Instrumento de Acompañamiento'
        }
      },
      {
        path: 'regional',
        canActivate: [AuthGuard],
        component: RegionalComponent,
        data: {
          title: 'Regionales'
        }
      },
      {
        path: 'district',
        canActivate: [AuthGuard],
        component: DistrictComponent,
        data: {
          title: 'Distritos'
        }
      },
      {
        path: 'educative-center',
        canActivate: [AuthGuard],
        component: EducativeCenterComponent,
        data: {
          title: 'Centros Educativos'
        }
      },
      {
        path: 'tanda',
        canActivate: [AuthGuard],
        component: TandaComponent,
        data: {
          title: 'Tandas'
        }
      },
      {
        path: 'grade',
        canActivate: [AuthGuard],
        component: GradeComponent,
        data: {
          title: 'Grados'
        }
      }

    ]
  },
  { path: '**', 
  canActivate: [AuthGuard], 
  component: P404Component 
  }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
  
}
