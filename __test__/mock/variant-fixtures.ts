/** CDA-style fixtures aligned with variant utility spec / Java Utils tests. */

export const variantEntrySingle = {
  uid: 'entry_uid_single',
  _metadata: {},
  locale: 'en-us',
  _version: 1,
  ACL: {},
  _in_progress: false,
  title: 'Sample Movie',
  created_at: '2025-11-20T10:00:00.000Z',
  updated_at: '2025-12-11T07:56:17.574Z',
  created_by: 'test_user',
  updated_by: 'test_user',
  publish_details: {
    time: '2025-12-11T07:56:17.574Z',
    user: 'test_user',
    environment: 'test_env',
    locale: 'en-us',
    variants: {
      cs_variant_0_0: {
        alias: 'cs_personalize_0_0',
        environment: 'test_env',
        time: '2025-12-11T07:56:17.574Z',
        locale: 'en-us',
        user: 'test_user',
        version: 1,
      },
      cs_variant_0_3: {
        alias: 'cs_personalize_0_3',
        environment: 'test_env',
        time: '2025-12-11T07:56:17.582Z',
        locale: 'en-us',
        user: 'test_user',
        version: 1,
      },
    },
  },
} as Record<string, unknown>;

export const variantEntries = [
  {
    uid: 'entry_uid_1',
    _metadata: {},
    locale: 'en-us',
    _version: 1,
    title: 'Sample Movie',
    publish_details: {
      time: '2025-12-11T07:56:17.574Z',
      user: 'test_user',
      environment: 'test_env',
      locale: 'en-us',
      variants: {
        cs_variant_0_0: {
          alias: 'cs_personalize_0_0',
          environment: 'test_env',
          time: '2025-12-11T07:56:17.574Z',
          locale: 'en-us',
          user: 'test_user',
          version: 1,
        },
        cs_variant_0_3: {
          alias: 'cs_personalize_0_3',
          environment: 'test_env',
          time: '2025-12-11T07:56:17.582Z',
          locale: 'en-us',
          user: 'test_user',
          version: 1,
        },
      },
    },
  },
  {
    uid: 'entry_uid_2',
    _metadata: {},
    locale: 'en-us',
    _version: 2,
    title: 'Another Movie',
    publish_details: {
      time: '2025-12-11T07:10:19.964Z',
      user: 'test_user',
      environment: 'test_env',
      locale: 'en-us',
      variants: {
        cs_variant_0_0: {
          alias: 'cs_personalize_0_0',
          environment: 'test_env',
          time: '2025-12-11T07:10:19.964Z',
          locale: 'en-us',
          user: 'test_user',
          version: 2,
        },
      },
    },
  },
  {
    uid: 'entry_uid_3',
    _metadata: {},
    locale: 'en-us',
    _version: 1,
    title: 'Movie No Variants',
    publish_details: {
      time: '2025-11-20T10:00:00.000Z',
      user: 'test_user',
      environment: 'test_env',
      locale: 'en-us',
    },
  },
] as Record<string, unknown>[];
