import * as yup from 'yup';

import IndiaFlag from '@/assets/flags/india.svg';
import EnglishFlag from '@/assets/flags/english.svg';
import NepalFlag from '@/assets/flags/nepal.svg';
import KoreaFlag from '@/assets/flags/korea.svg';
import SpainFlag from '@/assets/flags/spain.svg';

export const TOKEN_NAME = 'project-shelf';

export const projectValidationSchema = yup.object().shape({
  title: yup.string().required('This is a required field'),
  description: yup.string().required('This is a required field'),
  repoLink: yup
    .string()
    .url('It must be a valid URL')
    .required('This is a required field'),
  siteLink: yup
    .string()
    .url('It must be a valid URL')
    .required('This is a required field'),
  tags: yup
    .array()
    .of(yup.object().shape({ value: yup.string(), label: yup.string() }))
    .min(1, 'Add at least one tag')
    .max(5, 'Add no more than five tags'),
  preview: yup.string().required('This is a required field'),
});

export const LANG_LOCALE_STORAGE_KEY = 'project-shelf-lang';

export const LOCALES = [
  {
    code: 'en',
    flag: EnglishFlag,
  },
  { code: 'ne', flag: NepalFlag },
  { code: 'hi', flag: IndiaFlag },
  { code: 'ko', flag: KoreaFlag },
  { code: 'es', flag: SpainFlag },
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
};
