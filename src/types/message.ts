export interface Message {
  text: string;
  user: string;
  loading?: boolean;
  graphData?: any;
  related?: string[];
  reference?: string[];
  providers?: string[];
  subqueryQuestion?: string[];
  subqueryResponse?: string[];
  stream?: boolean;
  streamCompleted?: boolean;
}
