import Node from '../../src/nodes/node'
import NodeType from '../../src/nodes/node-type'
import TextNode from '../../src/nodes/text'
import { plainJson } from '../mock/json-element-mock'
import Document from '../../src/nodes/document'
describe('Node parser', () => {
    it('Should return node object', done => {
        const node: Node = new Node() 
        expect(node.type).toEqual(undefined)
        done()
    })

    it('Should return Document object', done => {
        const node: Document = new Document() 
        expect(node.type).toEqual(NodeType.DOCUMENT)
        done()
    })

    it('Should return Document object', done => {
        const str = 'Test String'

        const node: TextNode = new TextNode(str) 

        expect(node.text).toEqual(str)
        done()
    })
})