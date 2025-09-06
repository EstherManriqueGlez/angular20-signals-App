import {
  Component,
  computed,
  effect,
  inject,
  Injector,
  signal,
} from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { Course, sortCoursesBySeqNo } from '../models/course.model';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { CoursesCardListComponent } from '../courses-card-list/courses-card-list.component';
import { MatDialog } from '@angular/material/dialog';
import { MessagesService } from '../messages/messages.service';
import { catchError, from, throwError } from 'rxjs';
import {
  toObservable,
  toSignal,
  outputToObservable,
  outputFromObservable,
} from '@angular/core/rxjs-interop';

@Component({
  selector: 'home',
  standalone: true,
  imports: [MatTabGroup, MatTab, CoursesCardListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  // Signals with numbers
  count = signal(0);

  increment() {
    this.count.update((current) => current + 1);
  }

  decrement() {
    this.count.update((current) => current - 1);
  }

  // Signals with arrays
  values = signal<number[]>([0]);

  append() {
    this.values.update((current) => [
      ...current,
      current[current.length - 1] + 1,
    ]);
  }

  // Computed signals
  counter = signal(0);

  tenXConunter = computed(() => {
    const value = this.counter();

    return value * 10;
  });

  hundredXCounter = computed(() => {
    const value1 = this.tenXConunter();

    return value1 * 10;
  });

  increment1() {
    this.counter.update((value) => value + 1);
  }

//   Side effect in signals (They are pure side effects).
  counter2 = signal(0);

  constructor(){
    effect(() => {
        console.log(`Counter2 value: ${this.counter2()}`);
    });
  }

  increment2() {
    this.counter2.update((value) => value + 1);
  }
}
