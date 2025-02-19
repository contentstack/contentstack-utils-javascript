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
    it('Should rignore attributes with forbidden characters in keys and values', done => {
        const attr = {
            "style": {
                "text-align": "left"
            },
            "rows": 4,
            "cols": 2,
            "colWidths": [250, 250],
            "<ls": "\"></p><h1>test</h1><p class=\"",
            "\"></p><h1>test</h1><p class=\"": 1
        } as Attributes;

        const resultString = attributeToString(attr);

        expect(resultString).toEqual(' style=\"text-align:left; \" rows=\"4\" cols=\"2\" colWidths=\"250, 250\" &lt;ls=\"&quot;&gt;&lt;/p&gt;&lt;h1&gt;test&lt;/h1&gt;&lt;p class=&quot;\"')
        done();
    });
    it('Should handle object attribute values correctly', done => {
        const attr = {
            "style": {
                "color": "red",
                "font-size": "14px"
            }
        } as Attributes;

        const resultString = attributeToString(attr);

        expect(resultString).toEqual(' style="color:red; font-size:14px; "');
        done();
    });
    it('Should convert arrays into comma-separated values', done => {
        const attr = {
            "data-values": [10, 20, 30]
        } as Attributes;

        const resultString = attributeToString(attr);

        expect(resultString).toEqual(' data-values="10, 20, 30"');
        done();
    });
    it('Should handle special characters in values properly', done => {
        const attr = {
            "title": 'This & That > Those < Them "Quoted"',
            "description": "Hello <script>alert(xss)</script>"
        } as Attributes;

        const resultString = attributeToString(attr);

        expect(resultString).toEqual(' title="This &amp; That &gt; Those &lt; Them &quot;Quoted&quot;" description="Hello &lt;script&gt;alert(xss)&lt;/script&gt;"');
        done();
    });

    it('Should handle mixed types of values properly', done => {
        const attr = {
            "rows": 5,
            "isEnabled": true,
            "ids": [101, 102],
            "style": { "margin": "10px", "padding": "5px" }
        } as Attributes;

        const resultString = attributeToString(attr);

        expect(resultString).toEqual(' rows="5" isEnabled="true" ids="101, 102" style="margin:10px; padding:5px; "');
        done();
    });
    it('Should sanitize both keys and values to prevent HTML injection', done => {
        const attr = {
            "<script>alert('key')</script>": "test",
            "safeKey": "<script>alert(xss)</script>"
        } as Attributes;

        const resultString = attributeToString(attr);

        expect(resultString).toEqual(' safeKey="&lt;script&gt;alert(xss)&lt;/script&gt;"');
        done();
    });
})