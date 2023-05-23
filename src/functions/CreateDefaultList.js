import List from "../classes/List";

function CreateDefaultWorkList() {
    const work = new List({ title: 'Work'});
    work.create({
        list: work.id,
        title: 'Allow completion of tasks',
        due: '2023-02-04',
        complete: true,
        priority: 1,
    });
    work.create({
        list: work.id,
        title: 'Allow deletion of tasks',
        due: '2023-02-21',
        complete: true,
        priority: 2,
    });
    work.create({
        list: work.id,
        title: `Lock priority on completed tasks`,
        due: '2023-02-17',
        complete: true,
        priority: 0,
    });
    work.create({
        list: work.id,
        title: 'Sort tasks by completion, then due date, then priority',
        due: '2023-02-15',
        complete: true,
        priority: 0,
    });
    work.create({
        list: work.id,
        title: 'Allow priority change of incomplete tasks',
        due: '2023-02-17',
        complete: true,
        priority: 1,
    });
    work.create({
        list: work.id,
        title: 'Implement date-fns for due date',
        due: '2023-02-16',
        complete: true,
        priority: 0,
    });
    work.create({
        list: work.id,
        title: 'Clicking task date toggles format',
        due: '2023-02-17',
        complete: true,
        priority: 0,
    });
    work.create({
        list: work.id,
        title: 'Create basic lists for shopping etc',
        due: '2023-02-25',
        complete: false,
        priority: 1,
    });

    return work;
}

function CreateDefaultPersonalList() {
    const personal = new List({ title: 'Personal' });
    personal.create({
        list: personal.id,
        title: 'Move flat',
        due: '2023-02-16',
        complete: true,
        priority: 2,
    });
    personal.create({
        list: personal.id,
        title: 'Walk 500 miles',
        due: '2023-12-25',
        priority: 0,
    });
    personal.create({
        list: personal.id,
        title: `Complete Donkey Kong Country 2 for the 1,000,000'th time`,
        due: '2023-03-31',
        complete: false,
        priority: 1,
    });

    return personal;
}

function CreateDefaultShoppingList() {
    const shopping = new List ({ title: 'Shopping'});
    shopping.create({
        list: shopping.id,
        title: 'Broccoli',
        due: '2023-02-18',
        priority: 1,
    });
    shopping.create({
        list: shopping.id,
        title: 'Tofu',
        due: '2023-02-18',
        priority: 1,
    });
    shopping.create({
        list: shopping.id,
        title: 'Soy Sauce',
        due: '2023-02-18',
        priority: 1,
    });
    shopping.create({
        list: shopping.id,
        title: 'Sriracha',
        due: '2023-02-18',
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