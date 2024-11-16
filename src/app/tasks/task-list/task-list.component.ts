import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TasksService } from './tasks.service';
import { Task } from '../../model/task.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit, OnDestroy {
  
  tasks:Task[] = [];
  private subscription: Subscription;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
      this.tasks = this.tasksService.getTasks();
      this.subscription = this.tasksService.tasksChanged.subscribe(
        (tasks: Task[]) => {
          this.tasks = tasks;
        }
      )
  }

  onDelete(index: number){
    this.tasksService.deleteTasks(index);
    this.updateTaskIds();
  }

  onCheck(index: number) {
    console.log(this.tasks[index].checkbox);
    this.tasks[index].checkbox = !this.tasks[index].checkbox;
  }

  onEdit(index: number) {
    this.tasks[index].isEditing = true;
  }

  onSave(index: number) {
    this.tasks[index].isEditing = false;
  }

  updateTaskIds() {
    this.tasks.forEach((task, index) => {
      task.id = index + 1;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
