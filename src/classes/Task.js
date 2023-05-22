import { compareAsc, format, formatDistance, parseISO } from 'date-fns';
import {v4 as uuid} from 'uuid';

class Task {
  constructor(task) {
    this.owner = task.owner || null;
    this.title = task.title;
    this.dueDate = task.dueDate;
    this.priority = task.priority || 1;
    this.complete = task.complete || false;
    this.overdue = this.isOverdue();
    this.id = task.id || uuid();
  }

  describeDueDateExact() {
    return parseISO(this.dueDate).toDateString();
  }

  describeDueDateSimple() {
    let date = formatDistance(parseISO(this.dueDate), parseISO(format(new Date(), 'yyyy-MM-dd')), {addSuffix: true});
    if (date === 'less than a minute ago') date = 'today';
    return date;
  }

  describePriorityInWords() {
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

  isComplete() {
    return this.complete ? true : false;
  }

  isOverdue() {
    if (compareAsc(parseISO(format(new Date(), 'yyyy-MM-dd')), parseISO(this.dueDate)) === 1 && !this.complete) {
      return this.overdue = true;
    }
    return false;
  }

  toggleComplete() {
    this.complete = !this.complete;
  }

  // Can't change task priority if the task is complete
  updatePriority() {
    if (this.complete) return;
    this.priority < 2 ? this.priority++ : this.priority = 0;
  }
}

export default Task;