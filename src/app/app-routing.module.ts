import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

// ✅ Note: you probably could have used this file a bit more, using the benefits of routing definition to your
// advantage and combining the routes defined here with the routes in the file system 
