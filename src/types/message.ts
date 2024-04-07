export interface Message {
  text: string;
  user: string;
  loading?: boolean;
  graphData?: any;
  relatedQuestions?: any;
  reference?: any;
}
