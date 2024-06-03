import MarkType from '../src/nodes/mark-type'
import Node from '../src/nodes/node'
import NodeType from '../src/nodes/node-type'
import { Next, RenderMark, RenderNode } from '../src/options'
import { defaultNodeOption } from '../src/options/default-node-options'

const text = 'text'
const next : Next = () => text
const node: Node = {
    type: NodeType.DOCUMENT,
    attrs: {},
    children: []
}

const imgNode: Node = {
    type: NodeType.IMAGE,
    attrs: {src: "https://image.url/Donald.jog.png", style: "color: red;"},
    children:[]

}

const imgNodeWithURL: Node = {
    type: NodeType.IMAGE,
    attrs: {url: "https://image.url/Donald.jog.png"},
    children:[]

}

const linkNode: Node = {
    type: NodeType.LINK,
    attrs: {href: "https://image.url/Donald.jog.png"},
    children:[]

}

const linkNodeWithURL: Node = {
    type: NodeType.LINK,
    attrs: {url: "https://image.url/Donald.jog.png", style: "color: red;"},
    children:[]

}

const embedNode: Node = {
    type: NodeType.EMBED,
    attrs: { src: "https://www.youtube.com/" },
    children: []
}
const embedNodeWithURL: Node = {
    type: NodeType.EMBED,
    attrs: { url: "https://www.youtube.com/" },
    children: []
}

const tableDataNode: Node = {
    type: NodeType.TABLE_DATA,
    attrs: {
        rowSpan: 2,
        colSpan: 2,
        'redactor-attributes': { colSpan: 2, rowSpan: 2 }
    },
    children: []
}

const tableHeadNode: Node = {
    type: NodeType.TABLE_HEAD,
    attrs: {
        rowSpan: 2,
        colSpan: 2,
        'redactor-attributes': { colSpan: 2, rowSpan: 2 }
    },
    children: []
}

const tableDataNodeWithVoid: Node = {
    type: NodeType.TABLE_DATA,
    attrs: { void: true },
    children: []
}

const tableHeadNodeWithVoid: Node = {
    type: NodeType.TABLE_HEAD,
    attrs: { void: true },
    children: []
}

