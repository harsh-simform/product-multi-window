// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer } from 'electron';

export type Channels =
  | 'ipc-example'
  | 'open-product-detail-window'
  | 'purchase-product'
  | 'purchase-count-increase';

const electronHandler = {
  ipcRenderer: {
    send(channel: Channels, args: unknown) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (args: unknown) => void) {
      ipcRenderer.on(channel, func);

      return () => {
        ipcRenderer.removeAllListeners(channel);
      };
    },
    once(channel: Channels, func: (args: unknown) => void) {
      ipcRenderer.once(channel, (_event, args) => func(args));
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
