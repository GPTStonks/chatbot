import React from 'react';
declare const DefaultRenderFunctions: {
  defaultWelcomeMessageRenderFunction: (
    sendCustomMessage: (message: string) => void,
  ) => React.JSX.Element;
  defaultBotMessageRenderFunction: (message: any, input: string) => React.JSX.Element;
  defaultUserMessageRenderFunction: (text: string) => React.JSX.Element;
  defaultSubqueryRenderFunction: (
    subqueryQuestion: string[],
    subqueryResponse: string[],
  ) => React.JSX.Element;
  defaultLoadingRenderFunction: (
    text: string,
    themeConfig: any,
    subquery_arrays: any,
    type?: number,
  ) => React.JSX.Element;
};
export default DefaultRenderFunctions;
