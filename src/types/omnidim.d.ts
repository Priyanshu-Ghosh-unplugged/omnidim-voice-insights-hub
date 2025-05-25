
declare global {
  interface Window {
    omnidim?: {
      onConversation?: (callback: (data: {
        userInput: string;
        botResponse: string;
        price?: number;
      }) => void) => void;
      [key: string]: any;
    };
  }
}

export {};
