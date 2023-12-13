# Contentstack JavaScript Utils SDK:

Contentstack is a headless CMS with an API-first approach. It is a CMS that developers can use to build powerful cross-platform applications in their favorite languages. Build your application frontend, and Contentstack will take care of the rest. Read More.

This guide will help you get started with Contentstack JavaScript Utils SDK to build apps powered by Contentstack.

## Prerequisites

To get started with JavaScript, you will need the following:
-   Node.js 10 or later

## SDK Installation and Setup
> Note: If you are using JavaScript Contentstack SDK, you don’t need to run the command as ‘@contentstack/utils’ is already imported in the SDK.

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
	// to render Supercharged RTE NodeType content like paragraph, link, table, order list, un-order list and more.
	p: (node, next) => {
		return `<p class='class-id'>${next(node.children)}</p>` // you will need to call next function with node children contents
	},
	h1: (node, next) => {
		return `<h1 class='class-id'>${next(node.children)}</h1>` // you will need to call next function with node children contents
	},
	// to render Supercharged RTE MarkType content like bold, italic, underline, strikethrough, inlineCode, subscript, and superscript
	bold: (text) => {
		return `<b>${next(node.children)}</b>`
	},
	// to render block-type embedded items  
	block: {  
		'product': (item, metadata) => {  
			return `<div>  
					<h2 >${item.title}</h2>  
					<img src=${item.product_image.url} alt=${item.product_image.title}/>  
					<p>${item.price}</p>  
					</div>`  
		},
		// to render the default  
		'$default': (item, metadata) => {  
			return `<div>  
					<h2>${item.title}</h2>  
					<p>${item.description}</p>  
					</div>`
		}  
	},
	// to display inline embedded items  
	inline: {  
		'$default': (item, metadata) => {  
			return `<span><b>${item.title}</b> - ${item.description}</span>`
		}  
	},
	// to display embedded items inserted via link  
	link: (item, metadata) => {  
		return `<a href="${metadata.attributes.href}">${metadata.text}</a>`
	},
	// to display assets  
	display: (item, metadata) => {  
		return `<img src=${metadata.attributes.src} alt=${metadata.alt} />`
	}  
}
```

## Basic Queries
Contentstack Utils SDK lets you interact with the Content Delivery APIs and retrieve embedded items from the RTE field of an entry.

### Fetch Embedded Item(s) from a Single Entry
#### Render HTML RTE Embedded object
To get an embedded item of a single entry, you need to provide the stack API key, environment name, delivery token, content type and entry UID. Then, use the `includeEmbeddedItems` and `Contentstack.Utils.render` functions as shown below:
```js
import * as Contentstack from  'contentstack'  
const stack = Contentstack.Stack({  
        api_key: '<API_KEY>',  
        delivery_token: '<ENVIRONMENT_SPECIFIC_DELIVERY_TOKEN>',  
        environment: '<ENVIRONMENT>'})  
  
stack.ContentType('<CONTENT_TYPE_UID>')  
	 .Entry('<ENTRY_UID>')  
	 .toJSON()  
	 .includeEmbeddedItems() // include embedded items  
	 .fetch()  
	 .then(entry => {  
			Contentstack.Utils.render({ entry, renderOption })  
	 })
```
If you have multiple RTE fields in an entry and want to fetch the embedded items from a particular RTE field, you need to provide a path of those RTE fields.

Refer to the example code below:
```js
//code to render embedded item from an RTE field and from another RTE field nested within a group field
Contentstack.Utils.render({ entry, path: ["rte_fieldUid", "group.rteFieldUID"], renderOption })
```

#### Render Supercharged RTE contents
To get a single entry, you need to provide the stack API key, environment name, delivery token, content type and entry UID. Then, use `Contentstack.Utils.jsonToHTML` function as shown below:
```js
import * as Contentstack from  'contentstack'  
const stack = Contentstack.Stack({  
        api_key: '<API_KEY>',  
        delivery_token: '<ENVIRONMENT_SPECIFIC_DELIVERY_TOKEN>',  
        environment: '<ENVIRONMENT>'})  
  
stack.ContentType('<CONTENT_TYPE_UID>')  
	 .Entry('<ENTRY_UID>')  
	 .toJSON()  
	 .fetch()  
	 .then(entry => {  
			Contentstack.Utils.jsonToHTML({ 
				entry, 
				path: ["rte_fieldUid", "group.rteFieldUID"], 
				renderOption 
			})  
	 })
```
> Node: Supercharged RTE also supports Embedded items to get all embedded items while fetching entry use `includeEmbeddedItems` function.

### Fetch Embedded Item(s) from Multiple Entries
#### Render HTML RTE Embedded object

To get embedded items from multiple entries, you need to provide the content type UID. You can also use the path variable in case the entries have multiple RTE fields.
```js
import Contentstack from  'contentstack'  
const stack = Contentstack.Stack({  
        api_key: '<API_KEY>',  
        delivery_token: '<ENVIRONMENT_SPECIFIC_DELIVERY_TOKEN>',  
        environment: '<ENVIRONMENT>'})  
  
stack.ContentType('<CONTENT_TYPE_UID>')  
	 .Query()  
	 .toJSON()  
	 .where('title', '<entry_title_to_search>')  
	 .includeEmbeddedItems() // include embedded items  
	 .find()  
	 .then(result => {  
		result.forEach(entry => {  
		    Contentstack.Utils.render({ 
				entry, 
				path: ['rte', 'group.rteFieldUID'], 
				renderOption 
			})  
	    })  
     })
```

#### Render Supercharged RTE contents
To get a multiple entries, you need to provide the stack API key, environment name, delivery token, content type and entry UID. Then, use `Contentstack.Utils.jsonToHTML` function as shown below:
```js
import * as Contentstack from  'contentstack'  
const stack = Contentstack.Stack({  
        api_key: '<API_KEY>',  
        delivery_token: '<ENVIRONMENT_SPECIFIC_DELIVERY_TOKEN>',  
        environment: '<ENVIRONMENT>'})  
  
stack.ContentType('<CONTENT_TYPE_UID>')  
	 .Query()  
	 .toJSON()  
	 .where('title', '<entry_title_to_search>')  
	 .find()  
	 .then(result => {  
		result.forEach(entry => {  
			Contentstack.Utils.jsonToHTML({ 
				entry, 
				path: ["rte_fieldUid", "group.rteFieldUID"], 
				renderOption 
			})
		})  
     })
```

> Node: Supercharged RTE also supports Embedded items to get all embedded items while fetching entry use `includeEmbeddedItems` function.
