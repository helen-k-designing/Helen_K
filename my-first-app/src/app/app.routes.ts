import { Routes } from '@angular/router';
import { AboutComponent } from './about/about';
import { ContactsComponent } from './contacts/contacts';

export const routes: Routes = [
{ path: '', redirectTo: 'about', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: '**', redirectTo: 'about' }
];
