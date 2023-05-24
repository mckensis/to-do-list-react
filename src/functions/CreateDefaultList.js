import List from "../classes/List";

function CreateDefaultWorkList() {
    const work = new List({ title: 'Work'});
    work.create({
        list: work.id,
        title: 'Allow completion of tasks',
        due: '2023-06-01',
        complete: true,
        priority: 1,
    });
    work.create({
        list: work.id,
        title: 'Allow deletion of tasks',
        due: '2023-06-02',
        complete: true,
        priority: 2,
    });
    work.create({
        list: work.id,
        title: `Lock priority on completed tasks`,
        due: '2023-06-03',
        complete: true,
        priority: 0,
    });
    work.create({
        list: work.id,
        title: 'Sort tasks by completion, then due date, then priority',
        due: '2023-06-04',
        complete: true,
        priority: 0,
    });
    work.create({
        list: work.id,
        title: 'Allow priority change of incomplete tasks',
        due: '2023-06-04',
        complete: true,
        priority: 1,
    });
    work.create({
        list: work.id,
        title: 'Implement date-fns for due date',
        due: '2023-06-04',
        complete: true,
        priority: 2,
    });
    work.create({
        list: work.id,
        title: 'Clicking task date toggles format',
        due: '2023-06-05',
        complete: true,
        priority: 0,
    });
    work.create({
        list: work.id,
        title: 'Create basic lists for shopping etc',
        due: '2023-05-22',
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
        due: '2023-05-22',
        complete: false,
        priority: 2,
    });
    personal.create({
        list: personal.id,
        title: 'Walk 500 miles',
        due: '2023-05-22',
        priority: 0,
        completed: true
    });
    personal.create({
        list: personal.id,
        title: `Complete Donkey Kong Country 2 for the 1,000,000'th time`,
        due: '2023-06-20',
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
        due: '2023-06-21',
        priority: 1,
    });
    shopping.create({
        list: shopping.id,
        title: 'Tofu',
        due: '2023-06-21',
        priority: 1,
    });
    shopping.create({
        list: shopping.id,
        title: 'Soy Sauce',
        due: '2023-06-21',
        priority: 1,
    });
    shopping.create({
        list: shopping.id,
        title: 'Sriracha',
        due: '2023-06-21',
        priority: 1,
    });
    return shopping;
}

function CreateSortList() {
    const sort = new List({ title: 'Sort' });
    sort.create({
        list: sort.id,
        title: 'Due today, incomplete, low priority',
        due: '2023-05-24',
        priority: 0,
    });
    sort.create({
        list: sort.id,
        title: 'Due today, incomplete, default priority',
        due: '2023-05-24',
        priority: 1,
    });
    sort.create({
        list: sort.id,
        title: 'Due today, incomplete, urgent priority',
        due: '2023-05-24',
        priority: 2,
    });
    sort.create({
        list: sort.id,
        title: 'Due today, complete, low priority',
        due: '2023-05-24',
        complete: true,
        priority: 0,
    });
    sort.create({
        list: sort.id,
        title: 'Due today, complete, default priority',
        due: '2023-05-24',
        complete: true,
        priority: 1,
    });
    sort.create({
        list: sort.id,
        title: 'Due today, complete, urgent priority',
        due: '2023-05-24',
        complete: true,
        priority: 2,
    });
    sort.create({
        list: sort.id,
        title: 'Due tomorrow, complete',
        due: '2023-05-25',
        complete: true,
        priority: 1,
    });
    sort.create({
        list: sort.id,
        title: 'Due tomorrow, incomplete',
        due: '2023-05-25',
        priority: 1,
    });
    sort.create({
        list: sort.id,
        title: 'Due in two days, complete',
        due: '2023-05-26',
        complete: true,
        priority: 1,
    });
    sort.create({
        list: sort.id,
        title: 'Due in two days, incomplete',
        due: '2023-05-26',
        priority: 1,
    });

    return sort;
}


function CreateEmptyList() {
    const empty = new List({ title: "Empty" });
    return empty;
}

function CreateDefaultList() {
    let list = [];

    const work = CreateDefaultWorkList();
    const personal = CreateDefaultPersonalList();
    const shopping = CreateDefaultShoppingList();
    const sort = CreateSortList();
    const empty = CreateEmptyList();
    
    list.push(work);
    list.push(personal);
    list.push(shopping);
    list.push(sort);
    list.push(empty);

    return list;
}

export default CreateDefaultList;