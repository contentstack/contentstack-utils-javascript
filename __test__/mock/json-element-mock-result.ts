const plainTextHtml = "<strong>Aliquam sit amet libero dapibus, eleifend ligula at, varius justo</strong><strong><em>Lorem ipsum</em></strong><strong><em><u>dolor sit amet</u></em></strong><strong><em><u><strike><br />consectetur adipiscing elit.</strike></u></em></strong><strong><em><u><span>Sed condimentum iaculis magna in vehicula. </span></u></em></strong><strong><em><u><sup>  Vestibulum vitae convallis </sup></u></em></strong><strong><em><u><sub> lacus. </sub></u></em></strong>"
const paragraphHtml = "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum iaculis magna in vehicula. Vestibulum vitae convallis lacus. Praesent a diam iaculis turpis rhoncus faucibus. Aliquam sed pulvinar sem.</p>"
const h1Html = "<h1><strong><em><u><sub>Lorem ipsum dolor sit amet.</sub></u></em></strong></h1>" 
const h2Html = "<h2><strong><em><u><sub>Vestibulum a ligula eget massa sagittis aliquam sit amet quis tortor. </sub></u></em></strong></h2>"
const h3Html = "<h3><strong><em><u><sub>Mauris venenatis dui id massa sollicitudin, non bibendum nunc dictum.</sub></u></em></strong></h3>"
const h4Html = "<h4><strong><em><u><sub>MaNullam feugiat turpis quis elit interdum, vitae laoreet quam viverra</sub></u></em></strong></h4>"
const h5Html = "<h5>Mauris venenatis dui id massa sollicitudin, non bibendum nunc dictum.</h5>"
const h6Html = "<h6>Nunc porta diam vitae purus semper, ut consequat lorem vehicula.</h6>"
const orderListHtml = "<ol><li style=\"text-align:justify;\">Morbi in quam molestie, fermentum diam vitae, bibendum ipsum.</li><li style=\"text-align:justify;\">Pellentesque mattis lacus in quam aliquam congue</li><li style=\"text-align:justify;\">Integer feugiat leo dignissim, lobortis enim vitae, mollis lectus.</li><li style=\"text-align:justify;\">Sed in ante lacinia, molestie metus eu, fringilla sapien.</li></ol>"
const unorderListHtml = "<ul><li>Sed quis metus sed mi hendrerit mollis vel et odio.</li><li>Integer vitae sem dignissim, elementum libero vel, fringilla massa.</li><li>Integer imperdiet arcu sit amet tortor faucibus aliquet.</li><li>Aenean scelerisque velit vitae dui vehicula, at congue massa sagittis.</li></ul>"
const imgHtml = "<img src=\"https://image.url/Donald.jog.png\" />"
const tableHtml = "<table><thead><tr><th><p>Header 1</p></th><th><p>Header 2</p></th></tr></thead><tbody><tr><td><p>Body row 1 data 1</p></td><td><p>Body row 1 data 2</p></td></tr><tr><td><p>Body row 2 data 1</p></td><td><p>Body row 2 data 2</p></td></tr></tbody></table>"
const blockquoteHtml = "<blockquote>Praesent eu ex sed nibh venenatis pretium.</blockquote>"
const codeHtml = "<code>Code template.</code>"
const linkInPHtml = "<strong><em><u><sub></sub></u></em></strong><a href=\"LINK.com\">LINK</a>"
const linkInPURLHtml = "<strong><em><u><sub></sub></u></em></strong><a href=\"LINK.com\" target=\"_blank\">LINK</a>"
const styleinPHtml = "<p style=\"text-align:right;\">This is <span>second</span> <u>JSON</u> entry</p><p style=\"text-align:left;\"><a href=\"example.com\" target=\"_blank\">Example</a></p>"
const plainTextHtmlWithClass = "<p class=\"class_p\"><span class=\"yellow\">abc</span><u><span class=\"blue\">ghi</span></u><strong><em><u><span class=\"orange\" id=\"blue\">Basic</span></u></em></strong><h1><span class=\"purple\">abc</span></h1></p>"
const plainTextHtmlWithId = "<p class=\"class_p\"><em><u><span id=\"blue\">data</span></u></em></p>"
const htmlTextIdInAttrs = "<p id=\"id_p\"><em><u>data</u></em></p>"
const classAndIdAttrsHtml = "<a class=\"class_a\" id=\"id_p\" href=\"LINK.com\">link</a><img class=\"class_img\" id=\"id_img\" src=\"https://dummyImage.url/Donald.jog.png\" /><h1 class=\"class_h1\" id=\"id_h1\">heading1</h1><h2 class=\"class_h2\" id=\"id_h2\">heading2</h2><h3 class=\"class_h3\" id=\"id_h3\">heading3</h3><h4 class=\"class_h4\" id=\"id_h4\">heading4</h4><h5 class=\"class_h5\" id=\"id_h5\">heading5</h5><h6 class=\"class_h6\" id=\"id_h6\">heading6</h6>"
export {
    h1Html,
    h2Html,
    h3Html,
    h4Html,
    h5Html,
    h6Html,
    imgHtml,
    codeHtml,
    tableHtml,
    linkInPHtml,
    orderListHtml,
    paragraphHtml,
    plainTextHtml,
    linkInPURLHtml,
    blockquoteHtml,
    unorderListHtml,
    styleinPHtml,
    plainTextHtmlWithClass,
    plainTextHtmlWithId,
    htmlTextIdInAttrs,
    classAndIdAttrsHtml
}