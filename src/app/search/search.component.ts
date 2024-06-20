import { NgFor } from '@angular/common';
import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewChild,
  ElementRef,
  OnInit,
} from '@angular/core';
import { FormsModule, ValueChangeEvent } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { debounceTime, Subject } from 'rxjs';
import { NotFoundSearchComponent } from '../not-found-search/not-found-search.component';
import { LOCATION } from '../../types';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatIconModule, FormsModule, NgFor, NotFoundSearchComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  searchInput = new Subject<string>();
  showResult = false;
  @Input() loading = false;
  @Output() searchLocationEvent = new EventEmitter<string>();
  @Output() selectedLocationEvent = new EventEmitter<LOCATION>();
  @Input() SearchResult: LOCATION[] = [];
  @Input() error = false;
  @ViewChild('parentDiv') parentDiv!: ElementRef;

  constructor() {
    this.searchInput.pipe(debounceTime(300)).subscribe((search: string) => {
      if (!search) return;
      this.searchLocationEvent.emit(search);
    });
  }

  handleSubmt(event: SubmitEvent) {
    event.preventDefault();
  }
  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    let search = target.value;
    this.searchInput.next(search);
  }
  onFocus() {
    this.showResult = true;
    console.log('hello');
  }
  onBlur() {
    this.showResult = false;
  }
  handleSelect(selected: LOCATION) {
    this.selectedLocationEvent.emit(selected);
    this.parentDiv.nativeElement.blur();
  }
}
