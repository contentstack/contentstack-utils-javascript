import NodeType from '../../src/nodes/node-type'

describe('Node Type Test', () => {
    it('Check Node Type Values', done => {
        expect(NodeType.DOCUMENT).toEqual('doc')
        expect(NodeType.PARAGRAPH).toEqual('p')

        expect(NodeType.LINK).toEqual('a')
        expect(NodeType.IMAGE).toEqual('img')
        expect(NodeType.EMBED).toEqual('embed')

        expect(NodeType.HEADING_1).toEqual('h1')
        expect(NodeType.HEADING_2).toEqual('h2')
        expect(NodeType.HEADING_3).toEqual('h3')
        expect(NodeType.HEADING_4).toEqual('h4')
        expect(NodeType.HEADING_5).toEqual('h5')
        expect(NodeType.HEADING_6).toEqual('h6')

        expect(NodeType.ORDER_LIST).toEqual('ol')
        expect(NodeType.UNORDER_LIST).toEqual('ul')
        expect(NodeType.LIST_ITEM).toEqual('li')

        expect(NodeType.HR).toEqual('hr')

        expect(NodeType.TABLE).toEqual('table')
        expect(NodeType.TABLE_HEADER).toEqual('thead')
        expect(NodeType.TABLE_BODY).toEqual('tbody')
        expect(NodeType.TABLE_FOOTER).toEqual('tfoot')
        expect(NodeType.TABLE_ROW).toEqual('tr')
        expect(NodeType.TABLE_HEAD).toEqual('th')
        expect(NodeType.TABLE_DATA).toEqual('td')

        expect(NodeType.BLOCK_QUOTE).toEqual('blockquote')
        expect(NodeType.CODE).toEqual('code')


        done()
    })
})