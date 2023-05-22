import Task from "./Task";
import {v4 as uuid} from 'uuid';

class List {
  constructor({ title, id, owner }) {
    this.title = title;
    this.tasks = [];
    this.id = id || uuid();
    this.owner = owner || 'Aidan';
  }

  _store(item) {
    this.tasks.push(item);
  }

  create(item) {
    const task = new Task({
        title: item.title,
        dueDate: item.dueDate,
        priority: item.priority || null,
        complete: item.complete,
        overdue: item.overdue,
        id: item.id,
    });        
    this._store(task);
  }
};

export default List;