import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../task/task.service';
import { Task } from '../../task/task.model';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api'; 

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule, CommonModule, MenubarModule],
  templateUrl: './new-task-component.component.html',
  styleUrls: ['./new-task-component.component.css']
})
export class NewTaskComponent implements OnInit {
  taskForm: FormGroup;
  items: MenuItem[] = []; 

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      status: ['todo']  // Az új feladat státusza mindig 'todo'
    });
  }

  ngOnInit() {
    this.items = [
      {
        label: 'TODOS',
        icon: 'pi pi-briefcase',
        items: [
          {
            label: 'TODO-LIST',
            icon: 'pi pi-cog',
            routerLink: '/'
          },
          {
            label: 'NEW TODO',
            icon: 'pi pi-th-large',
            routerLink: '/new-task'
          }
        ]
      }
    ];
  }
  onSubmit() {
    if (this.taskForm.valid) {
      const newTask: Task = {
        ...this.taskForm.value,
        id: this.taskService.generateId(),  // Egyedi azonosító generálása
        status: 'todo'  // Csak az új feladat státusza lesz 'todo'
      };
  
      this.taskService.addTask(newTask);  // Csak az új feladatot adjuk hozzá, a régieket nem érintjük
      this.taskForm.reset({ status: 'todo' });  // Az űrlap resetelése, a státusz 'todo' marad
    }
  }
  
}
