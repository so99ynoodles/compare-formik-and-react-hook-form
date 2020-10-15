export enum FeedbackSheetItemAuthorTypes {
  Self = 'self',
  Sender = 'sender',
  Reader = 'reader',
}

export enum FeedbackSheetItemTypes {
  Guideline = 'guideline',
  Comment = 'comment',
  Grade = 'grade',
  Number = 'number',
  Objective = 'objective',
}

export enum FeedbackSheetObjectiveItemTypes {
  Comment = 'comment',
  Grade = 'grade',
  Number = 'number',
}

export type FeedbackSheetItemTemplate = {
  id:string | number;
  templateId?: string | number;
  type: FeedbackSheetItemTypes;
  authorTypes?: FeedbackSheetItemAuthorTypes[];
  order?: number
  required?: boolean
  title?: string
  description?: string
};

export interface Item {
  id?: string | number;
  type?: FeedbackSheetItemTypes;
  authorTypes?: FeedbackSheetItemAuthorTypes[];
  order?: number
  required?: boolean
  description?: string
  title?: string
  elementType?: FeedbackSheetObjectiveItemTypes;
  gradeOptions?: string[]
  numberUnit?: string
}

export interface Values {
  displayObjectives: boolean
  items: Item[]
}

