import { Types } from "mongoose";

export interface IDocument {
  title: string;
  sortDescription: string;
  detailDescription: string;
  document: string[];
  category: Types.ObjectId;
  user: Types.ObjectId;
  isActive: boolean;
}
