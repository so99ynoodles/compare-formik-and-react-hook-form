import * as yup from 'yup';

const DIGIT_PATTURN = /\.([0-9]+)$/;

const digitDecimal = (digit: number) => (value: number) => {
  const matches = value.toString().match(DIGIT_PATTURN);
  if (!matches) {
    return true;
  }
  return matches[1].length <= digit;
};

export const validateWithSchema = (schema: yup.Schema<any>) => (value: any) => {
  return schema
    .validate(value)
    .then(() => null)
    .catch(error => error?.errors?.[0]);
};

export const requiredStringSchema = yup
  .string()
  .trim()
  .notOneOf([''], '必須項目です')
  .required();

export const requiredStringArraySchema = yup
  .array()
  .of(yup.string())
  .required();

export const requiredStringArrayMax1Schema = yup
  .array()
  .of(yup.string())
  .max(1)
  .required();

export const requiredStringArrayMin1Schema = yup
  .array()
  .of(yup.string())
  .min(1)
  .required();

export const requiredStringWithoutTrimSchema = yup
  .string()
  .notOneOf([''], '必須項目です')
  .required();

export const zipCodeSchema = requiredStringSchema.matches(
  /^\d{3}[-]\d{4}$/,
  'ハイフン(-)付きの7桁でご入力ください'
);

export const emailSchema = requiredStringWithoutTrimSchema.email();

export const nullableStringSchema = yup.string().nullable();

export const MAX_INT32 = 2147483647; // 2 ** 31 - 1;
export const MIN_INT32 = -MAX_INT32;

export const requiredIntegerNumberSchema = yup
  .number()
  .integer('小数点なしでご入力ください')
  .typeError('半角数字でご入力ください')
  .min(MIN_INT32)
  .max(MAX_INT32)
  .required();

export const requiredDigitNumberSchema = yup
  .number()
  .typeError('半角数字でご入力ください')
  .required()
  .min(MIN_INT32)
  .max(MAX_INT32)
  .test('digit', '小数点以下2桁でご入力ください', digitDecimal(2) as any);

export const nullableNumberSchema = yup
  .number()
  .min(MIN_INT32)
  .max(MAX_INT32)
  .typeError('半角数字でご入力ください')
  .nullable();

export const urlSchema = yup
  .string()
  .trim()
  .url('有効なURLでご入力ください')

export const isNullOrUndefined = (value: any) => value === null || value === undefined;
