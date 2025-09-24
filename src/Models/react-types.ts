/**
 * React integration types for Contentstack Utils
 * These types are only used when React is available in the consuming application
 */

// React types (defined locally to avoid React dependency)
export interface ReactElement {
  type: any;
  props: any;
  key: string | number | null;
}

export interface ReactNode {
  [key: string]: any;
}

export interface ReactComponent<P = {}> {
  (props: P): ReactElement | null;
}

// React-specific render function types
export type ReactRenderNode = (node: import('../nodes/node').default, children: ReactNode[]) => ReactNode;
export type ReactRenderMark = (text: string, props?: any) => ReactNode;

// React render options interface
export interface ReactRenderOptions {
  [nodeType: string]: ReactRenderNode | ReactRenderMark | ReactNode;
}

// Props that can be extracted from Contentstack node attributes
export interface ReactNodeProps {
  style?: { [key: string]: string | number } | string;
  className?: string;
  id?: string;
  [key: string]: any;
}

// React integration options
export interface JsonToReactOptions {
  entry: import('./embedded-object').EntryEmbedable | import('./embedded-object').EntryEmbedable[];
  paths: string[];
  renderOptions?: ReactRenderOptions;
  createElement?: (type: any, props?: any, ...children: any[]) => ReactElement;
}
