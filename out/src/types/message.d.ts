export interface Message {
    text: string;
    user: string;
    loading?: boolean;
    graphData?: any;
    related?: any;
    reference?: any;
    providers?: any;
    stream?: boolean;
    streamCompleted?: boolean;
}
