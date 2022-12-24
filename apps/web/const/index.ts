import * as yup from 'yup';

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
