const topics = [
    {
        id: 1,
        title: "Test title",
        description: 'Description',
        createdBy: 'pesho',
        modifiedBy: 'pesho',
        createdAt: new Date(),
        modifiedAt: new Date()
    },
    {
        id: 2,
        title: "Test title 2",
        description: 'Description 2',
        createdBy: 'pesho',
        modifiedBy: 'pesho',
        createdAt: '01 Jan 2020 00:00:00 GMT',
        modifiedAt: new Date().toUTCString()
    }
]

exports.topics = topics