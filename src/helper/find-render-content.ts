import { Entry } from '../Models/entry-model';
export function findRenderContent (keyPaths: string, entry: Entry, render: (content: string| string[]) => (string| string[])){
     getContent(keyPaths.split("."), entry, render)
}

export function getContent(keys: string[], object: any, render: (content: string| string[]) => (string| string[])) {
    if (keys) {
        const key = keys[0]
        if (keys.length === 1 && object[key]) {
            object[key] = render(object[key])
        } else if (keys.length > 0) {
            if (object[key]) {
                const newKeys = keys.slice(1)
                if (Array.isArray(object[key])) {
                    // tslint:disable-next-line: prefer-for-of
                    for (let i = 0; i < object[key].length; i++) {
                        getContent(newKeys, object[key][i], render)
                    }
                } else if (typeof object[key] === 'object') {
                    getContent(newKeys, object[key], render)
                }
            }
        }
    }
}