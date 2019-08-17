import { NgModule } from "@angular/core";
import { NbCardModule, NbSelectModule } from "@nebular/theme";

import { ThemeModule } from "../../@theme/theme.module";
import { DashboardComponent } from "./dashboard.component";
import { ChartsModule } from "ng2-charts";
import { DashboardService } from "./dashboard.service";

@NgModule({
  imports: [NbCardModule, ThemeModule, ChartsModule, NbSelectModule],
  declarations: [DashboardComponent],
  providers: [DashboardService]
})
export class DashboardModule {}
