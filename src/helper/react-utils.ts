/**
 * React utility functions for Contentstack Utils
 * This module provides utilities to convert JSON RTE to React elements
 */

import { ReactElement, ReactNode, ReactNodeProps } from '../Models/react-types';
import Node from '../nodes/node';
import TextNode from '../nodes/text-node';
import { AnyNode } from '../json-to-html';

/**
 * Default React createElement function
 * This is a fallback that assumes React is available globally
 */
let defaultCreateElement: (type: any, props?: any, ...children: any[]) => ReactElement;

try {
  // Try to use React if it's available
  const React = (globalThis as any).React || (typeof window !== 'undefined' ? (window as any).React : null);
  if (React && React.createElement) {
    defaultCreateElement = React.createElement;
  } else {
    // Fallback createElement function
    defaultCreateElement = (type: any, props: any = {}, ...children: any[]) => ({
      type,
      props: { ...props, children: children.length === 1 ? children[0] : children },
      key: props.key || null,
    });
  }
} catch (error) {
  // Fallback createElement function
  defaultCreateElement = (type: any, props: any = {}, ...children: any[]) => ({
    type,
    props: { ...props, children: children.length === 1 ? children[0] : children },
    key: props.key || null,
  });
}

/**
 * Extract React props from Contentstack node attributes
 */
export function getReactProps(node: Node): ReactNodeProps {
  const props: ReactNodeProps = {};
  
  if (node.attrs) {
    // Handle style attribute
    if (node.attrs.style) {
      if (typeof node.attrs.style === 'string') {
        props.style = parseStyleString(node.attrs.style);
      } else {
        props.style = node.attrs.style;
      }
    }
    
    // Handle class attribute (convert to className for React)
    if (node.attrs['class-name']) {
      props.className = node.attrs['class-name'];
    }
    
    // Handle id attribute
    if (node.attrs.id) {
      props.id = node.attrs.id;
    }
    
    // Handle other common attributes
    if (node.attrs.href) props.href = node.attrs.href;
    if (node.attrs.url && !props.href) props.href = node.attrs.url;
    if (node.attrs.src) props.src = node.attrs.src;
    if (node.attrs.alt) props.alt = node.attrs.alt;
    if (node.attrs.target) props.target = node.attrs.target;
    if (node.attrs.title) props.title = node.attrs.title;
    
    // Handle table-specific attributes
    if (node.attrs.rowSpan) props.rowSpan = node.attrs.rowSpan;
    if (node.attrs.colSpan) props.colSpan = node.attrs.colSpan;
  }
  
  return props;
}

/**
 * Parse CSS style string into React style object
 */
export function parseStyleString(styleStr: string): { [key: string]: string | number } {
  const styles: any = {};
  
  if (!styleStr || typeof styleStr !== 'string') {
    return styles;
  }
  
  styleStr.split(';').forEach(rule => {
    const colonIndex = rule.indexOf(':');
    if (colonIndex === -1) return;
    
    const property = rule.substring(0, colonIndex).trim();
    const value = rule.substring(colonIndex + 1).trim();
    
    if (property && value) {
      // Convert kebab-case to camelCase for React
      const camelProperty = property.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
      styles[camelProperty] = value;
    }
  });
  
  return styles;
}

/**
 * Convert text node to React element with formatting
 */
export function textNodeToReact(
  node: TextNode, 
  createElement: (type: any, props?: any, ...children: any[]) => ReactElement = defaultCreateElement
): ReactNode {
  let element: any = node.text;
  
  // Apply text formatting (innermost to outermost)
  if (node.superscript) {
    element = createElement('sup', {}, element);
  }
  if (node.subscript) {
    element = createElement('sub', {}, element);
  }
  if (node.inlineCode) {
    element = createElement('code', {}, element);
  }
  if (node.strikethrough) {
    element = createElement('s', {}, element);
  }
  if (node.underline) {
    element = createElement('u', {}, element);
  }
  if (node.italic) {
    element = createElement('em', {}, element);
  }
  if (node.bold) {
    element = createElement('strong', {}, element);
  }
  
  // Handle break
  if (node.break) {
    return [element, createElement('br', { key: 'break' })];
  }
  
  return element;
}

/**
 * Check if a value is a React element
 */
export function isReactElement(value: any): value is ReactElement {
  return value && typeof value === 'object' && 'type' in value && 'props' in value;
}

/**
 * Add key prop to React element if it doesn't have one
 */
export function addKeyToReactElement(
  element: ReactElement, 
  key: string | number,
  createElement: (type: any, props?: any, ...children: any[]) => ReactElement = defaultCreateElement
): ReactElement {
  if (element.key !== null) {
    return element;
  }
  
  return createElement(element.type, { ...element.props, key }, element.props.children);
}

/**
 * Helper function to set nested property in an object
 */
export function setNestedProperty(obj: any, path: string, value: any): void {
  const keys = path.split('.');
  let current = obj;
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current) || typeof current[key] !== 'object' || current[key] === null) {
      current[key] = {};
    }
    current = current[key];
  }
  
  current[keys[keys.length - 1]] = value;
}

/**
 * Helper function to get nested property from an object
 */
export function getNestedProperty(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

export { defaultCreateElement };
