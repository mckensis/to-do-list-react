import Task from "./Task";
import {v4 as uuid} from 'uuid';

class List {
  constructor({ title, id, owner, tasks }) {
    this.title = title;
    this.tasks = tasks || [];
    this.id = id || uuid();
    this.owner = owner || 'Aidan';
  }

  _store(item) {
    this.tasks.unshift(item);
  }

  create(item) {
    const task = new Task({
      id: item.id,
      title: item.title,
      due: item.due,
      priority: item.priority,
      list: item.list,
      complete: item.complete
    });        
    this._store(task);
  }
};

export default List;