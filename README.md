# 📦 GPTStonks Chatbot 🚀

<div align="center">

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<p align="center">

  <a href="https://nextjs.org/">
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js Badge">
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript Badge">
  <a href="https://reactjs.org/">
    <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React Badge">
  </a>
  <a href="https://mui.com/">
    <img src="https://img.shields.io/badge/Material--UI-007FFF?style=for-the-badge&logo=mui&logoColor=white" alt="Material-UI Badge">
  </a>
</p>

</div>

---
## What is GPTStonks Chatbot?

`GPTStonks Chatbot` is a versatile and customizable chatbot solution designed to enhance user interactions with AI in web applications and other platforms. Built with React and TypeScript, the chatbot offers a range of features, including WebSocket support for real-time messaging and streaming, full styling customization, and API REST integration. Developers can easily integrate the chatbot into their applications, tailoring its appearance and functionality to meet specific requirements. The chatbot is designed to be extensible, allowing for custom renderers and data handling functions to be implemented as needed.

## Status

### Work in Progress

The `GPTStonks Chatbot` is currently under active development. We are working tirelessly to enhance its capabilities, aiming to include a wide range of features that will cater to various use cases and applications. Our goal is to make `GPTStonks Chatbot` the go-to solution for developers looking for a highly customizable, efficient, and easy-to-integrate chatbot.

### Upcoming Features

- **Improved AI Integration**: Plans are in place to integrate more advanced AI and natural language processing (NLP) capabilities, allowing for more sophisticated and nuanced conversations with users.
- **Enhanced Customization Options**: We are expanding the customization options available to developers, making it easier to tailor the chatbot's appearance and functionality to fit the specific needs of any application.
- **Increased Accessibility Features**: Accessibility is a priority, and upcoming releases will focus on making `GPTStonks Chatbot` more accessible to users with disabilities, ensuring a broader range of individuals can interact with the chatbot seamlessly.
- **Seamless Integration with External Services**: We are working on integrations with popular external services and platforms, enabling developers to leverage the full potential of the chatbot in their applications.
- **More Comprehensive Documentation**: As new features are added, our documentation will grow to include detailed guides, tutorials, and examples to help developers make the most of the `GPTStonks Chatbot`.

