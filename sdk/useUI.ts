/**
 * This file takes care of global app side effects,
 * like clicking on add to cart and the cart modal being displayed
 */

import { signal } from "@preact/signals";

const displayCart = signal(false);
const displayMenu = signal(false);
const displaySearchbar = signal(false);
const displayBuyWarning = signal(false);
const displayTopBar = signal(true);
const searchResultCols = signal({ mobile: 1, desktop: 2 });
const vtexIdScriptsLoaded = signal(false);

const state = {
  displayCart,
  displayMenu,
  displaySearchbar,
  displayBuyWarning,
  displayTopBar,
  searchResultCols,
  vtexIdScriptsLoaded,
};

export const useUI = () => state;
