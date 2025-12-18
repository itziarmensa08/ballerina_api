export interface IVisit extends Document {
  date: string; // formato YYYY-MM-DD
  count: number;
  visitors: string[];
}