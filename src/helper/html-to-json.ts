
export function elementToJson(element: Element): object {
  let obj: any = { }
  for (let i = 0; i<element.attributes.length; i++) {
    obj[element.attributes.item(i).name] = element.attributes.item(i).value
  }
  
  element.childNodes.forEach((chileNode) => {
    const node: ChildNode = (chileNode)
    obj = {
      ...obj,
      ...parseElement(node)
    }
  })
  return obj
}

function parseElement(node: ChildNode): any {
  const obj: any = {}
  if (node.nodeType === 3) {
    obj['#text'] = node.textContent;
  }else if (node.nodeType === 1) {
    obj[node.nodeName.toLowerCase()] = elementToJson(node as Element)
  }
  return obj
}