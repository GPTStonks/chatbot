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
npm install @gptstonks-chatbot
```

Ensure you have React and @mui/material installed as they are peer dependencies.

## Package Exports

- `useChatbotDefaultTheme`: A hook providing default theme configuration. This can be overridden with custom settings.
- `ChatbotWebsocket`: The main chatbot component.

## Usage

Below is an example of how to integrate the `ChatbotWebsocket` component into a real project:

```jsx
import React from 'react';
import { ChatbotWebsocket, useChatbotDefaultTheme } from '@gptstonks/chatbot';
import CustomTextComponent from './CustomTextComponent'; // Your custom text renderer component
import CustomDataTableComponent from './CustomDataTableComponent'; // Your custom data table renderer
import CustomGraphComponent from './CustomGraphComponent'; // Your custom graphical data renderer
import CustomErrorComponent from './CustomErrorComponent'; // Your custom error renderer

function App() {

  return (
    <ChatbotWebsocket
      apiConfig={{
        isWebsocket: true,
        apiQueryEndpoint: "ws://localhost:8000/chatws",
      }}
      themeConfig={{
        style: {},
        palette: {
          primary: { main: '#ff0000' },
          secondary: { main: '#00ff00' },
          // Define other colors as needed
        },
        typography: {
          fontFamily: 'Arial, sans-serif',
        },
        components: {
          ChatBox: { style: { backgroundColor: '#f0f0f0' } },
          // Configure other components as needed
        },
      }}
      messageRenderFunction={CustomTextComponent}
      dataRenderFunction={CustomDataTableComponent}
      graphicalDataRenderFunction={CustomGraphComponent}
      errorRenderFunction={CustomErrorComponent}
      onApiResponseCode={(responseCode) => {
        // Handle API response codes as needed
        console.log(`API responded with code: ${responseCode}`);
      }}
    />
  );
}

export default App;
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
        isWebsocket: true,
        apiQueryEndpoint: "ws://localhost:8000/chatws",
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
- `apiQueryEndpoint`: The endpoint URL for the API or WebSocket connection.
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

- `messageRenderFunction`: Custom renderer for text messages.
- `dataRenderFunction`: Custom renderer for displaying data tables or lists.
- `graphicalDataRenderFunction`: Custom renderer for displaying graphical data, such as charts or graphs.
- `errorRenderFunction`: Custom renderer for displaying error messages.
- `onApiResponseCode`: A callback function for handling API response codes, allowing you to react to specific server responses, such as authentication failures or rate limits.

## Customization

The package utilizes `@mui/material` for UI components and supports extensive customization through the `themeConfig` prop. You can tailor the chat UI to seamlessly integrate with your application's design, ensuring a consistent user experience.

## Real-Time and API Communication

`ChatbotWebsocket` intelligently handles both WebSocket and traditional HTTP API communications, ensuring that your chatbot can interact with users in real-time or through standard request-response cycles, depending on your configuration.

---

Este ejemplo actualizado refleja los cambios en la interfaz `ChatbotProps`, mostrando cómo configurar el componente `ChatbotWebsocket` para un uso efectivo en un proyecto real, incluyendo la personalización del tema y el manejo de diferentes tipos de contenido y errores.
