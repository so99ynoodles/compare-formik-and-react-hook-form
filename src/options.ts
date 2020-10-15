import { FeedbackSheetItemTypes, FeedbackSheetObjectiveItemTypes } from "./types";

export const FeedbackSheetItemTypeOptions = [
{
    order: 10,
    value: FeedbackSheetItemTypes.Guideline,
    label: '説明',
  },
{
    order: 20,
    value: FeedbackSheetItemTypes.Comment,
    label: 'フリーコメント評価',
  },
{
    order: 30,
    value: FeedbackSheetItemTypes.Grade,
    label: 'レーティング評価',
  },
{
    order: 40,
    value: FeedbackSheetItemTypes.Number,
    label: '数値評価',
  },
{
    order: 50,
    value: FeedbackSheetItemTypes.Objective,
    label: '目標に対する評価',
  },
]

export const FeedbackSheetObjectiveItemOptions = [
{
    order: 10,
    value: FeedbackSheetObjectiveItemTypes.Grade,
    label: 'レーティング評価',
  },
{
    order: 20,
    value: FeedbackSheetObjectiveItemTypes.Number,
    label: '数値評価',
  },
{
    order: 30,
    value: FeedbackSheetObjectiveItemTypes.Comment,
    label: 'フリーコメント評価',
  },
]