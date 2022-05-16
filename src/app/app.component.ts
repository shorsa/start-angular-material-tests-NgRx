import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';
import { clearError } from './core/store/errors/error.actions';
import { selectErrors } from './core/store/errors/error.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Angular-Material-NgRx';

  constructor(private store$: Store, private toastr: ToastrService) {
    this.handleAppErrors();
  }

  private handleAppErrors(): void {
    this.store$
      .select(selectErrors)
      .pipe(filter((res) => res.isError && res.isToasterError))
      .subscribe((res) => {
        this.toastr.error(res.errorMessage, 'Error !!!');
        this.store$.dispatch(clearError());
      });
  }
}
