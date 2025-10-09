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
            expect((entry_with_applied_variants as any)['$']['rich_text_editor_multiple']).toEqual('data-cslp=entry_asset.entry_uid_1.en-us.rich_text_editor_multiple')
            
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
            expect((entry_with_applied_variants as any)['$']['rich_text_editor_multiple']).toEqual({'data-cslp': 'entry_asset.entry_uid_1.en-us.rich_text_editor_multiple'})
            
            done()
        })

        it('Entry with parent path variants should find correct variant', done => {
            addTags(entry_with_parent_path_variants, 'entry_asset', false)

            // Group field should get parent variant
            expect((entry_with_parent_path_variants as any)['$']['group']).toEqual('data-cslp=v2:entry_asset.entry_uid_3_parent_variant.en-us.group')
            // Field under 'group' parent should get parent variant
            expect((entry_with_parent_path_variants as any)['group']['$']['other']).toEqual('data-cslp=v2:entry_asset.entry_uid_3_parent_variant.en-us.group.other')
            // Field under 'group.nested' should get parent variant (group is longer match)
            expect((entry_with_parent_path_variants as any)['group']['nested']['$']['field']).toEqual('data-cslp=v2:entry_asset.entry_uid_3_parent_variant.en-us.group.nested.field')
            // Field with exact deep path match should get deep variant
            expect((entry_with_parent_path_variants as any)['group']['nested']['deep']['$']['field']).toEqual('data-cslp=v2:entry_asset.entry_uid_3_deep_variant.en-us.group.nested.deep.field')
            
            // Field with the same starting path should not get parent variant
            expect((entry_with_parent_path_variants as any)['$']['group_multiple']).toEqual('data-cslp=entry_asset.entry_uid_3.en-us.group_multiple')

            // Modular block content with variant should get v2 prefix and variant suffix
            expect((entry_with_parent_path_variants as any)['modular_blocks'][0]['$']['content']).toEqual('data-cslp=v2:entry_asset.entry_uid_3_parent_variant.en-us.modular_blocks.0.content')
            // Modular block field inside a variantised parent should get v2 prefix and variant suffix
            expect((entry_with_parent_path_variants as any)['modular_blocks'][0]['content']['$']['title']).toEqual('data-cslp=v2:entry_asset.entry_uid_3_parent_variant.en-us.modular_blocks.0.content.title')

            // Modular block content without variant should not have v2 prefix and variant suffix
            expect((entry_with_parent_path_variants as any)['modular_blocks'][1]['$']['content']).toEqual('data-cslp=entry_asset.entry_uid_3.en-us.modular_blocks.1.content')
            // Modular block field inside a non variantised parent should not get v2 prefix and variant suffix
            expect((entry_with_parent_path_variants as any)['modular_blocks'][1]['content']['$']['title']).toEqual('data-cslp=entry_asset.entry_uid_3.en-us.modular_blocks.1.content.title')

            done()
        })

        it('Entry with modular block variants should apply variants correctly', done => {
            addTags(entry_with_applied_variants, 'entry_asset', false)

            // Modular block content with variant should get v2 prefix and variant suffix
            expect((entry_with_applied_variants as any)['modular_blocks'][1]['$']['content_from_variant']).toEqual('data-cslp=v2:entry_asset.entry_uid_1_variant_3.en-us.modular_blocks.1.content_from_variant')
            // Modular block field inside a variantised parent should get v2 prefix and variant suffix
            expect((entry_with_applied_variants as any)['modular_blocks'][1]['content_from_variant']['$']['title']).toEqual('data-cslp=v2:entry_asset.entry_uid_1_variant_3.en-us.modular_blocks.1.content_from_variant.title')
            // Field inside a variantised parent with a different variant should get v2 prefix and variant suffix of that variant
            expect((entry_with_applied_variants as any)['modular_blocks'][1]['content_from_variant']['$']['different_from_parent_variant']).toEqual('data-cslp=v2:entry_asset.entry_uid_1_variant_4.en-us.modular_blocks.1.content_from_variant.different_from_parent_variant')
            
            // Modular block content without variant should get v2 prefix and variant suffix
            expect((entry_with_applied_variants as any)['modular_blocks'][0]['$']['content']).toEqual('data-cslp=entry_asset.entry_uid_1.en-us.modular_blocks.0.content')
            // Modular block field without variant should not have v2 prefix and variant suffix
            expect((entry_with_applied_variants as any)['modular_blocks'][0]['content']['$']['title']).toEqual('data-cslp=entry_asset.entry_uid_1.en-us.modular_blocks.0.content.title')
            
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

        it('Reference fields should not inherit parent variants when they have no applied_variants', done => {
            const entryWithReferenceAndVariants = {
                "title": "home",
                "url": "/data/all_test/first",
                "single_line": "ssd",
                "tags": ["hi"],
                "locale": "en-us",
                "uid": "blt827e0ad3608248be",
                "created_by": "bltf0d59057590e9b09",
                "updated_by": "bltf0d59057590e9b09",
                "created_at": "2025-08-25T09:43:49.935Z",
                "updated_at": "2025-10-09T11:45:19.967Z",
                "ACL": [] as any[],
                "_version": 40,
                "_in_progress": false,
                "json_rte": "<p>hisdassf</p>",
                "select": "1",
                "group": {
                    "single_line": ""
                },
                "non_single_line_textbox": "",
                "reference": [
                    {
                        "title": "base variant",
                        "single_line": "bases",
                        "tags": [] as any[],
                        "locale": "en-us",
                        "uid": "blt07a6c7258ddba844",
                        "created_by": "bltf0d59057590e9b09",
                        "updated_by": "bltf0d59057590e9b09",
                        "created_at": "2025-10-01T03:10:10.701Z",
                        "updated_at": "2025-10-09T11:44:44.981Z",
                        "_content_type_uid": "all_test_3",
                        "ACL": [] as any[],
                        "_version": 3,
                        "_in_progress": false,
                        "multi_line_reference": "hii\n"
                        // Note: This reference object has NO _applied_variants
                    }
                ],
                "taxonomies": [] as any[],
                "multi_line": "woek",
                "_applied_variants": {
                    "single_line": "csfff653e89df54e8c",
                    "tags": "csfff653e89df54e8c",
                    "multi_line": "csfff653e89df54e8c"
                }
            }
            
            addTags(entryWithReferenceAndVariants, 'all_test', false)
            
            // Parent entry fields with variants should get v2 prefix
            expect((entryWithReferenceAndVariants as any)['$']['single_line']).toEqual('data-cslp=v2:all_test.blt827e0ad3608248be_csfff653e89df54e8c.en-us.single_line')
            expect((entryWithReferenceAndVariants as any)['$']['tags']).toEqual('data-cslp=v2:all_test.blt827e0ad3608248be_csfff653e89df54e8c.en-us.tags')
            expect((entryWithReferenceAndVariants as any)['$']['multi_line']).toEqual('data-cslp=v2:all_test.blt827e0ad3608248be_csfff653e89df54e8c.en-us.multi_line')
            
            // Reference fields should NOT get v2 prefix since they have no _applied_variants
            expect((entryWithReferenceAndVariants as any)['reference'][0]['$']['title']).toEqual('data-cslp=all_test_3.blt07a6c7258ddba844.en-us.title')
            expect((entryWithReferenceAndVariants as any)['reference'][0]['$']['single_line']).toEqual('data-cslp=all_test_3.blt07a6c7258ddba844.en-us.single_line')
            expect((entryWithReferenceAndVariants as any)['reference'][0]['$']['tags']).toEqual('data-cslp=all_test_3.blt07a6c7258ddba844.en-us.tags')
            expect((entryWithReferenceAndVariants as any)['reference'][0]['$']['multi_line_reference']).toEqual('data-cslp=all_test_3.blt07a6c7258ddba844.en-us.multi_line_reference')
            
            done()
        })

        it('Reference fields with their own applied_variants should use their variants', done => {
            const entryWithReferenceHavingVariants = {
                "title": "home",
                "locale": "en-us",
                "uid": "blt827e0ad3608248be",
                "ACL": [] as any[],
                "_version": 40,
                "_in_progress": false,
                "single_line": "parent field",
                "reference": [
                    {
                        "title": "base variant",
                        "single_line": "reference field",
                        "locale": "en-us",
                        "uid": "blt07a6c7258ddba844",
                        "_content_type_uid": "all_test_3",
                        "ACL": [] as any[],
                        "_version": 3,
                        "_in_progress": false,
                        "_applied_variants": {
                            "single_line": "ref_variant_123"
                        }
                    }
                ],
                "_applied_variants": {
                    "single_line": "parent_variant_456"
                }
            }
            
            addTags(entryWithReferenceHavingVariants, 'all_test', false)
            
            // Parent entry field should get parent variant
            expect((entryWithReferenceHavingVariants as any)['$']['single_line']).toEqual('data-cslp=v2:all_test.blt827e0ad3608248be_parent_variant_456.en-us.single_line')
            
            // Reference field should get its own variant, not parent variant
            expect((entryWithReferenceHavingVariants as any)['reference'][0]['$']['title']).toEqual('data-cslp=all_test_3.blt07a6c7258ddba844.en-us.title')
            expect((entryWithReferenceHavingVariants as any)['reference'][0]['$']['single_line']).toEqual('data-cslp=v2:all_test_3.blt07a6c7258ddba844_ref_variant_123.en-us.single_line')
            
            done()
        })

        it('Reference fields should work correctly with tagsAsObject=true', done => {
            const entryWithReferenceAndVariants = {
                "title": "home",
                "single_line": "ssd",
                "locale": "en-us",
                "uid": "blt827e0ad3608248be",
                "ACL": [] as any[],
                "_version": 40,
                "_in_progress": false,
                "reference": [
                    {
                        "title": "base variant",
                        "single_line": "bases",
                        "locale": "en-us",
                        "uid": "blt07a6c7258ddba844",
                        "_content_type_uid": "all_test_3",
                        "ACL": [] as any[],
                        "_version": 3,
                        "_in_progress": false
                        // No _applied_variants
                    }
                ],
                "_applied_variants": {
                    "single_line": "csfff653e89df54e8c"
                }
            }
            
            addTags(entryWithReferenceAndVariants, 'all_test', true)
            
            // Parent entry field with variant should get v2 prefix as object
            expect((entryWithReferenceAndVariants as any)['$']['single_line']).toEqual({'data-cslp': 'v2:all_test.blt827e0ad3608248be_csfff653e89df54e8c.en-us.single_line'})
            
            // Reference fields should NOT get v2 prefix as objects
            expect((entryWithReferenceAndVariants as any)['reference'][0]['$']['title']).toEqual({'data-cslp': 'all_test_3.blt07a6c7258ddba844.en-us.title'})
            expect((entryWithReferenceAndVariants as any)['reference'][0]['$']['single_line']).toEqual({'data-cslp': 'all_test_3.blt07a6c7258ddba844.en-us.single_line'})
            
            done()
        })
    })

})