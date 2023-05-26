import Task from "./Task";
import {v4 as uuid} from 'uuid';

class List {
  constructor({ title, id, user, firestore, tasks }) {
    this.id = id || uuid();
    this.userId = user || 'Aidan';
    this.firestoreId = firestore || null;
    this.title = title;
    this.tasks = tasks || [];
  }

  _store(item) {
    this.tasks.unshift(item);
  }

  create({ id, list, user, firestore, title, priority, due, complete }) {
    const task = new Task({
      id: id,
      listId: list,
      userId: user,
      firestoreId: firestore,
      title: title,
      priority: priority,
      due: due,
      complete: complete
    });
    this._store(task);
  }
};

export default List;