declare global {
    interface Window {
      Telegram: {
        WebApp: {
          BackButton: any;
          ready: () => void;
          close: () => void;
          initData: string;
          initDataUnsafe: {
            user?: {
              id: number;
              first_name: string;
              last_name?: string;
              username?: string;
              language_code?: string;
            };
          };
          themeParams: Record<string, string>;
          MainButton: {
            text: string;
            color?: string;
            textColor?: string;
            isVisible: boolean;
            setText: (text: string) => void;
            show: () => void;
            hide: () => void;
            enable: () => void;
            disable: () => void;
            onClick: (callback: () => void) => void;
          };
        };
      };
    }
  }
  
  export {};
  