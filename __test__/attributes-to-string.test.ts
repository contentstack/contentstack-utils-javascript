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

        expect(resultString).toEqual(' display-type="display" asset-uid="asset_uid_1" content-type-uid="sys_assets" asset-link="https://image.url/11.jpg" asset-name="11.jpg" asset-type="image/jpeg" type="asset" class-name="embedded-asset" width="25.16914749661705" className="classname" id="img_id"')
        done()
    })

    it('Should return string format for array attribute value', done => {
        const attr = {
            "style": {
                "text-align": "left"
            },
            "rows": 4,
             "cols": 2,
            "colWidths": [
              250,
              250
            ]
        } as Attributes

        const resultString = attributeToString(attr)

        expect(resultString).toEqual(' style="text-align:left; " rows="4" cols="2" colWidths="250, 250"')
        done()
    })

})