import { compareAsc, format, formatDistance, parseISO } from 'date-fns';
import {v4 as uuid} from 'uuid';

class Task {
  constructor({ id, listId, userId, firestoreId, title, priority, due, complete }) {
    this.id = id || uuid();
    this.listId = listId;
    this.userId = userId;
    this.firestoreId = firestoreId;
    this.title = title;
    this.priority = priority;
    this.due = due;
    this.complete = complete || false;
  }

  describeDueDateExact() {
    return parseISO(this.due).toDateString();
  }

  describeDueDateSimple() {
    let date = formatDistance(parseISO(this.due), parseISO(format(new Date(), 'yyyy-MM-dd')), {addSuffix: true});
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
    if (compareAsc(parseISO(format(new Date(), 'yyyy-MM-dd')), parseISO(this.due)) === 1 && !this.complete) {
      return true;
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