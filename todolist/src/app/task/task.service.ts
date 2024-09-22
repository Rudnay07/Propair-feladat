import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();
  private lastId = 0; // Nyomon követi az utolsó használt azonosítót

  constructor() {
    this.loadTasks();
  }

  private loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      const tasks: Task[] = JSON.parse(savedTasks);
      this.tasksSubject.next(tasks);
      this.lastId = tasks.length > 0 ? Math.max(...tasks.map((task: Task) => task.id)) : 0;
    }
  }

  public generateId(): number {
    this.lastId++;
    return this.lastId;
  }

  addTask(newTask: Task) {
    // Csak az új feladatot adjuk hozzá a meglévőkhöz, a többi feladat nem változik
    const tasks = [...this.tasksSubject.value, newTask];  // A meglévő feladatokat megtartjuk
    this.updateTasks(tasks);  // Frissítjük a feladatlistát, de nem érintjük a státuszt
  }
  

  updateTask(updatedTask: Task) {
    const tasks = this.tasksSubject.value.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    this.updateTasks(tasks);
  }

  deleteTask(id: number) {
    const tasks = this.tasksSubject.value.filter((task) => task.id !== id);
    this.updateTasks(tasks);
  }

  clearTasks() {
    this.tasksSubject.next([]);
    localStorage.removeItem('tasks');
  }

  private updateTasks(tasks: Task[]) {
    this.tasksSubject.next(tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}
