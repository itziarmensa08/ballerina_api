export interface IVisit extends Document {
  date: string; // formato YYYY-MM-DD
  count: number;
  uniqueIps: string[];
}