### Real Examples
We are currently using this package in a production environment in [GPTStonks](https://gptstonks.net/), our AI financial assistant. The chatbot is an integral part of the user experience, allowing users to interact with the AI and receive personalized insights and recommendations.

---

# ChatbotWebsocket Package

The `ChatbotWebsocket` package provides a powerful and customizable chatbot UI component for React applications, featuring WebSocket support for real-time messaging and full styling capabilities to match your app's look and feel.

## Features

- **WebSocket Support**: Seamlessly integrate real-time messaging into your application using WebSocket.
- **Full Styling Customization**: Customize every part of the chat interface with detailed theme configuration.
- **API Integration**: Easy setup for both WebSocket and traditional HTTP API endpoints.
- **Extensible Rendering**: Customize how messages and data are rendered within the chat interface.

## Installation

```bash
npm install @gptstonks-chatbot
```

Ensure you have React and @mui/material installed as they are peer dependencies.

## Package Exports

- `useChatbotDefaultTheme`: A hook providing default theme configuration. This can be overridden with custom settings.
- `ChatbotWebsocket`: The main chatbot component.

## Usage

Below is an example of how to integrate the `ChatbotHttp` component into a real project:

```jsx
import useChatbotDefaultTheme from '@/components/chat/ChatbotDefaultTheme';
import ChatbotWebsocket from '@/layouts/ChatbotWebsocket';
import React from 'react';

export default function Home() {
  const [initializedChat, setInitializedChat] = React.useState(false);
  const [chatData, setChatData] = React.useState<any>(null);

  const themeConfig = useChatbotDefaultTheme;

  return (
    <main
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#080808',
      }}
    >
      <div style={{ width: '20vw', height: '100%' }}></div>
      <div style={{ width: '60vw', height: '100%' }}>
        <ChatbotWebsocket
          apiConfig={{
            auth: false,
            tokenName: 'userToken',
            fetchFunction: '',
            queryEndpoint: 'ws://localhost:5000/chatws',
            queryParams: {
              type: 'type',
              data: 'result_data',
              text: 'body',
              reference: 'reference',
              related: 'related',
            },
          }}
          themeConfig={themeConfig}
          setDataForParent={(data: any) => {
            setChatData(data);
          }}
          onApiResponseCode={(bool: boolean) => {
            setInitializedChat(bool);
          }}
          userMessageRenderFunction={(text: string) => (
            <YourCustomComponent>{text}</YourCustomComponent>
          )}
          botMessageRenderFunction={(text: string) => (
            <YourCustomComponent>{text}</YourCustomComponent>
          )}
          dataRenderFunction={(data: any) => <YourCustomComponent>{data}</YourCustomComponent>}
          graphicalDataRenderFunction={(data: any) => (
            <YourCustomComponent>{data}</YourCustomComponent>
          )}
          errorRenderFunction={(error: string) => <YourCustomComponent>{error}</YourCustomComponent>}
        />
      </div>
      <div style={{ width: '20vw', height: '100%' }}></div>
    </main>
  );
}
```

In this example, the `ChatbotWebsocket` component is configured with WebSocket support and a custom API endpoint. The theme is customized with specific colors, typography, and component styles. Custom renderers are provided for text messages, data tables, graphical data, and error messages. An `onApiResponseCode` callback function is included to handle API response codes.

**Using default theme configuration:** If you want to use the default theme configuration provided by the package, you can use the `useChatbotDefaultTheme` hook and override specific settings as needed:

```jsx
import React from 'react';
import { ChatbotWebsocket, useChatbotDefaultTheme } from '@gptstonks/chatbot';

function App() {
  const themeConfig = useChatbotDefaultTheme();
  themeConfig.palette.primary.main = '#ff0000'; // Override primary color and other settings as needed

  return (
    <ChatbotWebsocket
      apiConfig={{
        queryEndpoint: "ws://localhost:8000/chatws",
      }}
      themeConfig={themeConfig}
    />
  );
}
```
## Configuration

### APIConfig

Customize the chatbot's API endpoints and authentication settings:

- `isWebsocket`: Determines whether to use WebSocket for real-time communication.
- `queryEndpoint`: The endpoint URL for the API or WebSocket connection.
- `auth` (optional): Enables authentication.
- `tokenName` (optional): The key name for the authentication token in localStorage.
- `fetchFunction` (optional): A custom fetch function for API calls.
- `queryParams` (optional): Maps response object keys to internal keys for processing.

### ThemeConfig

Adjust the chatbot's appearance:

- `style`: General CSSProperties for the chatbot's container.
- `palette`: Defines the color scheme, including primary, secondary, and other states like error, warning, info, and success.
- `typography`: Configures font settings.
- `components`: Allows styling of individual components such as the chat box, text field, button, etc.

### Handling Data and Errors

- `botMessageRenderFunction`: Custom renderer for text messages.
- `dataRenderFunction`: Custom renderer for displaying data tables or lists.
- `graphicalDataRenderFunction`: Custom renderer for displaying graphical data, such as charts or graphs.
- `errorRenderFunction`: Custom renderer for displaying error messages.
- `onApiResponseCode`: A callback function for handling API response codes, allowing you to react to specific server responses, such as authentication failures or rate limits.

## Customization

The package utilizes `@mui/material` for UI components and supports extensive customization through the `themeConfig` prop. You can tailor the chat UI to seamlessly integrate with your application's design, ensuring a consistent user experience.

## Real-Time and API Communication

`ChatbotWebsocket` intelligently handles both WebSocket and traditional HTTP API communications, ensuring that your chatbot can interact with users in real-time or through standard request-response cycles, depending on your configuration.

## 🛠️ Stack

- [![Typescript][typescript-badge]][typescript-url] - JavaScript with syntax for types.
- [![Tailwind CSS][tailwind-badge]][tailwind-url] - A utility-first CSS framework for rapidly building custom designs.

## External dependencies
- `@mui/material`: Material-UI components for building the chatbot UI (https://mui.com/).
- `react`: Core library for building React applications.
- `useWebSocket`: A custom hook for managing WebSocket connections in React applications (https://www.npmjs.com/package/use-websocket). Will try to implement a workaround for this dependency in the future so that it is not required.


[contributors-shield]: https://img.shields.io/github/contributors/GPTStonks/chatbot.svg?style=for-the-badge
[contributors-url]: https://github.com/GPTStonks/chatbot/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/GPTStonks/chatbot.svg?style=for-the-badge
[forks-url]: https://github.com/GPTStonks/chatbot/network/members
[stars-shield]: https://img.shields.io/github/stars/GPTStonks/chatbot.svg?style=for-the-badge
[stars-url]: https://github.com/GPTStonks/chatbot/stargazers
[issues-shield]: https://img.shields.io/github/issues/GPTStonks/chatbot.svg?style=for-the-badge
[issues-url]: https://github.com/GPTStonks/chatbot/issues
