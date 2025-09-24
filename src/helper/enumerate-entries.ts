import { AnyNode } from '../json-to-html';
import { EmbeddedItem, EntryEmbedable } from '../Models/embedded-object';
import { Metadata, nodeToMetadata, styleObjType } from '../Models/metadata-model';
import MarkType from '../nodes/mark-type';
import TextNode from '../nodes/text-node';
import Node from '../nodes/node';
import Document from '../nodes/document';
import { Next, RenderMark, RenderNode, RenderOption } from '../options';
import { defaultNodeOption } from '../options/default-node-options';
import { findRenderString } from './find-embeded-object';
import { EntryNode } from '../Models/json-rte-model';
import { replaceHtmlEntities } from './string-utils';

export function enumerate(
  entries: EntryEmbedable[] | EmbeddedItem[],
  process: (entry: EntryEmbedable | EmbeddedItem) => void,
) {
  for (const entry of entries) {
    process(entry);
  }
}

export function enumerateContents(
  content: Document | Document[],
  renderOption?: RenderOption,
  renderEmbed?: (metadata: Metadata) => EmbeddedItem | EntryNode,
): string | string[] {
  if (!(content instanceof Array) && content.type !== 'doc') {
    return content as unknown as string;
  }
  if (content instanceof Array) {
    const result: string[] = [];
    content.forEach((doc) => {
      result.push(enumerateContents(doc, renderOption, renderEmbed) as string);
    });
    return result;
  }
  const commonRenderOption = {
    ...defaultNodeOption,
    ...renderOption,
  };
  return nodeChildrenToHTML(content.children, commonRenderOption, renderEmbed);
}

export function textNodeToHTML(node: TextNode, renderOption: RenderOption): string {
  let text = replaceHtmlEntities(node.text);
  
  // Convert newlines to <br /> tags if there are no other marks
  // This ensures newlines are always handled consistently
  let hasMarks = false;
  
  if (node.classname || node.id) {
    text = (renderOption[MarkType.CLASSNAME_OR_ID] as RenderMark)(text, node.classname, node.id);
    hasMarks = true;
  }
  if (node.break) {
    text = (renderOption[MarkType.BREAK] as RenderMark)(text);
    hasMarks = true;
  }
  if (node.superscript) {
    text = (renderOption[MarkType.SUPERSCRIPT] as RenderMark)(text);
    hasMarks = true;
  }
  if (node.subscript) {
    text = (renderOption[MarkType.SUBSCRIPT] as RenderMark)(text);
    hasMarks = true;
  }
  if (node.inlineCode) {
    text = (renderOption[MarkType.INLINE_CODE] as RenderMark)(text);
    hasMarks = true;
  }
  if (node.strikethrough) {
    text = (renderOption[MarkType.STRIKE_THROUGH] as RenderMark)(text);
    hasMarks = true;
  }
  if (node.underline) {
    text = (renderOption[MarkType.UNDERLINE] as RenderMark)(text);
    hasMarks = true;
  }
  if (node.italic) {
    text = (renderOption[MarkType.ITALIC] as RenderMark)(text);
    hasMarks = true;
  }
  if (node.bold) {
    text = (renderOption[MarkType.BOLD] as RenderMark)(text);
    hasMarks = true;
  }
  
  // If no marks were applied, but text contains newlines, convert them to <br />
  if (!hasMarks && text.includes('\n')) {
    text = text.replace(/\n/g, '<br />');
  }
  
  return text;
}
export function referenceToHTML(
  node: Node,
  renderOption: RenderOption,
  renderEmbed?: (metadata: Metadata) => EmbeddedItem | EntryNode,
): string {

  function sendToRenderOption(referenceNode: Node): string {
    const next: Next = (nodes) => nodeChildrenToHTML(nodes, renderOption, renderEmbed);
    return (renderOption[referenceNode.type] as RenderNode)(referenceNode, next);
  }

  if ((node.attrs.type === 'entry' || node.attrs.type === 'asset') && node.attrs['display-type'] === 'link') {
    const entryText = node.children ? nodeChildrenToHTML(node.children, renderOption, renderEmbed) : '';
    if (renderOption[node.type] !== undefined) {
      return sendToRenderOption(node);
    }

    let aTagAttrs = `${node.attrs.style ? ` style="${node.attrs.style}"` : ``}${node.attrs['class-name'] ? ` class="${node.attrs['class-name']}"` : ``}${node.attrs.id ? ` id="${node.attrs.id}"` : ``} href="${node.attrs.href || node.attrs.url}"`;
    if (node.attrs.target) {
      aTagAttrs +=` target="${node.attrs.target}"`;
    }
    if(node.attrs.type == 'asset') {
      aTagAttrs += ` type="asset" content-type-uid="sys_assets" ${node.attrs['asset-uid'] ? `data-sys-asset-uid="${node.attrs['asset-uid']}"` : ``} sys-style-type="download"`
    }
    const aTag = `<a${aTagAttrs}>${entryText}</a>`;
    return aTag;
  }
 
  if (!renderEmbed && renderOption[node.type] !== undefined) {
    return sendToRenderOption(node);
  }
  if (!renderEmbed) {
    return '';
  }
  const metadata = nodeToMetadata(
    node.attrs,
    (node.children && node.children.length > 0 ? node.children[0] : {}) as unknown as TextNode,
  );
  const item = renderEmbed(metadata);
  if (!item && renderOption[node.type] !== undefined) {
    return sendToRenderOption(node);
  }
  
  return findRenderString(item, metadata, renderOption);

}

function nodeChildrenToHTML(
  nodes: AnyNode[],
  renderOption: RenderOption,
  renderEmbed?: (metadata: Metadata) => EmbeddedItem | EntryNode,
): string {
  return nodes.map<string>((node: AnyNode) => nodeToHTML(node, renderOption, renderEmbed)).join('');
}

function styleObjectToString(styleObj: styleObjType): string {
  if (!styleObj) return '';
  if (typeof styleObj === 'string') {
    return styleObj;
  }
  let styleString: string = '';
  for (const key in styleObj) {
    if (styleObj.hasOwnProperty(key)) {
      const value = styleObj[key];
      styleString += `${key}:${value};`;
    }
  }
  return styleString;
}

function nodeToHTML(
  node: AnyNode,
  renderOption: RenderOption,
  renderEmbed?: (metadata: Metadata) => EmbeddedItem | EntryNode,
): string {
  if (node?.attrs?.style) {
    node.attrs.style = styleObjectToString(node.attrs.style as styleObjType);
  }
  if (!node.type) {
    return textNodeToHTML(node as TextNode, renderOption);
  } else if ((node.type as string) === 'reference') {
    return referenceToHTML(node, renderOption, renderEmbed);
  } else {
    const next: Next = (nodes) => nodeChildrenToHTML(nodes, renderOption, renderEmbed);
    if (renderOption[node.type] !== undefined) {
      return (renderOption[node.type] as RenderNode)(node, next);
    } else {
      return (renderOption.default as RenderNode)(node, next);
    }
  }
}