import { Message } from '@/types/message';
declare const RenderFunctions: ({
  welcomeMessageRenderFunction,
  botMessageRenderFunction,
  userMessageRenderFunction,
  dataRenderFunction,
  providerRenderFunction,
  referenceRenderFunction,
  relatedQuestionsRenderFunction,
  subqueryRenderFunction,
}: {
  welcomeMessageRenderFunction?: Function | undefined;
  botMessageRenderFunction?: Function | undefined;
  userMessageRenderFunction?: Function | undefined;
  dataRenderFunction?: Function | undefined;
  providerRenderFunction?: Function | undefined;
  referenceRenderFunction?: Function | undefined;
  relatedQuestionsRenderFunction?: Function | undefined;
  subqueryRenderFunction?: Function | undefined;
  sendCustomMessage: Function;
}) => {
  WelcomeMessageRender: (sendCustomMessage: (message: string) => void) => any;
  BotMessageRender: (message: Message, input: string) => any;
  UserMessageRender: (text: string) => any;
  DataRender: (data: any) => any;
  ProviderRender: (providers: any) => any;
  ReferenceRender: (reference: any) => any;
  RelatedQuestionsRender: (
    relatedQuestions: any,
    sendCustomMessage: (message: string) => void,
  ) => any;
  SubqueryRender: (subqueryQuestion: any, subqueryResponse: any) => any;
};
export default RenderFunctions;
