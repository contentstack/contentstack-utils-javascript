import ASSET from "../src/embedded-types/asset"
import ENTRY from "../src/embedded-types/entry"

describe('Embedded types test', () => {
  it('Embedded Asset type test', done => {
      expect(ASSET.DISPLAYABLE).toEqual('display')
      expect(ASSET.DOWNLOADABLE).toEqual('download')
      done()
  })

  it('Embedded Entry type test', done => {
    expect(ENTRY.BLOCK).toEqual('block')
    expect(ENTRY.INLINE).toEqual('inline')
    expect(ENTRY.LINK).toEqual('link')
    done()
  })
})