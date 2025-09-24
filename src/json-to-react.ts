/**
 * JSON RTE to React converter for Contentstack Utils
 * This module provides the main functionality to convert Contentstack JSON RTE to React elements
 */

import { JsonToReactOptions, ReactRenderOptions, ReactRenderNode, ReactNode, ReactElement } from './Models/react-types';
import { EntryEmbedable } from './Models/embedded-object';
import { findRenderContent } from './helper/find-render-content';
import Document from './nodes/document';
import Node from './nodes/node';
import TextNode from './nodes/text-node';
import NodeType from './nodes/node-type';
import { AnyNode } from './json-to-html';
import { 
  getReactProps, 
  textNodeToReact, 
  isReactElement, 
  addKeyToReactElement, 
  setNestedProperty,
  defaultCreateElement 
} from './helper/react-utils';

/**
 * Default React render options for standard HTML elements
 */
export const defaultReactRenderOptions: ReactRenderOptions = {
  [NodeType.DOCUMENT]: (node: Node, children: ReactNode[]) => children,
  
  [NodeType.PARAGRAPH]: (node: Node, children: ReactNode[]) => 
    defaultCreateElement('p', getReactProps(node), ...children),
  
  [NodeType.ORDER_LIST]: (node: Node, children: ReactNode[]) => 
    defaultCreateElement('ol', getReactProps(node), ...children),
  
  [NodeType.UNORDER_LIST]: (node: Node, children: ReactNode[]) => 
    defaultCreateElement('ul', getReactProps(node), ...children),
  
  [NodeType.LIST_ITEM]: (node: Node, children: ReactNode[]) => 
    defaultCreateElement('li', getReactProps(node), ...children),
  
  [NodeType.HEADING_1]: (node: Node, children: ReactNode[]) => 
    defaultCreateElement('h1', getReactProps(node), ...children),
  
  [NodeType.HEADING_2]: (node: Node, children: ReactNode[]) => 
    defaultCreateElement('h2', getReactProps(node), ...children),
  
  [NodeType.HEADING_3]: (node: Node, children: ReactNode[]) => 
    defaultCreateElement('h3', getReactProps(node), ...children),
  
  [NodeType.HEADING_4]: (node: Node, children: ReactNode[]) => 
    defaultCreateElement('h4', getReactProps(node), ...children),
  
  [NodeType.HEADING_5]: (node: Node, children: ReactNode[]) => 
    defaultCreateElement('h5', getReactProps(node), ...children),
  
  [NodeType.HEADING_6]: (node: Node, children: ReactNode[]) => 
    defaultCreateElement('h6', getReactProps(node), ...children),
  
  [NodeType.LINK]: (node: Node, children: ReactNode[]) => 
    defaultCreateElement('a', getReactProps(node), ...children),
  
  [NodeType.IMAGE]: (node: Node, children: ReactNode[]) => 
    defaultCreateElement('img', getReactProps(node)),
  
  [NodeType.EMBED]: (node: Node, children: ReactNode[]) => 
    defaultCreateElement('iframe', getReactProps(node), ...children),
  
  [NodeType.BLOCK_QUOTE]: (node: Node, children: ReactNode[]) => 
    defaultCreateElement('blockquote', getReactProps(node), ...children),
  
  [NodeType.CODE]: (node: Node, children: ReactNode[]) => 
    defaultCreateElement('code', getReactProps(node), ...children),
  
  [NodeType.HR]: (node: Node, children: ReactNode[]) => 
    defaultCreateElement('hr', getReactProps(node)),
  
  [NodeType.TABLE]: (node: Node, children: ReactNode[]) => {
    const props = getReactProps(node);
    
    // Handle colgroup for table column widths
    let colgroupElement = null;
    if (node.attrs.colWidths && Array.isArray(node.attrs.colWidths)) {
      const totalWidth = node.attrs.colWidths.reduce((sum: number, width: number) => sum + width, 0);
      const cols = node.attrs.colWidths.map((colWidth: number, index: number) => {
        const widthPercentage = (colWidth / totalWidth) * 100;
        return defaultCreateElement('col', {
          key: `col-${index}`,
          style: { width: `${widthPercentage.toFixed(2)}%` }
        });
      });
      colgroupElement = defaultCreateElement('colgroup', {
        key: 'colgroup',
        'data-width': totalWidth
      }, ...cols);
    }
    
    const tableChildren = colgroupElement ? [colgroupElement, ...children] : children;
    return defaultCreateElement('table', props, ...tableChildren);
  },
  
  [NodeType.TABLE_HEADER]: (node: Node, children: ReactNode[]) => 
    defaultCreateElement('thead', getReactProps(node), ...children),
  
  [NodeType.TABLE_BODY]: (node: Node, children: ReactNode[]) => 
    defaultCreateElement('tbody', getReactProps(node), ...children),
  
  [NodeType.TABLE_FOOTER]: (node: Node, children: ReactNode[]) => 
    defaultCreateElement('tfoot', getReactProps(node), ...children),
  
  [NodeType.TABLE_ROW]: (node: Node, children: ReactNode[]) => 
    defaultCreateElement('tr', getReactProps(node), ...children),
  
  [NodeType.TABLE_HEAD]: (node: Node, children: ReactNode[]) => {
    if (node.attrs.void) return null;
    return defaultCreateElement('th', getReactProps(node), ...children);
  },
  
  [NodeType.TABLE_DATA]: (node: Node, children: ReactNode[]) => {
    if (node.attrs.void) return null;
    return defaultCreateElement('td', getReactProps(node), ...children);
  },
  
  [NodeType.FRAGMENT]: (node: Node, children: ReactNode[]) => 
    defaultCreateElement('fragment', getReactProps(node), ...children),
  
  // Default handler for unknown node types
  default: (node: Node, children: ReactNode[]) => 
    defaultCreateElement('div', getReactProps(node), ...children),
};

