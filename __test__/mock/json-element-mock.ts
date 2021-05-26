const plainJson = {
    uid: "06e34a7a7a5e4e5481190849d7fc2acd",
    _version: 13,
    attrs: {},
    children: [
        {
            type: "p",
            attrs: {},
            uid: "0a13457efb504e2bb6ffe976aa510e5a",
            children: [
                {
                    text: "text"
                }
            ]
        }
    ],
    type: "doc"
}

const plainEntry = {
    title: 'entry and assets',
    url: '/entry-and-assets',
    rich_text_editor: {...plainJson},
    locale: 'en-us',
    _in_progress: false,
    uid: 'blt88jn',
}


const plainJsonArrayEntry = {
    title: 'entry and assets',
    url: '/entry-and-assets',
    rich_text_editor: [plainJson],
    locale: 'en-us',
    _in_progress: false,
    uid: 'blt88jn',
    
}

export { plainEntry, plainJsonArrayEntry}