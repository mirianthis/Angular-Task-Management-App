import { Injectable } from "@angular/core";
import { Task } from "../../model/task.model";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root'})
export class TasksService {
  tasksChanged = new Subject<Task[]>();
  private tasks: Task[] = [
    new Task('Create an app', 1, false, false),
    new Task('Task Management', 2, false, false)
  ];

  getTasks(){
    return this.tasks.slice();
  }

  addTasks(tasks: Task) {
    tasks.id = this.tasks.length + 1;
    tasks.checkbox = false;
    this.tasks.push(tasks);
    this.tasksChanged.next(this.tasks.slice());
  }

  deleteTasks(index: number) {
    this.tasks.splice(index, 1);
    this.tasksChanged.next(this.tasks.slice());
  }
}