import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TasksService } from '../tasks.service';
import { Task } from '../../../model/task.model';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css'
})
export class TaskEditComponent {
  @ViewChild('f', {static: false}) taskForm: NgForm;

  constructor(private tasksService: TasksService) {}


  onAdd(form: NgForm){
    const value = form.value;
    const newTask = new Task(value.name, 0, false, false);
    this.tasksService.addTasks(newTask);
    console.log(newTask);
    form.reset();
  }


}
