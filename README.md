# Contentstack JavaScript Utils SDK:

Contentstack is a headless CMS with an API-first approach. It is a CMS that developers can use to build powerful cross-platform applications in their favorite languages. Build your application frontend, and Contentstack will take care of the rest. Read More.

This guide will help you get started with Contentstack JavaScript Utils SDK to build apps powered by Contentstack.

## Prerequisites

To get started with JavaScript, you will need the following:
-   Node.js 10 or later

## SDK Installation and Setup

Use the following command to install Contentstack JavaScript Utils SDK:
```sh
npm i @contentstack/utils
```
## Usage
Let’s learn how you can use Utils SDK to render RTE embedded items and Supercharged RTE Json to HTML.

### Create Render Option
To render embedded items on the front-end, use the renderOptions function, and define the UI elements you want to show in the front-end of your website, as shown in the example below:
```js
const renderOption = {
    // To render paragraph nodes
    p: (node, next) => `<p class="class-id">${next(node.children)}</p>`,
    // To render heading level 1 nodes
    h1: (node, next) => `<h1 class="class-id">${next(node.children)}</h1>`,
    // To render bold text
    bold: (text) => `<b>${text}</b>`,
    // To render block-type embedded items
    block: {
        product: (item) =>
            `<div>
                <h2>${item.title}</h2>
                <img src="${item.product_image.url}" alt="${item.product_image.title}" />
                <p>${item.price}</p>
            </div>`,
        $default: (item) =>
            `<div>
                <h2>${item.title}</h2>
                <p>${item.description}</p>
            </div>`,
    },
    // To render inline embedded items
    inline: {
        $default: (item) =>
            `<span><b>${item.title}</b> - ${item.description}</span>`,
    },
    // To render link (a) nodes
    a: (node) => {
        const { attrs, children } = node;
        const childText = children.map((child) => child.text || '').join('');
        return `<a href="${attrs.url}" target="${attrs.target || '_self'}">${childText}</a>`;
    },
    // To render embedded assets
    display: (item, metadata) => {
        const { attributes } = metadata;
        return `<img src="${attributes.src}" alt="${attributes.alt || 'Asset'}" />`;
    },
    // To render embedded entry & asset references
    reference: (node) => {
        const { attrs, children } = node;
        const childText = children.map((child) => child.text || '').join('');
        if (attrs.type === 'entry') {
            return `<a href="${attrs.href}" class="${attrs['class-name'] || ''}">${childText}</a>`;
        } else if (attrs.type === 'asset') {
            if (attrs['display-type'] === 'link') {
                return `<a href="${attrs['asset-link']}" class="${attrs['class-name'] || ''}" target="_blank">${attrs['asset-name'] || 'View Asset'}</a>`;
            }
            
            if (attrs['display-type'] === 'display') {
                return `<img src="${attrs['asset-link']}" alt="${attrs['asset-alt'] || attrs['asset-name']}" class="${attrs['class-name'] || ''}" />`;
            }
        }
        return childText; // Fallback for unknown references
    },
    // Default handler for unknown nodes
    default: (node, next) => `<div>${next(node.children)}</div>`,
}
```

## Basic Queries
Contentstack Utils SDK lets you interact with the Content Delivery APIs and retrieve embedded items from the RTE field of an entry.

### Fetch Embedded Item(s) from a Single Entry
#### Render HTML RTE Embedded object
To get an embedded item of a single entry, you need to provide the stack API key, environment name, delivery token, content type and entry UID. Then, use the `includeEmbeddedItems` and `Contentstack.Utils.render` functions as shown below:
```ts
import contentstack, { StackConfig } from '@contentstack/delivery-sdk';
 
const params: StackConfig = {
  apiKey: <API_KEY>,
  deliveryToken: <DELIVERY_TOKEN>,
  environment: <ENVIRONMENT>,
}
const Stack = contentstack.stack(params);

const result = await Stack
  .contentType('<CONTENT_TYPE_UID>')
  .entry('<ENTRY_UID>')
  .includeEmbeddedItems()
  .fetch<BlogPostEntry>();

Contentstack.Utils.render({ 
  entry: result, 
  renderOption 
})
```
If you have multiple RTE fields in an entry and want to fetch the embedded items from a particular RTE field, you need to provide a path of those RTE fields.

Refer to the example code below:
```ts
//code to render embedded item from an RTE field and from another RTE field nested within a group field
Contentstack.Utils.render({ 
    entry: result, 
    path: ["rte_fieldUid", "group.rteFieldUID"], 
    renderOption 
})
```

#### Render Supercharged RTE contents
To get a single entry, you need to provide the stack API key, environment name, delivery token, content type and entry UID. Then, use `Contentstack.Utils.jsonToHTML` function as shown below:
```ts
import contentstack, { StackConfig } from '@contentstack/delivery-sdk';

const params: StackConfig = {
  apiKey: <API_KEY>,
  deliveryToken: <DELIVERY_TOKEN>,
  environment: <ENVIRONMENT>,
}
const Stack = contentstack.stack(params);

const result = await Stack
  .contentType('<CONTENT_TYPE_UID>')
  .entry('<ENTRY_UID>')
  .includeEmbeddedItems()
  .fetch<BlogPostEntry>();

Contentstack.Utils.jsonToHTML({
  entry: result,
  paths: ["rte_fieldUid", "group.rteFieldUID"],
  renderOption
})
```
> Node: Supercharged RTE also supports Embedded items to get all embedded items while fetching entry use `includeEmbeddedItems` function.

### Fetch Embedded Item(s) from Multiple Entries
#### Render HTML RTE Embedded object

To get embedded items from multiple entries, you need to provide the content type UID. You can also use the path variable in case the entries have multiple RTE fields.
```ts
import contentstack, { StackConfig } from '@contentstack/delivery-sdk'

const params: StackConfig = {
  apiKey: <API_KEY>,
  deliveryToken: <DELIVERY_TOKEN>,
  environment: <ENVIRONMENT>,
}
const Stack = contentstack.stack(params);

const result = await Stack
  .contentType('<CONTENT_TYPE_UID>')
  .entry()
  .includeEmbeddedItems()
  .find<BlogPostEntry>();

result.entries.forEach(entry => {  
  Contentstack.Utils.render({
    entry,
    paths: ["rte_fieldUid", "group.rteFieldUID"],
    renderOption
  })
})
```

#### Render Supercharged RTE contents
To get a multiple entries, you need to provide the stack API key, environment name, delivery token, content type and entry UID. Then, use `Contentstack.Utils.jsonToHTML` function as shown below:
```ts
import contentstack, { StackConfig } from '@contentstack/delivery-sdk';

const params: StackConfig = {
  apiKey: <API_KEY>,
  deliveryToken: <DELIVERY_TOKEN>,
  environment: <ENVIRONMENT>,
}
const Stack = contentstack.stack(params);

const result = await Stack
  .contentType('<CONTENT_TYPE_UID>')
  .entry()
  .includeEmbeddedItems()
  .find<BlogPostEntry>();

result.entries.forEach(entry => {  
  Contentstack.Utils.jsonToHTML({
    entry,
    paths: ["rte_fieldUid", "group.rteFieldUID"],
    renderOption
  })
})
```

> Node: Supercharged RTE also supports Embedded items to get all embedded items while fetching entry use `includeEmbeddedItems` function.
