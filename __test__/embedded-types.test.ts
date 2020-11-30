import StyleType from "../src/embedded-types/style-type"

describe('Embedded types test', () => {
  it('Embedded Asset type test', done => {
      expect(StyleType.DISPLAY).toEqual('display')
      expect(StyleType.DOWNLOAD).toEqual('download')
      done()
  })

  it('Embedded Entry type test', done => {
    expect(StyleType.BLOCK).toEqual('block')
    expect(StyleType.INLINE).toEqual('inline')
    expect(StyleType.LINK).toEqual('link')
    done()
  })
})