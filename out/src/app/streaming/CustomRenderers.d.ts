import React from 'react';
declare const WelcomeMessageRender: (sendCustomMessage: (message: string) => void) => React.JSX.Element;
declare const BotMessageRender: (message: any, input?: string) => React.JSX.Element;
declare const UserMessageRender: (text: string) => React.JSX.Element;
declare const SubqueryRender: (subqueryQuestion: string[], subqueryResponse: string[]) => React.JSX.Element;
declare const ProviderRender: (providers: string[]) => React.JSX.Element;
declare const ErrorRenderFunction: (error: any) => React.JSX.Element;
declare const LoadingMessageRender: (text: string, themeConfig: any, subquery_arrays: any, type?: number) => React.JSX.Element;
export { WelcomeMessageRender, BotMessageRender, UserMessageRender, SubqueryRender, ProviderRender, ErrorRenderFunction, LoadingMessageRender, };
