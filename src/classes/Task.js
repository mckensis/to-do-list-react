import { compareAsc, format, formatDistance, parseISO } from 'date-fns';
import {v4 as uuid} from 'uuid';

class Task {
  constructor(task) {
    this.owner = task.owner || null;
    this.title = task.title;
    this.dueDate = task.dueDate;
    this.priority = task.priority;
    this.complete = task.complete;
    this.overdue = task.overdue || false;
    this.id = task.id || uuid();
  }

  dueDateExact() {
    return parseISO(this.dueDate).toDateString();
  }

  dueDateInWords() {
    let date = formatDistance(parseISO(this.dueDate), parseISO(format(new Date(), 'yyyy-MM-dd')), {addSuffix: true});
    if (date === 'less than a minute ago') date = 'today';
    return date;
  }

  priorityInWords() {
    switch (this.priority) {
      case 0:
        return "Low";
      case 1:
        return "Default";
      case 2:
        return "Urgent";
      default:
        return "Default";
    }
  }

  isOverdue() {
    if (compareAsc(parseISO(format(new Date(), 'yyyy-MM-dd')), parseISO(this.dueDate)) === 1 && !this.complete) {
      this.overdue = true;
      return this.overdue;
    }
    return false;
  }

  isComplete() {
    return this.complete ? true : false;
  }

  // Can't change task priority if the task is complete
  changePriority() {
    if (this.complete) return;
    this.priority < 2 ? this.priority++ : this.priority = 0;
    console.log(this.priority);
  }

  saveIndex(index) {
    this.index = index;
  }

  returnIndex() {
    return this.index;
  }

  toggleComplete() {
    this.complete = !this.complete;
  }
}

export default Task;