import MarkType from '../../src/nodes/mark-type'

describe('Node Type Test', () => {
    it('Check Node Type Values', done => {
        expect(MarkType.BOLD).toEqual('bold')
        expect(MarkType.ITALIC).toEqual('italic')

        expect(MarkType.UNDERLINE).toEqual('underline')
        expect(MarkType.STRIKE_THROUGH).toEqual('strikethrough')
        expect(MarkType.INLINE_CODE).toEqual('inlineCode')
        expect(MarkType.SUBSCRIPT).toEqual('subscript')
        expect(MarkType.SUPERSCRIPT).toEqual('superscript')

        done()
    })
})