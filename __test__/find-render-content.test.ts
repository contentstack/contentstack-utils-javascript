import { findRenderContent, getContent } from '../src/helper/find-render-content';
import { entryMultipleContent } from './mock/entry-multiple-rich-text-content';

describe('Find Render content test', () => {

    it('test getContent function', done => {
        getContent(undefined, undefined, () => { return ''})
        getContent([], undefined, () => { return ''})
        getContent(['rich','obj'], { rich: 'rich content'}, () => { return ''})
        done()
    })

    it('blank path path test', done => {
        expect.assertions(0)
        findContent('', (content: string| string[]) => {
            expect(content).toEqual(undefined)
            return content
        })
        done()
    })

    it('Simple String path test', done => {
        findContent('rich_text_editor', (content: string| string[]) => {
            expect(content).toEqual(entryMultipleContent.rich_text_editor)
            return 'New Content'
        })
        expect(entryMultipleContent.rich_text_editor).toEqual('New Content')
        done()
    })

    it('Array String path test', done => {
        findContent('rich_text_editor_multiple', (content: string| string[]) => {
            expect(content).toEqual(entryMultipleContent.rich_text_editor_multiple)
            return content
        })
        done()
    })

    it('Global Field String path test', done => {
        findContent('global_rich.rich_text_editor', (content: string| string[]) => {
            expect(content).toEqual(entryMultipleContent.global_rich.rich_text_editor)
            return content
        })
        done()
    })

    it('Global Field Array String path test', done => {
        findContent('global_rich.rich_text_editor_multiple', (content: string| string[]) => {
            expect(content).toEqual(entryMultipleContent.global_rich.rich_text_editor_multiple)
            return content
        })
        done()
    })

    it('Global Field Group String path test', done => {
        findContent('global_rich.group.rich_text_editor', (content: string| string[]) => {
            expect(content).toEqual(entryMultipleContent.global_rich.group.rich_text_editor)
            return content
        })
        done()
    })

    it('Global Field Group Array String path test', done => {
        findContent('global_rich.group.rich_text_editor_multiple', (content: string| string[]) => {
            expect(content).toEqual(entryMultipleContent.global_rich.group.rich_text_editor_multiple)
            return content
        })
        done()
    })

    it('Global Field modular block String path test', done => {
        findContent('global_rich.modular_blocks.rich_in_modular.rich_text_editor', (content: string| string[]) => {
            expect(content).toEqual(entryMultipleContent.global_rich.modular_blocks[0].rich_in_modular.rich_text_editor)
            return content
        })
        done()
    })

    it('Global Field modular block Array String path test', done => {
        findContent('global_rich.modular_blocks.rich_in_modular.rich_text_editor_multiple', (content: string| string[]) => {
            expect(content).toEqual(entryMultipleContent.global_rich.modular_blocks[0].rich_in_modular.rich_text_editor_multiple)
            return content
        })
        done()
    })

    it('Multiple Global Field String path test', done => {
        findContent('global_rich_multiple.rich_text_editor', (content: string| string[]) => {
            expect(content).toEqual(entryMultipleContent.global_rich_multiple[0].rich_text_editor)
            return content
        })
        done()
    })

    it('Multiple Global Field Array String path test', done => {
        findContent('global_rich_multiple.rich_text_editor_multiple', (content: string| string[]) => {
            expect(content).toEqual(entryMultipleContent.global_rich_multiple[0].rich_text_editor_multiple)
            return content
        })
        done()
    })

    it('Multiple Global Field Group String path test', done => {
        findContent('global_rich_multiple.group.rich_text_editor', (content: string| string[]) => {
            expect(content).toEqual(entryMultipleContent.global_rich_multiple[0].group.rich_text_editor)
            return content
        })
        done()
    })

    it('Multiple Global Field Group Array String path test', done => {
        findContent('global_rich_multiple.group.rich_text_editor_multiple', (content: string| string[]) => {
            expect(content).toEqual(entryMultipleContent.global_rich_multiple[0].group.rich_text_editor_multiple)
            return content
        })
        done()
    })

    it('Multiple Global Field modular block String path test', done => {
        findContent('global_rich_multiple.modular_blocks.rich_in_modular.rich_text_editor', (content: string| string[]) => {
            expect(content).toEqual(entryMultipleContent.global_rich_multiple[0].modular_blocks[0].rich_in_modular.rich_text_editor)
            return content
        })
        done()
    })

    it('Multiple Global Field modular block Array String path test', done => {
        findContent('global_rich_multiple.modular_blocks.rich_in_modular.rich_text_editor_multiple', (content: string| string[]) => {
            expect(content).toEqual(entryMultipleContent.global_rich_multiple[0].modular_blocks[0].rich_in_modular.rich_text_editor_multiple)
            return content
        })
        done()
    })

    it('Group String path test', done => {
        findContent('group.rich_text_editor', (content: string| string[]) => {
            expect(content).toEqual(entryMultipleContent.group.rich_text_editor)
            return content
        })
        done()
    })

    it('Group Array String path test', done => {
        findContent('group.rich_text_editor_multiple', (content: string| string[]) => {
            expect(content).toEqual(entryMultipleContent.group.rich_text_editor_multiple)
            return content
        })
        done()
    })

    it('modular blocks String path test', done => {
        findContent('modular_blocks.rich_text_editor', (content: string| string[]) => {
            expect(content).toEqual(entryMultipleContent.group.rich_text_editor)
            return content
        })
        done()
    })

    it('modular blocks Array String path test', done => {
        findContent('modular_blocks.rich_text_editor_multiple', (content: string| string[]) => {
            expect(content).toEqual(entryMultipleContent.group.rich_text_editor_multiple)
            return content
        })
        done()
    })

    it('Modular RTE Block String path test', done => {
        findContent('modular_blocks.rich_text_inmodular.rich_text_editor', (content: string| string[]) => {
            expect(content).toEqual(entryMultipleContent.modular_blocks[0].rich_text_inmodular.rich_text_editor)
            return content
        })
        done()
    })

    it('Modular RTE Block Array String path test', done => {
        findContent('modular_blocks.rich_text_inmodular.rich_text_editor_multiple', (content: string| string[]) => {
            expect(content).toEqual(entryMultipleContent.modular_blocks[0].rich_text_inmodular.rich_text_editor_multiple)
            return content
        })
        done()
    })

    it('Modular Global field Block String path test', done => {
        findContent('modular_blocks.global_modular.rich_text_editor', (content: string| string[]) => {
            expect(content).toEqual(entryMultipleContent.modular_blocks[1].global_modular.rich_text_editor)
            return content
        })
        done()
    })

    it('Modular Global field Block Array String path test', done => {
        findContent('modular_blocks.global_modular.rich_text_editor_multiple', (content: string| string[]) => {
            expect(content).toEqual(entryMultipleContent.modular_blocks[1].global_modular.rich_text_editor_multiple)
            return content
        })
        done()
    })

    it('Modular Global field Block group String path test', done => {
        findContent('modular_blocks.global_modular.group.rich_text_editor', (content: string| string[]) => {
            expect(content).toEqual(entryMultipleContent.modular_blocks[1].global_modular.group.rich_text_editor)
            return content
        })
        done()
    })

    it('Modular Global field Block group Array String path test', done => {
        findContent('modular_blocks.global_modular.group.rich_text_editor_multiple', (content: string| string[]) => {
            expect(content).toEqual(entryMultipleContent.modular_blocks[1].global_modular.group.rich_text_editor_multiple)
            return content
        })
        done()
    })

    it('Modular Global field Block Modular String path test', done => {
        findContent('modular_blocks.global_modular.modular_blocks.rich_in_modular.rich_text_editor', (content: string| string[]) => {
            expect(content).toEqual(entryMultipleContent.modular_blocks[1].global_modular.modular_blocks[0].rich_in_modular.rich_text_editor)
            return content
        })
        done()
    })

    it('Modular Global field Block Modular Array String path test', done => {
        findContent('modular_blocks.global_modular.modular_blocks.rich_in_modular.rich_text_editor_multiple', (content: string| string[]) => {
            expect(content).toEqual(entryMultipleContent.modular_blocks[1].global_modular.modular_blocks[0].rich_in_modular.rich_text_editor_multiple)
            return content
        })
        done()
    })
})