describe('Default node render options', () => {
    it('Should return document string', done => {
        const renderString = (defaultNodeOption[NodeType.DOCUMENT] as RenderNode)(node, next)
        expect(renderString).toEqual('')
        done()
    })
    it('Should return paragraph string', done => {
        const renderString = (defaultNodeOption[NodeType.PARAGRAPH] as RenderNode)(node, next)
        expect(renderString).toEqual('<p>text</p>')
        done()
    })
    it('Should return link string', done => {
        let renderString = (defaultNodeOption[NodeType.LINK] as RenderNode)(linkNode, next)
        expect(renderString).toEqual(`<a href="${linkNode.attrs.href}">text</a>`)
        renderString = (defaultNodeOption[NodeType.IMAGE] as RenderNode)(imgNode, next)
        expect(renderString).toEqual('<img style=\"color: red;\" src="https://image.url/Donald.jog.png" />text')
        renderString = (defaultNodeOption[NodeType.EMBED] as RenderNode)(embedNode, next)
        expect(renderString).toEqual('<iframe src="https://www.youtube.com/">text</iframe>')
        done()
    })
    it('Should return link string with url as attr', done => {
        let renderString = (defaultNodeOption[NodeType.LINK] as RenderNode)(linkNodeWithURL, next)
        expect(renderString).toEqual(`<a style=\"color: red;\" href="${linkNodeWithURL.attrs.url}">text</a>`)
        renderString = (defaultNodeOption[NodeType.IMAGE] as RenderNode)(imgNodeWithURL, next)
        expect(renderString).toEqual(`<img src="${imgNodeWithURL.attrs.url}" />text`)
        renderString = (defaultNodeOption[NodeType.EMBED] as RenderNode)(embedNodeWithURL, next)
        expect(renderString).toEqual(`<iframe src="${embedNodeWithURL.attrs.url}">text</iframe>`)
        done()
    })
    it('Should return Heading string', done => {
        let renderString = (defaultNodeOption[NodeType.HEADING_1] as RenderNode)(node, next)
        expect(renderString).toEqual('<h1>text</h1>')

        renderString = (defaultNodeOption[NodeType.HEADING_2] as RenderNode)(node, next)
        expect(renderString).toEqual('<h2>text</h2>')
        
        renderString = (defaultNodeOption[NodeType.HEADING_3] as RenderNode)(node, next)
        expect(renderString).toEqual('<h3>text</h3>')
        
        renderString = (defaultNodeOption[NodeType.HEADING_4] as RenderNode)(node, next)
        expect(renderString).toEqual('<h4>text</h4>')
        
        renderString = (defaultNodeOption[NodeType.HEADING_5] as RenderNode)(node, next)
        expect(renderString).toEqual('<h5>text</h5>')
        
        renderString = (defaultNodeOption[NodeType.HEADING_6] as RenderNode)(node, next)
        expect(renderString).toEqual('<h6>text</h6>')
        
        done()
    })
    it('Should return List string', done => {
        let renderString = (defaultNodeOption[NodeType.ORDER_LIST] as RenderNode)(node, next)
        expect(renderString).toEqual('<ol>text</ol>')
        
        renderString = (defaultNodeOption[NodeType.UNORDER_LIST] as RenderNode)(node, next)
        expect(renderString).toEqual('<ul>text</ul>')

        renderString = (defaultNodeOption[NodeType.LIST_ITEM] as RenderNode)(node, next)
        expect(renderString).toEqual('<li>text</li>')
        
        done()
    })
    it('Should return HR string', done => {
        const renderString = (defaultNodeOption[NodeType.HR] as RenderNode)(node, next)
        expect(renderString).toEqual('<hr>')
        done()
    })
    it('Should return table string', done => {
        let renderString = (defaultNodeOption[NodeType.TABLE] as RenderNode)(node, next)
        expect(renderString).toEqual('<table>text</table>')

        renderString = (defaultNodeOption[NodeType.TABLE_HEADER] as RenderNode)(node, next)
        expect(renderString).toEqual('<thead>text</thead>')

        renderString = (defaultNodeOption[NodeType.TABLE_BODY] as RenderNode)(node, next)
        expect(renderString).toEqual('<tbody>text</tbody>')

        renderString = (defaultNodeOption[NodeType.TABLE_FOOTER] as RenderNode)(node, next)
        expect(renderString).toEqual('<tfoot>text</tfoot>')

        renderString = (defaultNodeOption[NodeType.TABLE_ROW] as RenderNode)(node, next)
        expect(renderString).toEqual('<tr>text</tr>')

        renderString = (defaultNodeOption[NodeType.TABLE_HEAD] as RenderNode)(tableHeadNode, next)
        expect(renderString).toEqual('<th rowspan=\"2\" colspan=\"2\">text</th>')

        renderString = (defaultNodeOption[NodeType.TABLE_DATA] as RenderNode)(tableDataNode, next)
        expect(renderString).toEqual('<td rowspan=\"2\" colspan=\"2\">text</td>')

        renderString = (defaultNodeOption[NodeType.TABLE_HEAD] as RenderNode)(tableHeadNodeWithVoid, next)
        expect(renderString).toEqual('')

        renderString = (defaultNodeOption[NodeType.TABLE_DATA] as RenderNode)(tableDataNodeWithVoid, next)
        expect(renderString).toEqual('')

        done()
    })
    it('Should return block quote string', done => {
        const renderString = (defaultNodeOption[NodeType.BLOCK_QUOTE] as RenderNode)(node, next)
        expect(renderString).toEqual('<blockquote>text</blockquote>')
        done()
    })
    it('Should return code string', done => {
        const renderString = (defaultNodeOption[NodeType.CODE] as RenderNode)(node, next)
        expect(renderString).toEqual('<code>text</code>')
        done()
    })
    it('Should return reference string', done => {
        const renderString = (defaultNodeOption.reference as RenderNode)(node, next)
        expect(renderString).toEqual('')
        done()
    })
})
describe('Default node render options', () => {

    it('Should return bold string', done => {
        const renderString = (defaultNodeOption[MarkType.BOLD] as RenderMark)(text)
        expect(renderString).toEqual('<strong>text</strong>')
        done()
    })
    it('Should return italic string', done => {
        const renderString = (defaultNodeOption[MarkType.ITALIC] as RenderMark)(text)
        expect(renderString).toEqual('<em>text</em>')
        done()
    })
    it('Should return underline string', done => {
        const renderString = (defaultNodeOption[MarkType.UNDERLINE] as RenderMark)(text)
        expect(renderString).toEqual('<u>text</u>')
        done()
    })
    it('Should return strike through string', done => {
        const renderString = (defaultNodeOption[MarkType.STRIKE_THROUGH] as RenderMark)(text)
        expect(renderString).toEqual('<strike>text</strike>')
        done()
    })
    it('Should return bold string', done => {
        const renderString = (defaultNodeOption[MarkType.INLINE_CODE] as RenderMark)(text)
        expect(renderString).toEqual('<span>text</span>')
        done()
    })
    it('Should return bold string', done => {
        const renderString = (defaultNodeOption[MarkType.SUBSCRIPT] as RenderMark)(text)
        expect(renderString).toEqual('<sub>text</sub>')
        done()
    })
    it('Should return bold string', done => {
        const renderString = (defaultNodeOption[MarkType.SUPERSCRIPT] as RenderMark)(text)
        expect(renderString).toEqual('<sup>text</sup>')
        done()
    })
})