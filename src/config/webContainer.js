import { WebContainer } from "web-container";

let webContainerInstance = null;

export const getWebContainer = () => {
  if (!webContainerInstance) {
    webContainerInstance = new WebContainer();
  }

  return webContainerInstance;
};
