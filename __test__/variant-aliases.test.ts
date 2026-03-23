import { getVariantAliases, getVariantMetadataTags } from '../src/variant-aliases';
import { variantEntrySingle, variantEntries } from './mock/variant-fixtures';

function sortAliases(aliases: string[]): string[] {
  return [...aliases].sort((a, b) => a.localeCompare(b));
}

describe('getVariantAliases', () => {
  const contentTypeUid = 'movie';

  it('extracts variant aliases for a single entry with explicit contentTypeUid', () => {
    const result = getVariantAliases(variantEntrySingle, contentTypeUid);
    expect(result.entry_uid).toBe('entry_uid_single');
    expect(result.contenttype_uid).toBe(contentTypeUid);
    expect(sortAliases(result.variants)).toEqual(sortAliases(['cs_personalize_0_0', 'cs_personalize_0_3']));
  });

  it('uses _content_type_uid from entry when present', () => {
    const entry = {
      ...variantEntrySingle,
      _content_type_uid: 'from_entry',
    };
    const result = getVariantAliases(entry, 'ignored');
    expect(result.contenttype_uid).toBe('from_entry');
  });

  it('returns empty contenttype_uid when missing from entry and not passed', () => {
    const result = getVariantAliases(variantEntrySingle);
    expect(result.contenttype_uid).toBe('');
  });

  it('maps multiple entries in order', () => {
    const results = getVariantAliases(variantEntries, contentTypeUid);
    expect(results).toHaveLength(3);
    expect(results[0].entry_uid).toBe('entry_uid_1');
    expect(sortAliases(results[0].variants)).toEqual(sortAliases(['cs_personalize_0_0', 'cs_personalize_0_3']));
    expect(results[1].entry_uid).toBe('entry_uid_2');
    expect(results[1].variants).toEqual(['cs_personalize_0_0']);
    expect(results[2].entry_uid).toBe('entry_uid_3');
    expect(results[2].variants).toEqual([]);
  });

  it('returns empty variants when publish_details or variants is absent', () => {
    const entry = { uid: 'u1', _content_type_uid: 'ct' };
    expect(getVariantAliases(entry).variants).toEqual([]);
    const entry2 = { uid: 'u1', publish_details: {} };
    expect(getVariantAliases(entry2).variants).toEqual([]);
    const entry3 = { uid: 'u1', publish_details: { variants: {} } };
    expect(getVariantAliases(entry3).variants).toEqual([]);
  });

  it('skips variant objects with missing or empty alias', () => {
    const entry = {
      uid: 'u1',
      publish_details: {
        variants: {
          a: { alias: 'keep_me' },
          b: { alias: '' },
          c: {},
          d: { alias: 'also_keep' },
        },
      },
    };
    const result = getVariantAliases(entry);
    expect(sortAliases(result.variants)).toEqual(sortAliases(['keep_me', 'also_keep']));
  });

  it('throws when entry is null or undefined', () => {
    expect(() => getVariantAliases(null as unknown as Record<string, unknown>)).toThrow();
    expect(() => getVariantAliases(undefined as unknown as Record<string, unknown>)).toThrow();
  });

  it('throws when entry uid is missing or empty', () => {
    expect(() => getVariantAliases({})).toThrow(/uid/i);
    expect(() => getVariantAliases({ uid: '' })).toThrow(/uid/i);
  });

  it('throws when entries array contains a non-object', () => {
    expect(() => getVariantAliases([variantEntrySingle, null as unknown as Record<string, unknown>])).toThrow();
  });
});

describe('getVariantMetadataTags', () => {
  const contentTypeUid = 'movie';

  it('serialises array results as JSON in data-csvariants', () => {
    const tag = getVariantMetadataTags(variantEntries, contentTypeUid);
    expect(tag).toHaveProperty('data-csvariants');
    const parsed = JSON.parse(tag['data-csvariants']) as Array<{
      entry_uid: string;
      contenttype_uid: string;
      variants: string[];
    }>;
    expect(parsed).toHaveLength(3);
    expect(parsed[0].entry_uid).toBe('entry_uid_1');
    expect(sortAliases(parsed[0].variants)).toEqual(sortAliases(['cs_personalize_0_0', 'cs_personalize_0_3']));
  });

  it('returns empty JSON array string for empty entries', () => {
    const tag = getVariantMetadataTags([]);
    expect(tag['data-csvariants']).toBe('[]');
  });

  it('throws when entries is null or not an array', () => {
    expect(() => getVariantMetadataTags(null as unknown as Record<string, unknown>[])).toThrow();
    expect(() => getVariantMetadataTags({} as unknown as Record<string, unknown>[])).toThrow();
  });
});
