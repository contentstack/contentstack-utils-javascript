import { textNodeToHTML } from "../src/helper/enumerate-entries"
import NodeType from "../src/nodes/node-type"
import TextNode from "../src/nodes/text-node"
import { defaultNodeOption } from "../src/options/default-node-options"

const textNode: TextNode = {
    type: NodeType.TEXT,
    text: 'test text',
    attrs: {},
    children: []
}
describe('Text Node To HTML', () => {
    it('Should return Bold string text', done => {
        const node = {
            ...textNode,
            bold: true
        }
        
        const resultHtml = textNodeToHTML(node, {
            ...defaultNodeOption
        })

        expect(resultHtml).toEqual(`<strong>${textNode.text}</strong>`)
        done()
    })
    it('Should return Italic string text', done => {

        const node = {
            ...textNode,
            italic: true
        }

        const resultHtml = textNodeToHTML(node, {
            ...defaultNodeOption
        })

        expect(resultHtml).toEqual(`<em>${textNode.text}</em>`)
        done()
    })
    it('Should return Underline string text', done => {
        const node = {
            ...textNode,
            underline: true
        }

        const resultHtml = textNodeToHTML(node, {
            ...defaultNodeOption
        })

        expect(resultHtml).toEqual(`<u>${textNode.text}</u>`)
        done()
    })
    it('Should return Strike Through string text', done => {
        const node = {
            ...textNode,
            strikethrough: true
        }

        const resultHtml = textNodeToHTML(node, {
            ...defaultNodeOption
        })

        expect(resultHtml).toEqual(`<strike>${textNode.text}</strike>`)
        done()
    })
    it('Should return Inline Code string text', done => {
        const node = {
            ...textNode,
            inlineCode: true
        }

        const resultHtml = textNodeToHTML(node, {
            ...defaultNodeOption
        })

        expect(resultHtml).toEqual(`<span>${textNode.text}</span>`)
        done()
    })
    it('Should return Subscript string text', done => {
        const node = {
            ...textNode,
            subscript: true
        }

        const resultHtml = textNodeToHTML(node, {
            ...defaultNodeOption
        })

        expect(resultHtml).toEqual(`<sub>${textNode.text}</sub>`)
        done()
    })
    it('Should return Bold string text', done => {
        const node = {
            ...textNode,
            superscript: true
        }

        const resultHtml = textNodeToHTML(node, {
            ...defaultNodeOption
        })

        expect(resultHtml).toEqual(`<sup>${textNode.text}</sup>`)
        done()
    })

    it('Should return combine Marks string text', done => {
        const node = {
            ...textNode,
            bold: true,
            italic: true,
            underline: true,
            strikethrough: true,
            inlineCode: true,
            subscript: true,
            superscript: true
        }

        const resultHtml = textNodeToHTML(node, {
            ...defaultNodeOption
        })

        expect(resultHtml).toEqual(`<strong><em><u><strike><span><sub><sup>${textNode.text}</sup></sub></span></strike></u></em></strong>`)
        done()
    })
})