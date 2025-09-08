import { addTags } from '../src/entry-editable'
import { entry_global_field, entry_global_field_multiple, entry_modular_block, entry_reference, entry_with_text, entry_with_applied_variants, entry_with_parent_path_variants } from './mock/entry-editable-mock'

describe('Entry editable test', () => {
    it('Entry with text test', done => {
        addTags(entry_with_text, 'entry_asset', false)        
        expect((entry_with_text as any)['$']['rich_text_editor']).toEqual('data-cslp=entry_asset.entry_uid_1.en-us.rich_text_editor')
        expect((entry_with_text as any)['$']['rich_text_editor_multiple']).toEqual('data-cslp=entry_asset.entry_uid_1.en-us.rich_text_editor_multiple')
        done()
    })

    it('Entry with text should return object test', done => {
        addTags(entry_with_text, 'entry_asset', true)        
        expect((entry_with_text as any)['$']['rich_text_editor']).toEqual({'data-cslp': 'entry_asset.entry_uid_1.en-us.rich_text_editor'})
        expect((entry_with_text as any)['$']['rich_text_editor_multiple']).toEqual({'data-cslp': 'entry_asset.entry_uid_1.en-us.rich_text_editor_multiple' })
        done()
    })

    it('Entry with Modular blocks test', done => {
        addTags(entry_modular_block, 'entry_multiple_content', false)        
        expect((entry_modular_block as any)['modular_blocks'][0]['rich_text_inmodular']['$']['rich_text_editor']).toEqual('data-cslp=entry_multiple_content.entry_uid_1.en-us.modular_blocks.0.rich_text_inmodular.rich_text_editor')
        expect((entry_modular_block as any)['modular_blocks'][0]['rich_text_inmodular']['$']['rich_text_editor_multiple']).toEqual('data-cslp=entry_multiple_content.entry_uid_1.en-us.modular_blocks.0.rich_text_inmodular.rich_text_editor_multiple')

        expect((entry_modular_block as any)['modular_blocks'][1]['global_modular']['$']['rich_text_editor']).toEqual('data-cslp=entry_multiple_content.entry_uid_1.en-us.modular_blocks.1.global_modular.rich_text_editor')
        expect((entry_modular_block as any)['modular_blocks'][1]['global_modular']['$']['rich_text_editor_multiple']).toEqual('data-cslp=entry_multiple_content.entry_uid_1.en-us.modular_blocks.1.global_modular.rich_text_editor_multiple')

        expect((entry_modular_block as any)['modular_blocks'][1]['global_modular']['group']['$']['rich_text_editor']).toEqual('data-cslp=entry_multiple_content.entry_uid_1.en-us.modular_blocks.1.global_modular.group.rich_text_editor')
        expect((entry_modular_block as any)['modular_blocks'][1]['global_modular']['group']['$']['rich_text_editor_multiple']).toEqual('data-cslp=entry_multiple_content.entry_uid_1.en-us.modular_blocks.1.global_modular.group.rich_text_editor_multiple')

        expect((entry_modular_block as any)['modular_blocks'][1]['global_modular']['modular_blocks'][0]['rich_in_modular']['$']['rich_text_editor']).toEqual('data-cslp=entry_multiple_content.entry_uid_1.en-us.modular_blocks.1.global_modular.modular_blocks.0.rich_in_modular.rich_text_editor')
        expect((entry_modular_block as any)['modular_blocks'][1]['global_modular']['modular_blocks'][0]['rich_in_modular']['$']['rich_text_editor_multiple']).toEqual('data-cslp=entry_multiple_content.entry_uid_1.en-us.modular_blocks.1.global_modular.modular_blocks.0.rich_in_modular.rich_text_editor_multiple')
        
        done()
    })
    it('Entry with Modular blocks test return object', done => {
        addTags(entry_modular_block, 'entry_multiple_content', true)        
        expect((entry_modular_block as any)['modular_blocks'][0]['rich_text_inmodular']['$']['rich_text_editor']).toEqual({'data-cslp':'entry_multiple_content.entry_uid_1.en-us.modular_blocks.0.rich_text_inmodular.rich_text_editor'})
        expect((entry_modular_block as any)['modular_blocks'][0]['rich_text_inmodular']['$']['rich_text_editor_multiple']).toEqual({'data-cslp':'entry_multiple_content.entry_uid_1.en-us.modular_blocks.0.rich_text_inmodular.rich_text_editor_multiple'})

        expect((entry_modular_block as any)['modular_blocks'][1]['global_modular']['$']['rich_text_editor']).toEqual({'data-cslp':'entry_multiple_content.entry_uid_1.en-us.modular_blocks.1.global_modular.rich_text_editor'})
        expect((entry_modular_block as any)['modular_blocks'][1]['global_modular']['$']['rich_text_editor_multiple']).toEqual({'data-cslp':'entry_multiple_content.entry_uid_1.en-us.modular_blocks.1.global_modular.rich_text_editor_multiple'})

        expect((entry_modular_block as any)['modular_blocks'][1]['global_modular']['group']['$']['rich_text_editor']).toEqual({'data-cslp':'entry_multiple_content.entry_uid_1.en-us.modular_blocks.1.global_modular.group.rich_text_editor'})
        expect((entry_modular_block as any)['modular_blocks'][1]['global_modular']['group']['$']['rich_text_editor_multiple']).toEqual({'data-cslp':'entry_multiple_content.entry_uid_1.en-us.modular_blocks.1.global_modular.group.rich_text_editor_multiple'})

        expect((entry_modular_block as any)['modular_blocks'][1]['global_modular']['modular_blocks'][0]['rich_in_modular']['$']['rich_text_editor']).toEqual({'data-cslp':'entry_multiple_content.entry_uid_1.en-us.modular_blocks.1.global_modular.modular_blocks.0.rich_in_modular.rich_text_editor'})
        expect((entry_modular_block as any)['modular_blocks'][1]['global_modular']['modular_blocks'][0]['rich_in_modular']['$']['rich_text_editor_multiple']).toEqual({'data-cslp':'entry_multiple_content.entry_uid_1.en-us.modular_blocks.1.global_modular.modular_blocks.0.rich_in_modular.rich_text_editor_multiple'})
        
        done()
    })

    it('Entry with reference test', done => {
        addTags(entry_reference, 'entry_asset', false)        
        
        expect((entry_reference as any)['reference'][0]['$']['rich_text_editor']).toEqual('data-cslp=embed_entry.entry_uid_11.en-us.rich_text_editor')
        expect((entry_reference as any)['reference'][0]['$']['rich_text_editor_multiple']).toEqual('data-cslp=embed_entry.entry_uid_11.en-us.rich_text_editor_multiple')

        done()
    })

    it('Entry with reference should return object test', done => {
        addTags(entry_reference, 'entry_asset', true)        

        expect((entry_reference as any)['reference'][0]['$']['rich_text_editor']).toEqual({'data-cslp':'embed_entry.entry_uid_11.en-us.rich_text_editor'})
        expect((entry_reference as any)['reference'][0]['$']['rich_text_editor_multiple']).toEqual({'data-cslp':'embed_entry.entry_uid_11.en-us.rich_text_editor_multiple'})

        done()
    })

    it('Entry with global fields test', done => {
        addTags(entry_global_field, 'entry_asset', false)        
        
        expect((entry_global_field as any)['global_rich']['$']['rich_text_editor']).toEqual('data-cslp=entry_asset.entry_uid_1.en-us.global_rich.rich_text_editor')
        expect((entry_global_field as any)['global_rich']['$']['rich_text_editor_multiple']).toEqual('data-cslp=entry_asset.entry_uid_1.en-us.global_rich.rich_text_editor_multiple')

        expect((entry_global_field as any)['global_rich']['group']['$']['rich_text_editor']).toEqual('data-cslp=entry_asset.entry_uid_1.en-us.global_rich.group.rich_text_editor')
        expect((entry_global_field as any)['global_rich']['group']['$']['rich_text_editor_multiple']).toEqual('data-cslp=entry_asset.entry_uid_1.en-us.global_rich.group.rich_text_editor_multiple')

        expect((entry_global_field as any)['global_rich']['modular_blocks'][0]['rich_in_modular']['$']['rich_text_editor']).toEqual('data-cslp=entry_asset.entry_uid_1.en-us.global_rich.modular_blocks.0.rich_in_modular.rich_text_editor')
        expect((entry_global_field as any)['global_rich']['modular_blocks'][0]['rich_in_modular']['$']['rich_text_editor_multiple']).toEqual('data-cslp=entry_asset.entry_uid_1.en-us.global_rich.modular_blocks.0.rich_in_modular.rich_text_editor_multiple')

        done()
    })

    it('Entry with reference should return object test', done => {
        addTags(entry_global_field, 'entry_asset', true)        

        expect((entry_global_field as any)['global_rich']['$']['rich_text_editor']).toEqual({'data-cslp':'entry_asset.entry_uid_1.en-us.global_rich.rich_text_editor'})
        expect((entry_global_field as any)['global_rich']['$']['rich_text_editor_multiple']).toEqual({'data-cslp':'entry_asset.entry_uid_1.en-us.global_rich.rich_text_editor_multiple'})

        expect((entry_global_field as any)['global_rich']['group']['$']['rich_text_editor']).toEqual({'data-cslp':'entry_asset.entry_uid_1.en-us.global_rich.group.rich_text_editor'})
        expect((entry_global_field as any)['global_rich']['group']['$']['rich_text_editor_multiple']).toEqual({'data-cslp':'entry_asset.entry_uid_1.en-us.global_rich.group.rich_text_editor_multiple'})

        expect((entry_global_field as any)['global_rich']['modular_blocks'][0]['rich_in_modular']['$']['rich_text_editor']).toEqual({'data-cslp':'entry_asset.entry_uid_1.en-us.global_rich.modular_blocks.0.rich_in_modular.rich_text_editor'})
        expect((entry_global_field as any)['global_rich']['modular_blocks'][0]['rich_in_modular']['$']['rich_text_editor_multiple']).toEqual({'data-cslp':'entry_asset.entry_uid_1.en-us.global_rich.modular_blocks.0.rich_in_modular.rich_text_editor_multiple'})

        done()
    })

    it('Entry with reference test', done => {
        addTags(entry_global_field_multiple, 'entry_asset', false)        
        
        expect((entry_global_field_multiple as any)['global_rich_multiple'][0]['$']['rich_text_editor']).toEqual('data-cslp=entry_asset.entry_uid_1.en-us.global_rich_multiple.0.rich_text_editor')
        expect((entry_global_field_multiple as any)['global_rich_multiple'][0]['$']['rich_text_editor_multiple']).toEqual('data-cslp=entry_asset.entry_uid_1.en-us.global_rich_multiple.0.rich_text_editor_multiple')

        expect((entry_global_field_multiple as any)['global_rich_multiple'][0]['group']['$']['rich_text_editor']).toEqual('data-cslp=entry_asset.entry_uid_1.en-us.global_rich_multiple.0.group.rich_text_editor')
        expect((entry_global_field_multiple as any)['global_rich_multiple'][0]['group']['$']['rich_text_editor_multiple']).toEqual('data-cslp=entry_asset.entry_uid_1.en-us.global_rich_multiple.0.group.rich_text_editor_multiple')

        expect((entry_global_field_multiple as any)['global_rich_multiple'][0]['modular_blocks'][0]['rich_in_modular']['$']['rich_text_editor']).toEqual('data-cslp=entry_asset.entry_uid_1.en-us.global_rich_multiple.0.modular_blocks.0.rich_in_modular.rich_text_editor')
        expect((entry_global_field_multiple as any)['global_rich_multiple'][0]['modular_blocks'][0]['rich_in_modular']['$']['rich_text_editor_multiple']).toEqual('data-cslp=entry_asset.entry_uid_1.en-us.global_rich_multiple.0.modular_blocks.0.rich_in_modular.rich_text_editor_multiple')

        done()
    })

    it('Entry with reference should return object test', done => {
        addTags(entry_global_field_multiple, 'entry_asset', true)        

        expect((entry_global_field_multiple as any)['global_rich_multiple'][0]['$']['rich_text_editor']).toEqual({'data-cslp':'entry_asset.entry_uid_1.en-us.global_rich_multiple.0.rich_text_editor'})
        expect((entry_global_field_multiple as any)['global_rich_multiple'][0]['$']['rich_text_editor_multiple']).toEqual({'data-cslp':'entry_asset.entry_uid_1.en-us.global_rich_multiple.0.rich_text_editor_multiple'})

        expect((entry_global_field_multiple as any)['global_rich_multiple'][0]['group']['$']['rich_text_editor']).toEqual({'data-cslp':'entry_asset.entry_uid_1.en-us.global_rich_multiple.0.group.rich_text_editor'})
        expect((entry_global_field_multiple as any)['global_rich_multiple'][0]['group']['$']['rich_text_editor_multiple']).toEqual({'data-cslp':'entry_asset.entry_uid_1.en-us.global_rich_multiple.0.group.rich_text_editor_multiple'})

        expect((entry_global_field_multiple as any)['global_rich_multiple'][0]['modular_blocks'][0]['rich_in_modular']['$']['rich_text_editor']).toEqual({'data-cslp':'entry_asset.entry_uid_1.en-us.global_rich_multiple.0.modular_blocks.0.rich_in_modular.rich_text_editor'})
        expect((entry_global_field_multiple as any)['global_rich_multiple'][0]['modular_blocks'][0]['rich_in_modular']['$']['rich_text_editor_multiple']).toEqual({'data-cslp':'entry_asset.entry_uid_1.en-us.global_rich_multiple.0.modular_blocks.0.rich_in_modular.rich_text_editor_multiple'})

        done()
    })

    // Tests for applied variants functionality
    describe('Applied Variants Tests', () => {
        it('Entry with applied variants should generate v2 tags with variant suffix', done => {
            addTags(entry_with_applied_variants, 'entry_asset', false)
            
            // Field with direct variant match should get v2 prefix and variant suffix
            expect((entry_with_applied_variants as any)['$']['rich_text_editor']).toEqual('data-cslp=v2:entry_asset.entry_uid_1_variant_1.en-us.rich_text_editor')
            
            // Nested field with direct variant match
            expect((entry_with_applied_variants as any)['nested']['$']['field']).toEqual('data-cslp=v2:entry_asset.entry_uid_1_variant_2.en-us.nested.field')
            
            // Field without variant should not have v2 prefix
            expect((entry_with_applied_variants as any)['nested']['$']['other_field']).toEqual('data-cslp=entry_asset.entry_uid_1.en-us.nested.other_field')
            
            done()
        })

        it('Entry with applied variants should return v2 objects when tagsAsObject is true', done => {
            addTags(entry_with_applied_variants, 'entry_asset', true)
            
            // Field with direct variant match should get v2 prefix and variant suffix as object
            expect((entry_with_applied_variants as any)['$']['rich_text_editor']).toEqual({'data-cslp': 'v2:entry_asset.entry_uid_1_variant_1.en-us.rich_text_editor'})
            
            // Nested field with direct variant match
            expect((entry_with_applied_variants as any)['nested']['$']['field']).toEqual({'data-cslp': 'v2:entry_asset.entry_uid_1_variant_2.en-us.nested.field'})
            
            // Field without variant should not have v2 prefix
            expect((entry_with_applied_variants as any)['nested']['$']['other_field']).toEqual({'data-cslp': 'entry_asset.entry_uid_1.en-us.nested.other_field'})
            
            done()
        })

        it('Entry with parent path variants should find correct variant', done => {
            addTags(entry_with_parent_path_variants, 'entry_asset', false)
            
            // Field under 'group' parent should get parent variant
            expect((entry_with_parent_path_variants as any)['group']['$']['other']).toEqual('data-cslp=v2:entry_asset.entry_uid_3_parent_variant.en-us.group.other')
            
            // Field under 'group.nested' should get parent variant (group is longer match)
            expect((entry_with_parent_path_variants as any)['group']['nested']['$']['field']).toEqual('data-cslp=v2:entry_asset.entry_uid_3_parent_variant.en-us.group.nested.field')
            
            // Field with exact deep path match should get deep variant
            expect((entry_with_parent_path_variants as any)['group']['nested']['deep']['$']['field']).toEqual('data-cslp=v2:entry_asset.entry_uid_3_deep_variant.en-us.group.nested.deep.field')
            
            done()
        })

        it('Entry with modular block variants should apply variants correctly', done => {
            addTags(entry_with_applied_variants, 'entry_asset', false)
            
            // Modular block content with variant should get v2 prefix and variant suffix
            expect((entry_with_applied_variants as any)['modular_blocks'][0]['$']['content']).toEqual('data-cslp=v2:entry_asset.entry_uid_1_variant_3.en-us.modular_blocks.0.content')
            // Modular block field without variant should not have v2 prefix
            expect((entry_with_applied_variants as any)['modular_blocks'][0]['content']['$']['title']).toEqual('data-cslp=v2:entry_asset.entry_uid_1_variant_3.en-us.modular_blocks.0.content.title')
            
            done()
        })

        it('Entry without applied variants should work normally', done => {
            addTags(entry_with_text, 'entry_asset', false)
            
            // Should not have v2 prefix when no variants are applied
            expect((entry_with_text as any)['$']['rich_text_editor']).toEqual('data-cslp=entry_asset.entry_uid_1.en-us.rich_text_editor')
            expect((entry_with_text as any)['$']['rich_text_editor_multiple']).toEqual('data-cslp=entry_asset.entry_uid_1.en-us.rich_text_editor_multiple')
            
            done()
        })

        it('Entry with empty applied variants should work normally', done => {
            const entryWithEmptyVariants = {
                ...entry_with_text,
                _applied_variants: {}
            }
            
            addTags(entryWithEmptyVariants, 'entry_asset', false)
            
            // Should not have v2 prefix when variants object is empty
            expect((entryWithEmptyVariants as any)['$']['rich_text_editor']).toEqual('data-cslp=entry_asset.entry_uid_1.en-us.rich_text_editor')
            expect((entryWithEmptyVariants as any)['$']['rich_text_editor_multiple']).toEqual('data-cslp=entry_asset.entry_uid_1.en-us.rich_text_editor_multiple')
            
            done()
        })

        it('Variant path sorting should work correctly for nested paths', done => {
            const entryWithComplexVariants = {
                "_version": 10,
                "locale": "en-us",
                "uid": "entry_uid_test",
                "ACL": {},
                "_applied_variants": {
                    "a": "variant_a",
                    "a.b": "variant_ab", 
                    "a.b.c": "variant_abc",
                    "a.b.c.d": "variant_abcd"
                },
                "a": {
                    "b": {
                        "c": {
                            "d": {
                                "field": "deep field"
                            },
                            "field": "c field"
                        },
                        "field": "b field"
                    },
                    "field": "a field"
                }
            }
            
            addTags(entryWithComplexVariants, 'entry_asset', false)
            
            // Should use the longest matching path variant
            expect((entryWithComplexVariants as any)['a']['b']['c']['d']['$']['field']).toEqual('data-cslp=v2:entry_asset.entry_uid_test_variant_abcd.en-us.a.b.c.d.field')
            expect((entryWithComplexVariants as any)['a']['b']['c']['$']['field']).toEqual('data-cslp=v2:entry_asset.entry_uid_test_variant_abc.en-us.a.b.c.field')
            expect((entryWithComplexVariants as any)['a']['b']['$']['field']).toEqual('data-cslp=v2:entry_asset.entry_uid_test_variant_ab.en-us.a.b.field')
            expect((entryWithComplexVariants as any)['a']['$']['field']).toEqual('data-cslp=v2:entry_asset.entry_uid_test_variant_a.en-us.a.field')
            
            done()
        })
    })

})