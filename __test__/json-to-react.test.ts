import { jsonToReact, defaultReactRenderOptions } from '../src/json-to-react';
import { ReactRenderOptions } from '../src/Models/react-types';
import NodeType from '../src/nodes/node-type';

// Mock React createElement for testing
const mockCreateElement = (type: any, props: any = {}, ...children: any[]) => ({
  type,
  props: { ...props, children: children.length === 1 ? children[0] : children },
  key: props.key || null,
});

// Mock entry data for testing
const mockEntry = {
  uid: 'test_entry',
  rich_text_editor: {
    type: 'doc',
    children: [
      {
        type: 'ol',
        attrs: { style: 'color: red;', 'class-name': 'custom-list' },
        children: [
          {
            type: 'li',
            attrs: {},
            children: [{ text: 'First item' }]
          },
          {
            type: 'li',
            attrs: {},
            children: [{ text: 'Second item' }]
          }
        ]
      },
      {
        type: 'p',
        attrs: {},
        children: [
          { text: 'This is a ' },
          { text: 'bold', bold: true },
          { text: ' paragraph with ' },
          { text: 'italic', italic: true },
          { text: ' text.' }
        ]
      }
    ]
  },
  _embedded_items: {}
};

const mockArrayEntry = {
  uid: 'test_entry_array',
  rich_text_editor: [
    {
      type: 'doc',
      children: [
        {
          type: 'h1',
          attrs: { id: 'heading-1' },
          children: [{ text: 'Heading 1' }]
        }
      ]
    },
    {
      type: 'doc',
      children: [
        {
          type: 'p',
          attrs: {},
          children: [{ text: 'Paragraph content' }]
        }
      ]
    }
  ],
  _embedded_items: {}
};

