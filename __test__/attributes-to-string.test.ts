import { Attributes, attributeToString } from "../src/Models/metadata-model"
import { assetReferenceJson } from "./mock/json-element-mock"

describe('Attributes to String', () => {
    it('Should return blank string on blank attributes', done => {
        const attr = {} as Attributes

        const resultString = attributeToString(attr)

        expect(resultString).toEqual('')
        done()
    })
    it('Should return style type string', done => {
        const attr = {
            "style": {
                "text-align": "left"
            }
        } as Attributes

        const resultString = attributeToString(attr)

        expect(resultString).toEqual(' style="text-align:left; "')
        done()
    })

    it('Should return string of attributes key value format', done => {
        const attr = assetReferenceJson.children[0].attrs as Attributes

        const resultString = attributeToString(attr)

        expect(resultString).toEqual(' display-type="display" asset-uid="blt44asset" content-type-uid="sys_assets" asset-link="https://images.contentstack.com/v3/assets/blt77263d3e6b/blt73403ee7281/51807f919e0e4/11.jpg" asset-name="11.jpg" asset-type="image/jpeg" type="asset" class-name="embedded-asset" width="25.16914749661705" className="dsd" id="sdf"')
        done()
    })

})