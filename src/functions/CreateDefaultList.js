import List from "../classes/List";

function CreateDefaultWorkList() {
    const work = new List({ title: 'Work'});
    work.create({
        title: 'Allow completion of tasks',
        dueDate: '2023-02-04',
        complete: true,
        priority: 1,
    });
    work.create({
        title: 'Allow deletion of tasks',
        dueDate: '2023-02-21',
        complete: true,
        priority: 2,
    });
    work.create({
        title: `Lock priority on completed tasks`,
        dueDate: '2023-02-17',
        complete: true,
        priority: 0,
    });
    work.create({
        title: 'Sort tasks by completion, then due date, then priority',
        dueDate: '2023-02-15',
        complete: true,
        priority: 0,
    });
    work.create({
        title: 'Allow priority change of incomplete tasks',
        dueDate: '2023-02-17',
        complete: true,
        priority: 1,
    });
    work.create({
        title: 'Implement date-fns for due date',
        dueDate: '2023-02-16',
        complete: true,
        priority: 0,
    });
    work.create({
        title: 'Clicking task date toggles format',
        dueDate: '2023-02-17',
        complete: true,
        priority: 0,
    });
    work.create({
        title: 'Create basic lists for shopping etc',
        dueDate: '2023-02-25',
        complete: false,
        priority: 1,
    });

    return work;
}

function CreateDefaultPersonalList() {
    const personal = new List({ title: 'Personal' });
    personal.create({
        title: 'Move flat',
        dueDate: '2023-02-16',
        complete: true,
        priority: 2,
    });
    personal.create({
        title: 'Walk 500 miles',
        dueDate: '2023-12-25',
        priority: 0,
    });
    personal.create({
        title: 'Find a job',
        dueDate: '2023-02-28',
        complete: false,
        priority: 2,
    });
    personal.create({
        title: `Complete Donkey Kong Country 2 for the 1,000,000'th time`,
        dueDate: '2023-03-31',
        complete: false,
        priority: 1,
    });

    return personal;
}

function CreateDefaultShoppingList() {
    const shopping = new List ({ title: 'Shopping'});
    shopping.create({
        title: 'Broccoli',
        dueDate: '2023-02-18',
        priority: 1,
    });
    shopping.create({
        title: 'Tofu',
        dueDate: '2023-02-18',
        priority: 1,
    });
    shopping.create({
        title: 'Soy Sauce',
        dueDate: '2023-02-18',
        priority: 1,
    });
    shopping.create({
        title: 'Sriracha',
        dueDate: '2023-02-18',
        priority: 1,
    });
    return shopping;
}

function CreateEmptyList() {
    const empty = new List({ title: 'Empty' });
    return empty;
}

function CreateDefaultList() {
    let list = [];

    const work = CreateDefaultWorkList();
    const personal = CreateDefaultPersonalList();
    const shopping = CreateDefaultShoppingList();
    const empty = CreateEmptyList();
    
    list.push(work);
    list.push(personal);
    list.push(shopping);
    list.push(empty);

    return list;
}

export default CreateDefaultList;