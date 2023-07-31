import * as zod from 'zod';

import IndiaFlag from '@/assets/flags/india.svg';
import EnglishFlag from '@/assets/flags/english.svg';
import NepalFlag from '@/assets/flags/nepal.svg';
import KoreaFlag from '@/assets/flags/korea.svg';
import SpainFlag from '@/assets/flags/spain.svg';

export const TOKEN_NAME = 'project-shelf';

const REQUIRED_ERROR = 'This is is a required field';

export const projectValidationSchema = zod.object({
  title: zod.string(),
  description: zod.string({
    required_error: REQUIRED_ERROR,
  }),
  repoLink: zod
    .string({
      required_error: REQUIRED_ERROR,
    })
    .url('It must be a valid URL'),
  siteLink: zod
    .string({
      required_error: REQUIRED_ERROR,
    })
    .url('It must be a valid URL'),
  tags: zod
    .object(
      { value: zod.string(), label: zod.string() },
      {
        required_error: 'Add at least one tag',
      }
    )
    .array()
    .min(1, 'Add at least one tag')
    .max(5, 'Add no more than five tags'),
  preview: zod.string().or(zod.custom<Blob>((v) => v instanceof Blob)),
});

export type FormTypes = zod.infer<typeof projectValidationSchema>;

export const LANG_LOCALE_STORAGE_KEY = 'project-shelf-lang';

export const LOCALES = [
  {
    code: 'en',
    flag: <EnglishFlag />,
  },
  { code: 'ne', flag: <NepalFlag /> },
  { code: 'hi', flag: <IndiaFlag /> },
  { code: 'ko', flag: <KoreaFlag /> },
  { code: 'es', flag: <SpainFlag /> },
];

export const NEXT_LOCALE = 'NEXT_LOCALE';

export const IMGBOT_ID = 31427850;

export const PROJECT_SHELF_CONTRIBUTORS_API =
  'https://api.github.com/repos/project-shelf/project-shelf/contributors';

export const YESTERDAY = Math.floor(Date.now() / 1000) - 24 * 60 * 60;
export const A_WEEK_AGO = Math.floor(Date.now() / 1000) - 7 * 24 * 60 * 60;
export const A_MONTH_AGO = Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60;

export const INTERVALS = {
  today: new Date(YESTERDAY * 1000).toISOString(),
  'this-week': new Date(A_WEEK_AGO * 1000).toISOString(),
  'this-month': new Date(A_MONTH_AGO * 1000).toISOString(),
} as const;

export type IntervalLabels = 'today' | 'this-week' | 'this-month';

export const EN_LOCALE = 'en';

export const TERMS_AND_CONDITIONS = [
  {
    terms_and_conditions_heading: 'introduction',
    terms_and_conditions_content: 'introduction-content',
  },
  {
    terms_and_conditions_heading: 'agreement-to',
    terms_and_conditions_content: 'agreement-to-content',
  },
  {
    terms_and_conditions_heading: 'pro',
    terms_and_conditions_content: 'pro-content',
  },
  {
    terms_and_conditions_heading: 'refund',
    terms_and_conditions_content: 'refund-content',
  },
  {
    terms_and_conditions_heading: 'product-usage',
    terms_and_conditions_content: 'product-usage-content',
  },
  {
    terms_and_conditions_heading: 'disclaimer',
    terms_and_conditions_content: 'disclaimer-content',
  },
  {
    terms_and_conditions_heading: 'warranties',
    terms_and_conditions_content: 'warranties-content',
  },

  {
    terms_and_conditions_heading: 'changes',
    terms_and_conditions_content: 'changes-content',
  },
  {
    terms_and_conditions_heading: 'governing-law',
    terms_and_conditions_content: 'governing-law-content',
  },
];
