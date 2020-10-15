import React, { FC } from "react";
import { useForm, useFieldArray, Control, useWatch } from "react-hook-form";
import {
  FeedbackSheetItemTypeOptions,
  FeedbackSheetObjectiveItemOptions,
} from "../options";
import {
  FeedbackSheetItemAuthorTypes,
  FeedbackSheetItemTypes,
  FeedbackSheetObjectiveItemTypes,
  Item,
  Values,
} from "../types";

interface ReactHookFormExampleProps {
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

const ItemField: FC<{
  control: Control;
  index: number;
}> = ({ control, index }) => {
  const item = useWatch<Item>({
    name: `items[${index}]`,
    control,
    defaultValue: defaultItem,
  });

  return (
    <>
      <div>
        <label>Item Name</label>
        <input ref={control.register()} name={`items[${index}].title`} />
      </div>
      <div>
        <label>Item Type</label>
        <select name={`items[${index}].type`} ref={control.register()}>
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
          name={`items[${index}].description`}
          ref={control.register()}
        />
      </div>

      {item.type === FeedbackSheetItemTypes.Grade && (
        <>
          <label>Grade Options</label>
          {item?.gradeOptions?.map((_: any, optionIndex: number) => {
            return (
              <div key={optionIndex}>
                <input
                  ref={control.register()}
                  name={`items[${index}].gradeOptions.${optionIndex}`}
                />
              </div>
            );
          })}
          <button
            onClick={(e) => {
              e.preventDefault();
              control.setValue(`items[${index}].gradeOptions`, [
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
          <input name={`items[${index}].numberUnit`} ref={control.register()} />
        </>
      )}
      {item.type === FeedbackSheetItemTypes.Objective && (
        <>
          <label>elementType Type</label>
          <select name={`items[${index}].elementType`} ref={control.register()}>
            {FeedbackSheetObjectiveItemOptions.map((option) => (
              <option key={option.value}>{option.label}</option>
            ))}
          </select>
          {item.elementType === FeedbackSheetObjectiveItemTypes.Grade && (
            <>
              <label>Grade Options</label>
              {item?.gradeOptions?.map((_: any, optionIndex: number) => {
                return (
                  <div key={optionIndex}>
                    <input
                      name={`items[${index}].gradeOptions.${optionIndex}`}
                      ref={control.register()}
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
                name={`items[${index}].numberUnit`}
                ref={control.register()}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

const ReactHookFormExample: FC<ReactHookFormExampleProps> = ({
  onSubmit,
  items,
}) => {
  const { register, handleSubmit, control } = useForm<{
    items: Item[];
    displayObjectives: boolean;
  }>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      items,
      displayObjectives: true,
    },
    resolver: undefined,
    context: undefined,
    criteriaMode: "firstError",
    shouldFocusError: true,
    shouldUnregister: true,
  });

  const { fields, append } = useFieldArray({
    control,
    name: "items",
  });

  console.log("react-hook-form rendered");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Display Objectives</label>
      <input ref={register} type="checkbox" name="displayObjectives" />

      {fields.map((_, index) => (
        <div key={index}>
          <ItemField control={control} index={index} />
        </div>
      ))}

      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            append(defaultItem);
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

export default ReactHookFormExample;
