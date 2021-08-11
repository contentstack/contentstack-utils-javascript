import { EntryModel } from '../src'
import { addTags } from '../src/entry-editable'
import { entry_global_field, entry_global_field_multiple, entry_modular_block, entry_reference, entry_with_text } from './mock/entry-editable-mock'
import { entryMultipleContent } from './mock/entry-multiple-rich-text-content'

describe('Entry editable test', () => {
    it('Entry with text test', done => {
        addTags(entry_with_text, 'entry_asset', false)        
        expect((entry_with_text as any)['$']['rich_text_editor']).toEqual('data-cslp=entry_asset.bltcb70aa8425b4676c.en-us.rich_text_editor')
        expect((entry_with_text as any)['$']['rich_text_editor_multiple']).toEqual('data-cslp=entry_asset.bltcb70aa8425b4676c.en-us.rich_text_editor_multiple')
        done()
    })

    it('Entry with text should return object test', done => {
        addTags(entry_with_text, 'entry_asset', true)        
        expect((entry_with_text as any)['$']['rich_text_editor']).toEqual({'data-cslp': 'entry_asset.bltcb70aa8425b4676c.en-us.rich_text_editor'})
        expect((entry_with_text as any)['$']['rich_text_editor_multiple']).toEqual({'data-cslp': 'entry_asset.bltcb70aa8425b4676c.en-us.rich_text_editor_multiple' })
        done()
    })

    it('Entry with Modular blocks test', done => {
        addTags(entry_modular_block, 'entry_multiple_content', false)        
        expect((entry_modular_block as any)['modular_blocks'][0]['rich_text_inmodular']['$']['rich_text_editor']).toEqual('data-cslp=entry_multiple_content.bltcb70aa8425b4676c.en-us.modular_blocks.0.rich_text_inmodular.rich_text_editor')
        expect((entry_modular_block as any)['modular_blocks'][0]['rich_text_inmodular']['$']['rich_text_editor_multiple']).toEqual('data-cslp=entry_multiple_content.bltcb70aa8425b4676c.en-us.modular_blocks.0.rich_text_inmodular.rich_text_editor_multiple')

        expect((entry_modular_block as any)['modular_blocks'][1]['global_modular']['$']['rich_text_editor']).toEqual('data-cslp=entry_multiple_content.bltcb70aa8425b4676c.en-us.modular_blocks.1.global_modular.rich_text_editor')
        expect((entry_modular_block as any)['modular_blocks'][1]['global_modular']['$']['rich_text_editor_multiple']).toEqual('data-cslp=entry_multiple_content.bltcb70aa8425b4676c.en-us.modular_blocks.1.global_modular.rich_text_editor_multiple')

        expect((entry_modular_block as any)['modular_blocks'][1]['global_modular']['group']['$']['rich_text_editor']).toEqual('data-cslp=entry_multiple_content.bltcb70aa8425b4676c.en-us.modular_blocks.1.global_modular.group.rich_text_editor')
        expect((entry_modular_block as any)['modular_blocks'][1]['global_modular']['group']['$']['rich_text_editor_multiple']).toEqual('data-cslp=entry_multiple_content.bltcb70aa8425b4676c.en-us.modular_blocks.1.global_modular.group.rich_text_editor_multiple')

        expect((entry_modular_block as any)['modular_blocks'][1]['global_modular']['modular_blocks'][0]['rich_in_modular']['$']['rich_text_editor']).toEqual('data-cslp=entry_multiple_content.bltcb70aa8425b4676c.en-us.modular_blocks.1.global_modular.modular_blocks.0.rich_in_modular.rich_text_editor')
        expect((entry_modular_block as any)['modular_blocks'][1]['global_modular']['modular_blocks'][0]['rich_in_modular']['$']['rich_text_editor_multiple']).toEqual('data-cslp=entry_multiple_content.bltcb70aa8425b4676c.en-us.modular_blocks.1.global_modular.modular_blocks.0.rich_in_modular.rich_text_editor_multiple')
        
        done()
    })
    it('Entry with Modular blocks test return object', done => {
        addTags(entry_modular_block, 'entry_multiple_content', true)        
        expect((entry_modular_block as any)['modular_blocks'][0]['rich_text_inmodular']['$']['rich_text_editor']).toEqual({'data-cslp':'entry_multiple_content.bltcb70aa8425b4676c.en-us.modular_blocks.0.rich_text_inmodular.rich_text_editor'})
        expect((entry_modular_block as any)['modular_blocks'][0]['rich_text_inmodular']['$']['rich_text_editor_multiple']).toEqual({'data-cslp':'entry_multiple_content.bltcb70aa8425b4676c.en-us.modular_blocks.0.rich_text_inmodular.rich_text_editor_multiple'})

        expect((entry_modular_block as any)['modular_blocks'][1]['global_modular']['$']['rich_text_editor']).toEqual({'data-cslp':'entry_multiple_content.bltcb70aa8425b4676c.en-us.modular_blocks.1.global_modular.rich_text_editor'})
        expect((entry_modular_block as any)['modular_blocks'][1]['global_modular']['$']['rich_text_editor_multiple']).toEqual({'data-cslp':'entry_multiple_content.bltcb70aa8425b4676c.en-us.modular_blocks.1.global_modular.rich_text_editor_multiple'})

        expect((entry_modular_block as any)['modular_blocks'][1]['global_modular']['group']['$']['rich_text_editor']).toEqual({'data-cslp':'entry_multiple_content.bltcb70aa8425b4676c.en-us.modular_blocks.1.global_modular.group.rich_text_editor'})
        expect((entry_modular_block as any)['modular_blocks'][1]['global_modular']['group']['$']['rich_text_editor_multiple']).toEqual({'data-cslp':'entry_multiple_content.bltcb70aa8425b4676c.en-us.modular_blocks.1.global_modular.group.rich_text_editor_multiple'})

        expect((entry_modular_block as any)['modular_blocks'][1]['global_modular']['modular_blocks'][0]['rich_in_modular']['$']['rich_text_editor']).toEqual({'data-cslp':'entry_multiple_content.bltcb70aa8425b4676c.en-us.modular_blocks.1.global_modular.modular_blocks.0.rich_in_modular.rich_text_editor'})
        expect((entry_modular_block as any)['modular_blocks'][1]['global_modular']['modular_blocks'][0]['rich_in_modular']['$']['rich_text_editor_multiple']).toEqual({'data-cslp':'entry_multiple_content.bltcb70aa8425b4676c.en-us.modular_blocks.1.global_modular.modular_blocks.0.rich_in_modular.rich_text_editor_multiple'})
        
        done()
    })

    it('Entry with reference test', done => {
        addTags(entry_reference, 'entry_asset', false)        
        
        expect((entry_reference as any)['reference'][0]['$']['rich_text_editor']).toEqual('data-cslp=embed_entry.blt9c95983f8f327537.en-us.rich_text_editor')
        expect((entry_reference as any)['reference'][0]['$']['rich_text_editor_multiple']).toEqual('data-cslp=embed_entry.blt9c95983f8f327537.en-us.rich_text_editor_multiple')

        done()
    })

    it('Entry with reference should return object test', done => {
        addTags(entry_reference, 'entry_asset', true)        

        expect((entry_reference as any)['reference'][0]['$']['rich_text_editor']).toEqual({'data-cslp':'embed_entry.blt9c95983f8f327537.en-us.rich_text_editor'})
        expect((entry_reference as any)['reference'][0]['$']['rich_text_editor_multiple']).toEqual({'data-cslp':'embed_entry.blt9c95983f8f327537.en-us.rich_text_editor_multiple'})

        done()
    })

    it('Entry with global fields test', done => {
        addTags(entry_global_field, 'entry_asset', false)        
        
        expect((entry_global_field as any)['global_rich']['$']['rich_text_editor']).toEqual('data-cslp=entry_asset.bltcb70aa8425b4676c.en-us.global_rich.rich_text_editor')
        expect((entry_global_field as any)['global_rich']['$']['rich_text_editor_multiple']).toEqual('data-cslp=entry_asset.bltcb70aa8425b4676c.en-us.global_rich.rich_text_editor_multiple')

        expect((entry_global_field as any)['global_rich']['group']['$']['rich_text_editor']).toEqual('data-cslp=entry_asset.bltcb70aa8425b4676c.en-us.global_rich.group.rich_text_editor')
        expect((entry_global_field as any)['global_rich']['group']['$']['rich_text_editor_multiple']).toEqual('data-cslp=entry_asset.bltcb70aa8425b4676c.en-us.global_rich.group.rich_text_editor_multiple')

        expect((entry_global_field as any)['global_rich']['modular_blocks'][0]['rich_in_modular']['$']['rich_text_editor']).toEqual('data-cslp=entry_asset.bltcb70aa8425b4676c.en-us.global_rich.modular_blocks.0.rich_in_modular.rich_text_editor')
        expect((entry_global_field as any)['global_rich']['modular_blocks'][0]['rich_in_modular']['$']['rich_text_editor_multiple']).toEqual('data-cslp=entry_asset.bltcb70aa8425b4676c.en-us.global_rich.modular_blocks.0.rich_in_modular.rich_text_editor_multiple')

        done()
    })

    it('Entry with reference should return object test', done => {
        addTags(entry_global_field, 'entry_asset', true)        

        expect((entry_global_field as any)['global_rich']['$']['rich_text_editor']).toEqual({'data-cslp':'entry_asset.bltcb70aa8425b4676c.en-us.global_rich.rich_text_editor'})
        expect((entry_global_field as any)['global_rich']['$']['rich_text_editor_multiple']).toEqual({'data-cslp':'entry_asset.bltcb70aa8425b4676c.en-us.global_rich.rich_text_editor_multiple'})

        expect((entry_global_field as any)['global_rich']['group']['$']['rich_text_editor']).toEqual({'data-cslp':'entry_asset.bltcb70aa8425b4676c.en-us.global_rich.group.rich_text_editor'})
        expect((entry_global_field as any)['global_rich']['group']['$']['rich_text_editor_multiple']).toEqual({'data-cslp':'entry_asset.bltcb70aa8425b4676c.en-us.global_rich.group.rich_text_editor_multiple'})

        expect((entry_global_field as any)['global_rich']['modular_blocks'][0]['rich_in_modular']['$']['rich_text_editor']).toEqual({'data-cslp':'entry_asset.bltcb70aa8425b4676c.en-us.global_rich.modular_blocks.0.rich_in_modular.rich_text_editor'})
        expect((entry_global_field as any)['global_rich']['modular_blocks'][0]['rich_in_modular']['$']['rich_text_editor_multiple']).toEqual({'data-cslp':'entry_asset.bltcb70aa8425b4676c.en-us.global_rich.modular_blocks.0.rich_in_modular.rich_text_editor_multiple'})

        done()
    })

    it('Entry with reference test', done => {
        addTags(entry_global_field_multiple, 'entry_asset', false)        
        
        expect((entry_global_field_multiple as any)['global_rich_multiple'][0]['$']['rich_text_editor']).toEqual('data-cslp=entry_asset.bltcb70aa8425b4676c.en-us.global_rich_multiple.0.rich_text_editor')
        expect((entry_global_field_multiple as any)['global_rich_multiple'][0]['$']['rich_text_editor_multiple']).toEqual('data-cslp=entry_asset.bltcb70aa8425b4676c.en-us.global_rich_multiple.0.rich_text_editor_multiple')

        expect((entry_global_field_multiple as any)['global_rich_multiple'][0]['group']['$']['rich_text_editor']).toEqual('data-cslp=entry_asset.bltcb70aa8425b4676c.en-us.global_rich_multiple.0.group.rich_text_editor')
        expect((entry_global_field_multiple as any)['global_rich_multiple'][0]['group']['$']['rich_text_editor_multiple']).toEqual('data-cslp=entry_asset.bltcb70aa8425b4676c.en-us.global_rich_multiple.0.group.rich_text_editor_multiple')

        expect((entry_global_field_multiple as any)['global_rich_multiple'][0]['modular_blocks'][0]['rich_in_modular']['$']['rich_text_editor']).toEqual('data-cslp=entry_asset.bltcb70aa8425b4676c.en-us.global_rich_multiple.0.modular_blocks.0.rich_in_modular.rich_text_editor')
        expect((entry_global_field_multiple as any)['global_rich_multiple'][0]['modular_blocks'][0]['rich_in_modular']['$']['rich_text_editor_multiple']).toEqual('data-cslp=entry_asset.bltcb70aa8425b4676c.en-us.global_rich_multiple.0.modular_blocks.0.rich_in_modular.rich_text_editor_multiple')

        done()
    })

    it('Entry with reference should return object test', done => {
        addTags(entry_global_field_multiple, 'entry_asset', true)        

        expect((entry_global_field_multiple as any)['global_rich_multiple'][0]['$']['rich_text_editor']).toEqual({'data-cslp':'entry_asset.bltcb70aa8425b4676c.en-us.global_rich_multiple.0.rich_text_editor'})
        expect((entry_global_field_multiple as any)['global_rich_multiple'][0]['$']['rich_text_editor_multiple']).toEqual({'data-cslp':'entry_asset.bltcb70aa8425b4676c.en-us.global_rich_multiple.0.rich_text_editor_multiple'})

        expect((entry_global_field_multiple as any)['global_rich_multiple'][0]['group']['$']['rich_text_editor']).toEqual({'data-cslp':'entry_asset.bltcb70aa8425b4676c.en-us.global_rich_multiple.0.group.rich_text_editor'})
        expect((entry_global_field_multiple as any)['global_rich_multiple'][0]['group']['$']['rich_text_editor_multiple']).toEqual({'data-cslp':'entry_asset.bltcb70aa8425b4676c.en-us.global_rich_multiple.0.group.rich_text_editor_multiple'})

        expect((entry_global_field_multiple as any)['global_rich_multiple'][0]['modular_blocks'][0]['rich_in_modular']['$']['rich_text_editor']).toEqual({'data-cslp':'entry_asset.bltcb70aa8425b4676c.en-us.global_rich_multiple.0.modular_blocks.0.rich_in_modular.rich_text_editor'})
        expect((entry_global_field_multiple as any)['global_rich_multiple'][0]['modular_blocks'][0]['rich_in_modular']['$']['rich_text_editor_multiple']).toEqual({'data-cslp':'entry_asset.bltcb70aa8425b4676c.en-us.global_rich_multiple.0.modular_blocks.0.rich_in_modular.rich_text_editor_multiple'})

        done()
    })

})