describe('Find Render Content negative and corner cases', () => {
    it('getContent with null object should throw when accessing object[key]', () => {
        expect(() => getContent(['key'], null as any, () => '')).toThrow()
    })

    it('getContent with undefined object should throw when accessing object[key]', () => {
        expect(() => getContent(['key'], undefined as any, () => '')).toThrow()
    })

    it('getContent with empty keys array should not call render', done => {
        const entry = { rich_text_editor: 'content' }
        const render = jest.fn(() => 'replaced')
        getContent([], entry, render)
        expect(render).not.toHaveBeenCalled()
        done()
    })

    it('findRenderContent with path that does not exist on entry should not throw', done => {
        const entry = { uid: 'e1', title: 'Only these' }
        expect(() => findRenderContent('nonexistent.path', entry, (c: string | string[]) => c)).not.toThrow()
        done()
    })

    it('findRenderContent with single key that does not exist should not call render', done => {
        const entry = { uid: 'e1' }
        const render = jest.fn((c: any) => c)
        findRenderContent('missing_key', entry, render)
        expect(render).not.toHaveBeenCalled()
        done()
    })

    it('getContent when intermediate key is null should not throw', done => {
        const entry: any = { level1: null }
        expect(() => getContent(['level1', 'level2'], entry, () => 'x')).not.toThrow()
        done()
    })
})

function findContent(path: string, renders: (content: string| string[]) => string| string[]) {
    findRenderContent(path, entryMultipleContent, renders)
}