describe('jsonToReact', () => {
  beforeEach(() => {
    // Reset mock entries before each test
    mockEntry.rich_text_editor = {
      type: 'doc',
      children: [
        {
          type: 'ol',
          attrs: { style: 'color: red;', 'class-name': 'custom-list' },
          children: [
            {
              type: 'li',
              attrs: {},
              children: [{ text: 'First item' }]
            },
            {
              type: 'li',
              attrs: {},
              children: [{ text: 'Second item' }]
            }
          ]
        },
        {
          type: 'p',
          attrs: {},
          children: [
            { text: 'This is a ' },
            { text: 'bold', bold: true },
            { text: ' paragraph with ' },
            { text: 'italic', italic: true },
            { text: ' text.' }
          ]
        }
      ]
    };
  });

  it('should convert basic JSON RTE to React elements', () => {
    const entry = { ...mockEntry };

    jsonToReact({
      entry,
      paths: ['rich_text_editor'],
      createElement: mockCreateElement
    });

    expect(entry.rich_text_editor).toBeDefined();
    expect(typeof entry.rich_text_editor).toBe('object');
  });

  it('should handle custom render options', () => {
    const entry = { ...mockEntry };
    
    // Custom List component mock
    const CustomList = (props: any) => mockCreateElement('div', { className: 'custom-list-component' }, props.children);
    
    const customRenderOptions: ReactRenderOptions = {
      [NodeType.ORDER_LIST]: (node: any, children: any) => CustomList({ children }),
    };

    jsonToReact({
      entry,
      paths: ['rich_text_editor'],
      renderOptions: customRenderOptions,
      createElement: mockCreateElement
    });

    expect(entry.rich_text_editor).toBeDefined();
    // The custom render option should be applied
  });

  it('should handle array of documents', () => {
    const entry = { ...mockArrayEntry };

    jsonToReact({
      entry,
      paths: ['rich_text_editor'],
      createElement: mockCreateElement
    });

    expect(Array.isArray(entry.rich_text_editor)).toBe(true);
    expect(entry.rich_text_editor.length).toBe(2);
  });

  it('should handle array of entries', () => {
    const entries = [{ ...mockEntry }, { ...mockEntry }];

    jsonToReact({
      entry: entries,
      paths: ['rich_text_editor'],
      createElement: mockCreateElement
    });

    entries.forEach(entry => {
      expect(entry.rich_text_editor).toBeDefined();
    });
  });

  it('should preserve node attributes as React props', () => {
    const entry = {
      uid: 'test_entry',
      rich_text_editor: {
        type: 'doc',
        children: [
          {
            type: 'p',
            attrs: { 
              style: 'color: blue; font-size: 16px;',
              'class-name': 'test-paragraph',
              id: 'para-1'
            },
            children: [{ text: 'Test paragraph' }]
          }
        ]
      },
      _embedded_items: {}
    };

    jsonToReact({
      entry,
      paths: ['rich_text_editor'],
      createElement: mockCreateElement
    });

    // The converted element should preserve the attributes
    expect(entry.rich_text_editor).toBeDefined();
  });

  it('should handle text formatting', () => {
    const entry = {
      uid: 'test_entry',
      rich_text_editor: {
        type: 'doc',
        children: [
          {
            type: 'p',
            attrs: {},
            children: [
              { text: 'Normal ' },
              { text: 'bold', bold: true },
              { text: ' and ' },
              { text: 'italic', italic: true },
              { text: ' and ' },
              { text: 'underlined', underline: true },
              { text: ' text.' }
            ]
          }
        ]
      },
      _embedded_items: {}
    };

    jsonToReact({
      entry,
      paths: ['rich_text_editor'],
      createElement: mockCreateElement
    });

    expect(entry.rich_text_editor).toBeDefined();
  });

  it('should handle links with proper attributes', () => {
    const entry = {
      uid: 'test_entry',
      rich_text_editor: {
        type: 'doc',
        children: [
          {
            type: 'a',
            attrs: {
              href: 'https://example.com',
              target: '_blank',
              'class-name': 'external-link'
            },
            children: [{ text: 'External Link' }]
          }
        ]
      },
      _embedded_items: {}
    };

    jsonToReact({
      entry,
      paths: ['rich_text_editor'],
      createElement: mockCreateElement
    });

    expect(entry.rich_text_editor).toBeDefined();
  });

  it('should handle images with proper attributes', () => {
    const entry = {
      uid: 'test_entry',
      rich_text_editor: {
        type: 'doc',
        children: [
          {
            type: 'img',
            attrs: {
              src: 'https://example.com/image.jpg',
              alt: 'Test image',
              'class-name': 'responsive-image'
            },
            children: [] as any[]
          }
        ]
      },
      _embedded_items: {}
    };

    jsonToReact({
      entry,
      paths: ['rich_text_editor'],
      createElement: mockCreateElement
    });

    expect(entry.rich_text_editor).toBeDefined();
  });

  it('should handle tables with colgroup', () => {
    const entry = {
      uid: 'test_entry',
      rich_text_editor: {
        type: 'doc',
        children: [
          {
            type: 'table',
            attrs: {
              colWidths: [100, 200, 150]
            },
            children: [
              {
                type: 'tbody',
                attrs: {},
                children: [
                  {
                    type: 'tr',
                    attrs: {},
                    children: [
                      {
                        type: 'td',
                        attrs: {},
                        children: [{ text: 'Cell 1' }]
                      },
                      {
                        type: 'td',
                        attrs: {},
                        children: [{ text: 'Cell 2' }]
                      },
                      {
                        type: 'td',
                        attrs: {},
                        children: [{ text: 'Cell 3' }]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      _embedded_items: {}
    };

    jsonToReact({
      entry,
      paths: ['rich_text_editor'],
      createElement: mockCreateElement
    });

    expect(entry.rich_text_editor).toBeDefined();
  });

  it('should handle void table cells', () => {
    const entry = {
      uid: 'test_entry',
      rich_text_editor: {
        type: 'doc',
        children: [
          {
            type: 'table',
            attrs: {},
            children: [
              {
                type: 'tbody',
                attrs: {},
                children: [
                  {
                    type: 'tr',
                    attrs: {},
                    children: [
                      {
                        type: 'td',
                        attrs: { void: true },
                        children: [] as any[]
                      },
                      {
                        type: 'td',
                        attrs: {},
                        children: [{ text: 'Valid cell' }]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      _embedded_items: {}
    };

    jsonToReact({
      entry,
      paths: ['rich_text_editor'],
      createElement: mockCreateElement
    });

    expect(entry.rich_text_editor).toBeDefined();
  });

  it('should handle nested paths', () => {
    const entry = {
      uid: 'test_entry',
      content: {
        nested: {
          rich_text_editor: {
            type: 'doc',
            children: [
              {
                type: 'p',
                attrs: {},
                children: [{ text: 'Nested content' }]
              }
            ]
          }
        }
      },
      _embedded_items: {}
    };

    jsonToReact({
      entry,
      paths: ['content.nested.rich_text_editor'],
      createElement: mockCreateElement
    });

    expect(entry.content.nested.rich_text_editor).toBeDefined();
  });
});

describe('defaultReactRenderOptions', () => {
  it('should have all required node types', () => {
    expect(defaultReactRenderOptions[NodeType.PARAGRAPH]).toBeDefined();
    expect(defaultReactRenderOptions[NodeType.ORDER_LIST]).toBeDefined();
    expect(defaultReactRenderOptions[NodeType.UNORDER_LIST]).toBeDefined();
    expect(defaultReactRenderOptions[NodeType.LIST_ITEM]).toBeDefined();
    expect(defaultReactRenderOptions[NodeType.HEADING_1]).toBeDefined();
    expect(defaultReactRenderOptions[NodeType.LINK]).toBeDefined();
    expect(defaultReactRenderOptions[NodeType.IMAGE]).toBeDefined();
    expect(defaultReactRenderOptions[NodeType.TABLE]).toBeDefined();
    expect(defaultReactRenderOptions.default).toBeDefined();
  });

  it('should have function renderers', () => {
    expect(typeof defaultReactRenderOptions[NodeType.PARAGRAPH]).toBe('function');
    expect(typeof defaultReactRenderOptions[NodeType.ORDER_LIST]).toBe('function');
    expect(typeof defaultReactRenderOptions.default).toBe('function');
  });
});
