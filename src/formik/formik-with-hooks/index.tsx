import React, { FC } from "react";
import { useFormik } from "formik";
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
import { validationSchema } from "./validationSchema";

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

  const {
    handleSubmit,
    values,
    handleChange,
    handleReset,
    setFieldValue,
  } = useFormik({
    initialValues,
    onSubmit,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema,
  });

  console.log(
    "%c formik-with-hooks rendered",
    "color: green; font-weight: bold"
  );

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <label>Display Objectives</label>
      <input
        type="checkbox"
        name="displayObjectives"
        value={String(values.displayObjectives)}
        checked={values.displayObjectives}
        onChange={handleChange}
      />

      {values.items.map((item, index) => (
        <div key={index}>
          <div>
            <label>Item Name</label>
            <input
              name={`items.${index}.title`}
              value={values.items[index].title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Item Type</label>
            <select
              name={`items.${index}.type`}
              value={values.items[index].type}
              onChange={handleChange}
            >
              {FeedbackSheetItemTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Description</label>
            <textarea
              name={`items.${index}.description`}
              value={values.items[index].description}
              onChange={handleChange}
            />
          </div>

          {item.type === FeedbackSheetItemTypes.Grade && (
            <>
              <label>Grade Options</label>
              {item?.gradeOptions?.map((_, optionIndex) => {
                return (
                  <div key={optionIndex}>
                    <input
                      name={`items.${index}.gradeOptions.${optionIndex}`}
                      value={item!.gradeOptions![optionIndex]}
                      onChange={handleChange}
                    />
                  </div>
                );
              })}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setFieldValue(`items.${index}.gradeOptions`, [
                    ...(item.gradeOptions || []),
                    "",
                  ]);
                }}
              >
                Add Option
              </button>
            </>
          )}
          {item.type === FeedbackSheetItemTypes.Number && (
            <>
              <label>Unit</label>
              <input
                name={`items.${index}.numberUnit`}
                value={item.numberUnit}
                onChange={handleChange}
              />
            </>
          )}
          {item.type === FeedbackSheetItemTypes.Objective && (
            <>
              <label>elementType Type</label>
              <select
                name={`items.${index}.elementType`}
                value={item.elementType}
                onChange={handleChange}
              >
                {FeedbackSheetObjectiveItemOptions.map((option) => (
                  <option key={option.value}>{option.label}</option>
                ))}
              </select>
              {item.elementType === FeedbackSheetObjectiveItemTypes.Grade && (
                <>
                  <label>Grade Options</label>
                  {item?.gradeOptions?.map((_, optionIndex) => {
                    return (
                      <div key={optionIndex}>
                        <input
                          name={`items.${index}.gradeOptions.${optionIndex}`}
                          value={item.gradeOptions![optionIndex]}
                          onChange={handleChange}
                        />
                      </div>
                    );
                  })}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    Add Option
                  </button>
                </>
              )}

              {item.elementType === FeedbackSheetObjectiveItemTypes.Number && (
                <>
                  <label>Unit</label>
                  <input
                    name={`items.${index}.numberUnit`}
                    value={item.numberUnit}
                    onChange={handleChange}
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
            setFieldValue("items", [...values.items, defaultItem]);
          }}
        >
          Add item
        </button>
      </div>
      <div>
        <button type="submit">submit</button>
      </div>
    </form>
  );
};

export default FormikExample;
