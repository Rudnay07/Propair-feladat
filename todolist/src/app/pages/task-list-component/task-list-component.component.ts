import { Component, OnInit } from '@angular/core';
import { Task } from '../../task/task.model';
import { TaskService } from '../../task/task.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list-component',
  standalone: true,
  imports: [CommonModule, DragDropModule, FormsModule],
  templateUrl: './task-list-component.component.html',
  styleUrls: ['./task-list-component.component.css']
})
export class TaskListComponentComponent implements OnInit {
  tasks: Task[] = [];
  todoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  completedTasks: Task[] = [];
  selectedTask: Task | null = null;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
      this.filterTasks();
    });
  }

  openTaskDetails(task: Task) {
    this.selectedTask = task;
  }

  closeModal() {
    this.selectedTask = null;
  }

  filterTasks() {
    this.todoTasks = this.tasks.filter(task => task.status === 'todo');
    this.inProgressTasks = this.tasks.filter(task => task.status === 'in-progress');
    this.completedTasks = this.tasks.filter(task => task.status === 'completed');
  }

  saveTask(task: Task) {
    this.taskService.updateTask(task);
    this.selectedTask = null; // Bezárja a szerkesztőmezőt
  }

  editDescription(task: Task) {
    const newDescription = prompt('Edit Description:', task.description);
    if (newDescription !== null) {
      task.description = newDescription;
      this.taskService.updateTask(task);
    }
  }

  drop(event: CdkDragDrop<Task[]>) {
    const draggedTask = event.item.data;

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const newStatus = event.container.id === 'todoList' ? 'todo' :
                        event.container.id === 'inProgressList' ? 'in-progress' :
                        event.container.id === 'doneList' ? 'completed' : null;

      if (newStatus) {
        const taskToUpdate = this.tasks.find(task => task.id === draggedTask.id);
        if (taskToUpdate) {
          this.updateTaskStatus(taskToUpdate, newStatus);
        }
      }

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
  }

  updateTaskStatus(task: Task, newStatus: string) {
    task.status = newStatus as 'todo' | 'in-progress' | 'completed';
    this.taskService.updateTask(task);
  }

  trackByFn(index: number, item: Task): number {
    return item.id; // Assuming each task has a unique id
  }

  clearLocalStorage() {
    this.taskService.clearTasks();
  }
}
