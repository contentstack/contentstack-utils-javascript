enum NodeType {
    DOCUMENT = 'doc',
    PARAGRAPH = 'p',
    
    LINK = 'a',
    IMAGE = 'img',
    EMBED = 'embed',

    HEADING_1 = 'h1',
    HEADING_2 = 'h2',
    HEADING_3 = 'h3',
    HEADING_4 = 'h4',
    HEADING_5 = 'h5',
    HEADING_6 = 'h6',
  
    ORDER_LIST = 'ol',
    UNORDER_LIST = 'ul',
    LIST_ITEM = 'li',
  
    HR = 'hr',

    TABLE = 'table',
    TABLE_HEADER = 'thead',
    TABLE_BODY = 'tbody',
    TABLE_FOOTER = 'tfoot',
    TABLE_ROW = 'tr',
    TABLE_HEAD = 'th',
    TABLE_DATA = 'td',

    BLOCK_QUOTE = 'blockquote',
    CODE = 'code',

    TEXT = 'text',
    REFERENCE = 'reference'
}

export default NodeType;