/**
 * Convert a single node to React element
 */
function nodeToReact(
  node: AnyNode,
  renderOptions: ReactRenderOptions,
  createElement: (type: any, props?: any, ...children: any[]) => ReactElement,
  key?: string | number
): ReactNode {
  // Handle text nodes
  if (!node.type) {
    return textNodeToReact(node as TextNode, createElement);
  }
  
  // Process children recursively
  const children = node.children ? node.children.map((child, index) => 
    nodeToReact(child, renderOptions, createElement, index)
  ).filter(child => child !== null && child !== undefined) : [];
  
  // Get renderer for this node type
  const renderer = renderOptions[node.type] || renderOptions.default;
  
  if (typeof renderer === 'function') {
    const result = (renderer as ReactRenderNode)(node, children);
    
    // Add key if it's a React element and key is provided
    if (isReactElement(result) && key !== undefined) {
      return addKeyToReactElement(result, key, createElement);
    }
    
    return result;
  }
  
  // Fallback: return children wrapped in a div
  return createElement('div', { key }, ...children);
}

/**
 * Convert Document or Document array to React elements
 */
function documentToReact(
  content: Document | Document[],
  renderOptions: ReactRenderOptions,
  createElement: (type: any, props?: any, ...children: any[]) => ReactElement
): ReactNode | ReactNode[] {
  if (content instanceof Array) {
    return content.map((doc, index) => {
      if (doc.type === 'doc') {
        const children = doc.children ? doc.children.map((child, childIndex) =>
          nodeToReact(child, renderOptions, createElement, childIndex)
        ).filter(child => child !== null && child !== undefined) : [];
        
        // For document arrays, wrap each document in a fragment or return children directly
        return children.length === 1 ? children[0] : createElement('div', { key: index }, ...children);
      }
      return nodeToReact(doc as any, renderOptions, createElement, index);
    });
  } else if (content.type === 'doc') {
    const children = content.children ? content.children.map((child, index) =>
      nodeToReact(child, renderOptions, createElement, index)
    ).filter(child => child !== null && child !== undefined) : [];
    
    // For single document, return children directly or wrapped in fragment
    return children.length === 1 ? children[0] : createElement('div', {}, ...children);
  }
  
  return nodeToReact(content as any, renderOptions, createElement);
}

/**
 * Main function to convert JSON RTE to React elements
 * This function modifies the entry object in place, replacing JSON RTE content with React elements
 */
export function jsonToReact(options: JsonToReactOptions): void {
  const {
    entry,
    paths,
    renderOptions = {},
    createElement = defaultCreateElement
  } = options;
  
  // Merge default and custom render options
  const mergedRenderOptions: ReactRenderOptions = {
    ...defaultReactRenderOptions,
    ...renderOptions
  };
  
  function processEntry(entryItem: EntryEmbedable): void {
    for (const path of paths) {
      findRenderContent(path, entryItem, (content: Document | Document[]) => {
        const reactElement = documentToReact(content, mergedRenderOptions, createElement);
        setNestedProperty(entryItem, path, reactElement);
        return content as any; // Return original to satisfy the callback
      });
    }
  }
  
  if (entry instanceof Array) {
    entry.forEach(processEntry);
  } else {
    processEntry(entry);
  }
}

/**
 * Create a jsonToReact function with custom createElement
 * Useful when you want to use a specific React version or custom createElement function
 */
export function createJsonToReact(createElement: (type: any, props?: any, ...children: any[]) => ReactElement) {
  return (options: Omit<JsonToReactOptions, 'createElement'>) => {
    jsonToReact({ ...options, createElement });
  };
}

export { ReactRenderOptions, JsonToReactOptions } from './Models/react-types';
