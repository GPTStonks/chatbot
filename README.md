<p align="center">
  <img src="./public/logo.png" alt="Logo">
</p>

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
  <a href="https://www.docker.com/">
    <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker Badge">
  </a>
</p>

# GPTStonks Chatbot

A fully customizable, open-source chatbot solution powered by the latest features of Next.js, TypeScript, and React. Designed for seamless integration with any API, GPTStonks Chatbot stands as a robust platform for developing diverse chatbot applications.

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
npm install gptstonks-chatbot
```

Ensure you have React and @mui/material installed as they are peer dependencies.

## Package Exports

- `useChatbotDefaultTheme`: A hook providing default theme configuration.
- `ChatbotWebsocket`: The main chatbot component.

## Usage

Below is an example of how to integrate the `ChatbotWebsocket` component into a real project:

```jsx
import React from 'react';
import { ChatbotWebsocket, useChatbotDefaultTheme } from 'your-package-name';
import ApiTextParser from './ApiTextParser'; // Your custom component
import MuiTable from './MuiTable'; // Your custom component

function App() {
  return (
    <ChatbotWebsocket
      apiConfig={{
        isWebsocket: true,
        auth: false,
        tokenName: "userToken",
        fetchFunction: "",
        apiQueryEndpoint: "ws://localhost:8000/chatws",
        queryParams: {
          'type': 'type',
          'data': 'result_data',
          'text': 'body',
        },
      }}
      themeConfig={useChatbotDefaultTheme()}
      messageRenderFunction={(text: string) => <ApiTextParser text={text} />}
      dataRenderFunction={(data: any) => <MuiTable data={data} />}
    />
  );
}

export default App;
```

## Configuration

### APIConfig

Configure the API endpoints and authentication for the chatbot:

- `isWebsocket`: Specify whether to use WebSocket for real-time communication.
- `auth`: Enable authentication.
- `tokenName`: The localStorage key name for the authentication token.
- `fetchFunction`: Custom fetch function for API calls (optional).
- `apiQueryEndpoint`: API endpoint URL.
- `queryParams`: Mapping of response object keys to internal keys.

### ThemeConfig

Customize the appearance of your chatbot:

- `style`: CSSProperties for the overall chatbot container.
- `palette`: Define the color scheme.
- `typography`: Customize the font settings.
- `components`: Style individual components like ChatBox, TextField, Button, etc.

## Styling

This package leverages `@mui/material` for UI components and `@fontsource-variable` fonts for typography, allowing for deep customization of the chat interface's look and feel. Use the `themeConfig` prop to tailor the chat UI to match your application's design.

## WebSocket and API Integration

The component intelligently handles both WebSocket and traditional HTTP API communications based on the `apiConfig` provided. Ensure the `apiQueryEndpoint` starts with `ws://` or `wss://` for WebSocket and `http://` or `https://` for HTTP APIs.
