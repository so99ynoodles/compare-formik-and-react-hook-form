import * as yup from "yup";
import { requiredStringSchema } from "../../yup";

const validationSchema = yup.object({
  items: yup.array().of(
    yup.object({
      title: requiredStringSchema,
    })
  ),
});

export { validationSchema };
