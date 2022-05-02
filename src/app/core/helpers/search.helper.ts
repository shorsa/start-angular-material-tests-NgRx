import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class SearchHelper {
  private searchSubject: Subject<string>;

  constructor() {
    this.searchSubject = new Subject();
    this.setSearchSubscription();
  }

  searchNext(inputValue: string): void {
    this.searchSubject.next(inputValue);
  }

  setSearchSubscription(): Observable<string> {
    return this.searchSubject.pipe(
      debounceTime(1000),
      switchMap(emittedValue => emittedValue.trim()),
      distinctUntilChanged()
    );
  }
}
