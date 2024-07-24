import React from 'react';
declare const defaultWelcomeMessageRenderFunction: (
  sendCustomMessage: (message: string) => void,
) => React.JSX.Element;
declare const defaultBotMessageRenderFunction: (message: any, input: string) => React.JSX.Element;
declare const defaultUserMessageRenderFunction: (text: string) => React.JSX.Element;
declare const defaultSubqueryRenderFunction: (
  subqueryQuestion: string[],
  subqueryResponse: string[],
) => React.JSX.Element;
declare const defaultLoadingRenderFunction: (
  text: string,
  themeConfig: any,
  subquery_arrays: any,
  type?: number,
) => React.JSX.Element;
export {
  defaultWelcomeMessageRenderFunction,
  defaultBotMessageRenderFunction,
  defaultUserMessageRenderFunction,
  defaultSubqueryRenderFunction,
  defaultLoadingRenderFunction,
};
