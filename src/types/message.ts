export interface Message {
  text: string;
  user: string;
  loading?: boolean;
  graphData?: any;
  related?: any;
  reference?: any;
  stream?: boolean;
  streamCompleted?: boolean;
}
