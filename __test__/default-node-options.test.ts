import MarkType from '../src/nodes/mark-type'
import Node from '../src/nodes/node'
import NodeType from '../src/nodes/node-type'
import { Next, RenderMark, RenderNode } from '../src/options'
import { defaultNodeOption } from '../src/options/default-node-options'
import { Attributes } from '../src/Models/metadata-model'

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
    it('Should return inline code string', done => {
        const renderString = (defaultNodeOption[MarkType.INLINE_CODE] as RenderMark)(text)
        expect(renderString).toEqual(`<span data-type='inlineCode'>text</span>`)
        done()
    })
    it('Should return subscript string', done => {
        const renderString = (defaultNodeOption[MarkType.SUBSCRIPT] as RenderMark)(text)
        expect(renderString).toEqual('<sub>text</sub>')
        done()
    })
    it('Should return superscript string', done => {
        const renderString = (defaultNodeOption[MarkType.SUPERSCRIPT] as RenderMark)(text)
        expect(renderString).toEqual('<sup>text</sup>')
        done()
    })
})

describe('Default node render options - Missing attrs cases', () => {
    // Create nodes with undefined attrs using type assertion
    const nodeWithoutAttrs = {
        type: NodeType.PARAGRAPH,
        children: []
    } as unknown as Node

    const nodeWithUndefinedAttrs = {
        type: NodeType.PARAGRAPH,
        attrs: undefined as unknown as Attributes,
        children: []
    } as Node

    it('Should handle paragraph without attrs', done => {
        const renderString = (defaultNodeOption[NodeType.PARAGRAPH] as RenderNode)(nodeWithoutAttrs, next)
        expect(renderString).toEqual('<p>text</p>')
        done()
    })

    it('Should handle paragraph with undefined attrs', done => {
        const renderString = (defaultNodeOption[NodeType.PARAGRAPH] as RenderNode)(nodeWithUndefinedAttrs, next)
        expect(renderString).toEqual('<p>text</p>')
        done()
    })

    it('Should handle link without attrs', done => {
        const linkNodeNoAttrs = {
            type: NodeType.LINK,
            children: []
        } as unknown as Node
        const renderString = (defaultNodeOption[NodeType.LINK] as RenderNode)(linkNodeNoAttrs, next)
        expect(renderString).toEqual('<a>text</a>')
        done()
    })

    it('Should handle link without href or url', done => {
        const linkNodePartialAttrs = {
            type: NodeType.LINK,
            attrs: { style: 'color: red;' },
            children: []
        } as Node
        const renderString = (defaultNodeOption[NodeType.LINK] as RenderNode)(linkNodePartialAttrs, next)
        expect(renderString).toEqual('<a style="color: red;">text</a>')
        done()
    })

    it('Should handle image without attrs', done => {
        const imgNodeNoAttrs = {
            type: NodeType.IMAGE,
            children: []
        } as unknown as Node
        const renderString = (defaultNodeOption[NodeType.IMAGE] as RenderNode)(imgNodeNoAttrs, next)
        expect(renderString).toEqual('<img />text')
        done()
    })

    it('Should handle image without src or url', done => {
        const imgNodePartialAttrs = {
            type: NodeType.IMAGE,
            attrs: { id: 'img-id' },
            children: []
        } as Node
        const renderString = (defaultNodeOption[NodeType.IMAGE] as RenderNode)(imgNodePartialAttrs, next)
        expect(renderString).toEqual('<img id="img-id" />text')
        done()
    })

    it('Should handle embed without attrs', done => {
        const embedNodeNoAttrs = {
            type: NodeType.EMBED,
            children: []
        } as unknown as Node
        const renderString = (defaultNodeOption[NodeType.EMBED] as RenderNode)(embedNodeNoAttrs, next)
        expect(renderString).toEqual('<iframe>text</iframe>')
        done()
    })

    it('Should handle headings without attrs', done => {
        const headingNodeNoAttrs = {
            type: NodeType.HEADING_1,
            children: []
        } as unknown as Node
        const renderString = (defaultNodeOption[NodeType.HEADING_1] as RenderNode)(headingNodeNoAttrs, next)
        expect(renderString).toEqual('<h1>text</h1>')
        done()
    })

    it('Should handle headings with partial attrs', done => {
        const headingNodePartialAttrs = {
            type: NodeType.HEADING_2,
            attrs: { style: 'font-weight: bold;' },
            children: []
        } as Node
        const renderString = (defaultNodeOption[NodeType.HEADING_2] as RenderNode)(headingNodePartialAttrs, next)
        expect(renderString).toEqual('<h2 style="font-weight: bold;">text</h2>')
        done()
    })

    it('Should handle lists without attrs', done => {
        const listNodeNoAttrs = {
            type: NodeType.ORDER_LIST,
            children: []
        } as unknown as Node
        const renderString = (defaultNodeOption[NodeType.ORDER_LIST] as RenderNode)(listNodeNoAttrs, next)
        expect(renderString).toEqual('<ol>text</ol>')
        done()
    })

    it('Should handle table without attrs', done => {
        const tableNodeNoAttrs = {
            type: NodeType.TABLE,
            children: []
        } as unknown as Node
        const renderString = (defaultNodeOption[NodeType.TABLE] as RenderNode)(tableNodeNoAttrs, next)
        expect(renderString).toEqual('<table>text</table>')
        done()
    })

    it('Should handle table without colWidths', done => {
        const tableNodeNoColWidths = {
            type: NodeType.TABLE,
            attrs: { style: 'border: 1px solid;' },
            children: []
        } as Node
        const renderString = (defaultNodeOption[NodeType.TABLE] as RenderNode)(tableNodeNoColWidths, next)
        expect(renderString).toEqual('<table style="border: 1px solid;">text</table>')
        done()
    })

    it('Should handle table head without attrs', done => {
        const tableHeadNoAttrs = {
            type: NodeType.TABLE_HEAD,
            children: []
        } as unknown as Node
        const renderString = (defaultNodeOption[NodeType.TABLE_HEAD] as RenderNode)(tableHeadNoAttrs, next)
        expect(renderString).toEqual('<th>text</th>')
        done()
    })

    it('Should handle table head without rowSpan or colSpan', done => {
        const tableHeadPartialAttrs = {
            type: NodeType.TABLE_HEAD,
            attrs: { style: 'background: gray;' },
            children: []
        } as Node
        const renderString = (defaultNodeOption[NodeType.TABLE_HEAD] as RenderNode)(tableHeadPartialAttrs, next)
        expect(renderString).toEqual('<th style="background: gray;">text</th>')
        done()
    })

    it('Should handle table data without attrs', done => {
        const tableDataNoAttrs = {
            type: NodeType.TABLE_DATA,
            children: []
        } as unknown as Node
        const renderString = (defaultNodeOption[NodeType.TABLE_DATA] as RenderNode)(tableDataNoAttrs, next)
        expect(renderString).toEqual('<td>text</td>')
        done()
    })

    it('Should handle table data with void attribute', done => {
        const tableDataVoidNoAttrs = {
            type: NodeType.TABLE_DATA,
            attrs: { void: true },
            children: []
        } as Node
        const renderString = (defaultNodeOption[NodeType.TABLE_DATA] as RenderNode)(tableDataVoidNoAttrs, next)
        expect(renderString).toEqual('')
        done()
    })

    it('Should handle blockquote without attrs', done => {
        const blockquoteNoAttrs = {
            type: NodeType.BLOCK_QUOTE,
            children: []
        } as unknown as Node
        const renderString = (defaultNodeOption[NodeType.BLOCK_QUOTE] as RenderNode)(blockquoteNoAttrs, next)
        expect(renderString).toEqual('<blockquote>text</blockquote>')
        done()
    })

    it('Should handle code without attrs', done => {
        const codeNoAttrs = {
            type: NodeType.CODE,
            children: []
        } as unknown as Node
        const renderString = (defaultNodeOption[NodeType.CODE] as RenderNode)(codeNoAttrs, next)
        expect(renderString).toEqual('<code>text</code>')
        done()
    })

    it('Should handle reference without attrs', done => {
        const referenceNoAttrs = {
            type: NodeType.REFERENCE,
            children: []
        } as unknown as Node
        const renderString = (defaultNodeOption.reference as RenderNode)(referenceNoAttrs, next)
        expect(renderString).toEqual('')
        done()
    })

    it('Should handle reference with type but no display-type', done => {
        const referencePartialAttrs = {
            type: NodeType.REFERENCE,
            attrs: { type: 'entry' },
            children: []
        } as Node
        const renderString = (defaultNodeOption.reference as RenderNode)(referencePartialAttrs, next)
        expect(renderString).toEqual('')
        done()
    })

    it('Should handle reference with entry type and link display-type but missing href', done => {
        const referenceLinkNoHref = {
            type: NodeType.REFERENCE,
            attrs: { type: 'entry', 'display-type': 'link' },
            children: []
        } as Node
        const renderString = (defaultNodeOption.reference as RenderNode)(referenceLinkNoHref, next)
        expect(renderString).toEqual('<a>text</a>')
        done()
    })

    it('Should handle reference with asset type and link display-type but missing href', done => {
        const referenceAssetLinkNoHref = {
            type: NodeType.REFERENCE,
            attrs: { type: 'asset', 'display-type': 'link' },
            children: []
        } as Node
        const renderString = (defaultNodeOption.reference as RenderNode)(referenceAssetLinkNoHref, next)
        expect(renderString).toEqual('<a type="asset" content-type-uid="sys_assets" sys-style-type="download">text</a>')
        done()
    })

    it('Should handle reference with asset type but missing asset-link', done => {
        const referenceAssetNoLink = {
            type: NodeType.REFERENCE,
            attrs: { type: 'asset' },
            children: []
        } as Node
        const renderString = (defaultNodeOption.reference as RenderNode)(referenceAssetNoLink, next)
        expect(renderString).toEqual('<figure><img /></figure>')
        done()
    })

    it('Should handle reference with asset type but partial attributes', done => {
        const referenceAssetPartial = {
            type: NodeType.REFERENCE,
            attrs: { 
                type: 'asset',
                'asset-link': 'https://example.com/image.jpg',
                style: 'border: 1px;'
            },
            children: []
        } as Node
        const renderString = (defaultNodeOption.reference as RenderNode)(referenceAssetPartial, next)
        expect(renderString).toContain('<figure')
        expect(renderString).toContain('style="border: 1px;"')
        expect(renderString).toContain('src=')
        done()
    })

    it('Should handle link with target attribute', done => {
        const linkWithTarget = {
            type: NodeType.LINK,
            attrs: { href: 'https://example.com', target: '_blank' },
            children: []
        } as Node
        const renderString = (defaultNodeOption[NodeType.LINK] as RenderNode)(linkWithTarget, next)
        expect(renderString).toEqual('<a href="https://example.com" target="_blank">text</a>')
        done()
    })

    it('Should handle link without target attribute', done => {
        const linkWithoutTarget = {
            type: NodeType.LINK,
            attrs: { href: 'https://example.com' },
            children: []
        } as Node
        const renderString = (defaultNodeOption[NodeType.LINK] as RenderNode)(linkWithoutTarget, next)
        expect(renderString).toEqual('<a href="https://example.com">text</a>')
        done()
    })

    it('Should handle elements with only class-name attribute', done => {
        const nodeWithClass = {
            type: NodeType.PARAGRAPH,
            attrs: { 'class-name': 'custom-class' },
            children: []
        } as Node
        const renderString = (defaultNodeOption[NodeType.PARAGRAPH] as RenderNode)(nodeWithClass, next)
        expect(renderString).toEqual('<p class="custom-class">text</p>')
        done()
    })

    it('Should handle elements with only id attribute', done => {
        const nodeWithId = {
            type: NodeType.PARAGRAPH,
            attrs: { id: 'custom-id' },
            children: []
        } as Node
        const renderString = (defaultNodeOption[NodeType.PARAGRAPH] as RenderNode)(nodeWithId, next)
        expect(renderString).toEqual('<p id="custom-id">text</p>')
        done()
    })

    it('Should handle elements with only style attribute', done => {
        const nodeWithStyle = {
            type: NodeType.PARAGRAPH,
            attrs: { style: 'color: blue;' },
            children: []
        } as Node
        const renderString = (defaultNodeOption[NodeType.PARAGRAPH] as RenderNode)(nodeWithStyle, next)
        expect(renderString).toEqual('<p style="color: blue;">text</p>')
        done()
    })

    it('Should handle all common attributes together', done => {
        const nodeWithAllAttrs = {
            type: NodeType.PARAGRAPH,
            attrs: { 
                style: 'color: blue;',
                'class-name': 'custom-class',
                id: 'custom-id'
            },
            children: []
        } as Node
        const renderString = (defaultNodeOption[NodeType.PARAGRAPH] as RenderNode)(nodeWithAllAttrs, next)
        expect(renderString).toEqual('<p style="color: blue;" class="custom-class" id="custom-id">text</p>')
        done()
    })
})