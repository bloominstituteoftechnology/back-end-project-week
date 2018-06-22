exports.data = {
    notes: [
        {
            id: 0,
            title: 'First note',
            content: 'I am the first note',
            ownerId: 1,
            col: 0,
            row: 1,
            tags: [0, 2]
        },
        {
            id: 1,
            title: 'Second note',
            content: '*Hello*',
            ownerId: 1,
            col: 0,
            row: 0,
            tags: [1]
        },
        {
            id: 2,
            title: 'Third note',
            content: '### What s up? `<code>newCodehere</code>`',
            ownerId: 2,
            col: 2,
            row: 0,
            tags: []
        },
        {
            id: 3,
            title: 'Third note',
            content: 'Anybody home?',
            ownerId: 2,
            col: 1,
            row: 0,
            tags: []
        },
        {
            id: 4,
            title: 'Last note',
            content: 'Thuy was here',
            ownerId: 2,
            col: 3,
            row: 0,
            tags: []
        }
    ],
    users: [
        {
            id: 1,
            name: 'Thuy'
        },
        {
            id: 2,
            name: 'Rosa'
        },
    ],
    tags: [
        {
            id: 0,
            name: 'Work',
            color: 'green'
        },
        {
            id: 1,
            name: 'Weekend Plan',
            color: 'orange'
        },
        {
            id: 2,
            name: 'School',
            color: 'yellow'
        },
    ],
}