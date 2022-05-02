import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { selectErrors } from './core/store/errors/error.selectors';
import { clearError } from './core/store/errors/error.actions';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular-Material-NgRx';

  constructor(
    private store$: Store,
    private toastr: ToastrService
  ) {
    this.handleAppErrors();
  }

  private handleAppErrors(): void {
    this.store$.select(selectErrors)
      .pipe(
        filter(res => res.isError && res.isToasterError)
      ).subscribe(res => {
        this.toastr.error(res.errorMessage, "Error !!!");
        this.store$.dispatch(clearError());
      })

  }
}
