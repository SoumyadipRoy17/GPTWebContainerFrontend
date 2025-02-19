// import { WebContainer } from "@webcontainer/api";

// let webContainerInstance = null;

// export const getWebContainer = async () => {
//   if (!webContainerInstance) {
//     webContainerInstance = await WebContainer.boot();
//   }

//   return webContainerInstance;
// };

import { WebContainer } from "@webcontainer/api";

let webContainerInstance = null;

export const getWebContainer = async () => {
  if (!webContainerInstance) {
    console.log("⚡ Booting WebContainer...");
    webContainerInstance = await WebContainer.boot();
  } else {
    console.log("✅ WebContainer already initialized");
  }
  return webContainerInstance;
};
