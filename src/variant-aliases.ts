/**
 * Shape returned by {@link getVariantAliases} for interoperability with other Utils SDKs (snake_case JSON keys).
 */
export interface VariantAliasesResult {
  entry_uid: string;
  contenttype_uid: string;
  variants: string[];
}

/** CDA entry JSON: at minimum includes `uid`; may include `_content_type_uid` and `publish_details.variants`. */
export type CDAEntryLike = Record<string, unknown>;

function assertPlainObject(value: unknown, message: string): asserts value is Record<string, unknown> {
  if (value === null || value === undefined) {
    throw new TypeError(message);
  }
  if (typeof value !== 'object' || Array.isArray(value)) {
    throw new TypeError(message);
  }
}

function requireEntryUid(entry: Record<string, unknown>): string {
  const uid = entry.uid;
  if (typeof uid !== 'string' || uid.length === 0) {
    throw new Error('Entry uid is required. The entry must include a non-empty uid string.');
  }
  return uid;
}

function resolveContentTypeUid(entry: Record<string, unknown>, contentTypeUid?: string): string {
  const fromEntry = entry._content_type_uid;
  if (typeof fromEntry === 'string' && fromEntry.length > 0) {
    return fromEntry;
  }
  if (typeof contentTypeUid === 'string' && contentTypeUid.length > 0) {
    return contentTypeUid;
  }
  return '';
}

function collectVariantAliases(entry: Record<string, unknown>): string[] {
  const publishDetails = entry.publish_details;
  if (!publishDetails || typeof publishDetails !== 'object' || Array.isArray(publishDetails)) {
    return [];
  }
  const variants = (publishDetails as Record<string, unknown>).variants;
  if (!variants || typeof variants !== 'object' || Array.isArray(variants)) {
    return [];
  }
  const out: string[] = [];
  const map = variants as Record<string, unknown>;
  for (const key of Object.keys(map)) {
    const v = map[key];
    if (!v || typeof v !== 'object' || Array.isArray(v)) {
      continue;
    }
    const alias = (v as { alias?: unknown }).alias;
    if (typeof alias === 'string' && alias.length > 0) {
      out.push(alias);
    }
  }
  return out;
}

function mapEntryToResult(entry: Record<string, unknown>, contentTypeUid?: string): VariantAliasesResult {
  return {
    entry_uid: requireEntryUid(entry),
    contenttype_uid: resolveContentTypeUid(entry, contentTypeUid),
    variants: collectVariantAliases(entry),
  };
}

/**
 * Extracts variant **alias** strings from `publish_details.variants` on a CDA entry.
 * Only present when the entry was fetched with the `x-cs-variant-uid` header set to variant **aliases** (not UIDs).
 *
 * @param entry - Single CDA entry object (must include `uid`).
 * @param contentTypeUid - Used when `entry._content_type_uid` is missing. Otherwise omitted or empty string yields `contenttype_uid: ""`.
 * @returns `{ entry_uid, contenttype_uid, variants }` with snake_case keys for cross-SDK JSON parity.
 * @throws TypeError if `entry` is null/undefined or not a plain object.
 * @throws Error if `entry` has no non-empty `uid`.
 */
export function getVariantAliases(entry: CDAEntryLike, contentTypeUid?: string): VariantAliasesResult;

/**
 * Extracts variant aliases for each entry in order.
 *
 * @param entries - Array of CDA entry objects.
 * @param contentTypeUid - Applied when an entry lacks `_content_type_uid`.
 * @returns One result object per input entry.
 * @throws TypeError if `entries` is null/undefined or not an array, or any element is not a plain object.
 * @throws Error if any entry has no non-empty `uid`.
 */
export function getVariantAliases(entries: CDAEntryLike[], contentTypeUid?: string): VariantAliasesResult[];

export function getVariantAliases(
  entryOrEntries: CDAEntryLike | CDAEntryLike[],
  contentTypeUid?: string
): VariantAliasesResult | VariantAliasesResult[] {
  if (Array.isArray(entryOrEntries)) {
    return entryOrEntries.map((e) => {
      assertPlainObject(e, 'Each entry must be a plain object with a uid.');
      return mapEntryToResult(e, contentTypeUid);
    });
  }
  assertPlainObject(entryOrEntries, 'Entry is required. Provide a CDA entry object with a uid.');
  return mapEntryToResult(entryOrEntries, contentTypeUid);
}

/**
 * Serialises variant alias results for use as an HTML `data-csvariants` attribute value.
 *
 * @param entries - CDA entries to process (same rules as {@link getVariantAliases} for each item).
 * @param contentTypeUid - Applied when an entry lacks `_content_type_uid`.
 * @returns `{ "data-csvariants": "<JSON string of VariantAliasesResult[]>" }`.
 * @throws TypeError if `entries` is null/undefined or not an array, or any element is not a plain object.
 * @throws Error if any entry has no non-empty `uid`.
 */
export function getVariantMetadataTags(
  entries: CDAEntryLike[],
  contentTypeUid?: string
): { 'data-csvariants': string } {
  if (entries === null || entries === undefined) {
    throw new TypeError('Entries array is required. Provide an array of CDA entry objects.');
  }
  if (!Array.isArray(entries)) {
    throw new TypeError('Entries must be an array of CDA entry objects.');
  }
  const payload = getVariantAliases(entries, contentTypeUid);
  return { 'data-csvariants': JSON.stringify(payload) };
}
