import React, { FC } from "react";
import { Field, FieldArray, Formik, useField } from "formik";
import {
  FeedbackSheetItemAuthorTypes,
  FeedbackSheetItemTypes,
  FeedbackSheetObjectiveItemTypes,
  Item,
  Values,
} from "../../types";
import {
  FeedbackSheetItemTypeOptions,
  FeedbackSheetObjectiveItemOptions,
} from "../../options";
import { requiredStringSchema, validateWithSchema } from "../../yup";

const MyTextField: FC<any> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label>
        {label}
        <input {...field} {...props} />
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

interface FormikExampleProps {
  items: Item[];
  onSubmit: (values: Values) => void;
}

const defaultItem: Item = {
  title: "",
  type: FeedbackSheetItemTypes.Comment,
  description: "",
  numberUnit: "",
  gradeOptions: ["", ""],
  required: true,
  authorTypes: [
    FeedbackSheetItemAuthorTypes.Self,
    FeedbackSheetItemAuthorTypes.Sender,
  ],
  elementType: FeedbackSheetObjectiveItemTypes.Grade,
};

const FormikExample: FC<FormikExampleProps> = ({ items, onSubmit }) => {
  const initialValues = {
    items,
    displayObjectives: true,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ handleSubmit, values }) => {
        console.log("formik-with-hoc rendered");
        return (
          <form onSubmit={handleSubmit}>
            <label>Display Objectives</label>
            <Field
              type="checkbox"
              name="displayObjectives"
              checked={values.displayObjectives}
              validate={validateWithSchema(requiredStringSchema)}
            />

            <FieldArray name="items">
              {({ push }) => (
                <>
                  {values.items.map((item, index) => (
                    <div key={index}>
                      <div>
                        <label>Item Name</label>
                        <MyTextField
                          label="title"
                          name={`items.${index}.title`}
                        />
                      </div>
                      <div>
                        <label>Item Type</label>
                        <Field
                          as="select"
                          name={`items.${index}.type`}
                          validate={validateWithSchema(requiredStringSchema)}
                        >
                          {FeedbackSheetItemTypeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Field>
                      </div>
                      <div>
                        <label>Description</label>
                        <Field
                          as="textarea"
                          name={`items.${index}.description`}
                          validate={validateWithSchema(requiredStringSchema)}
                        />
                      </div>
                      {item.type === FeedbackSheetItemTypes.Grade && (
                        <FieldArray name={`items.${index}.gradeOptions`}>
                          {({ push }) => (
                            <>
                              <label>Grade Options</label>
                              {item?.gradeOptions?.map((_, optionIndex) => {
                                return (
                                  <div key={optionIndex}>
                                    <Field
                                      name={`items.${index}.gradeOptions.${optionIndex}`}
                                      validate={validateWithSchema(
                                        requiredStringSchema
                                      )}
                                    />
                                  </div>
                                );
                              })}
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  push("");
                                }}
                              >
                                Add Option
                              </button>
                            </>
                          )}
                        </FieldArray>
                      )}
                      {item.type === FeedbackSheetItemTypes.Number && (
                        <>
                          <label>Unit</label>
                          <Field
                            name={`items.${index}.numberUnit`}
                            validate={validateWithSchema(requiredStringSchema)}
                          />
                        </>
                      )}
                      {item.type === FeedbackSheetItemTypes.Objective && (
                        <>
                          <label>elementType Type</label>
                          <Field
                            as="select"
                            name={`items.${index}.elementType`}
                          >
                            {FeedbackSheetObjectiveItemOptions.map((option) => (
                              <option key={option.value}>{option.label}</option>
                            ))}
                          </Field>
                          {item.elementType ===
                            FeedbackSheetObjectiveItemTypes.Grade && (
                            <FieldArray name={`items.${index}.gradeOptions`}>
                              {({ push }) => (
                                <>
                                  <label>Grade Options</label>
                                  {item?.gradeOptions?.map((_, optionIndex) => {
                                    return (
                                      <div key={optionIndex}>
                                        <Field
                                          name={`items.${index}.gradeOptions.${optionIndex}`}
                                          validate={validateWithSchema(
                                            requiredStringSchema
                                          )}
                                        />
                                      </div>
                                    );
                                  })}
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      push("");
                                    }}
                                  >
                                    Add Option
                                  </button>
                                </>
                              )}
                            </FieldArray>
                          )}
                          {item.elementType ===
                            FeedbackSheetObjectiveItemTypes.Number && (
                            <>
                              <label>Unit</label>
                              <Field
                                name={`items.${index}.numberUnit`}
                                validate={validateWithSchema(
                                  requiredStringSchema
                                )}
                              />
                            </>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                  <div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        push(defaultItem);
                      }}
                    >
                      Add item
                    </button>
                  </div>
                </>
              )}
            </FieldArray>
            <div>
              <button type="submit">submit</button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default FormikExample;
