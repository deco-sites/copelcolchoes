/**
 * This file takes care of global app side effects,
 * like clicking on add to cart and the cart modal being displayed
 */

import { signal } from "@preact/signals";

const loadingReviews = signal(false);
const reviews = signal(0);
const totalReview = signal(0);

const state = {
  loadingReviews,
  reviews,
  totalReview,
};

export const useQuickReview = () => state;
