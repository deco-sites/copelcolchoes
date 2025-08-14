export interface ReviewData {
  averageRating: number;
  ratingCount: number;
  reviewCount: number;
}

export interface YourViewsConfig {
  /** @title Chave de API */
  key: string;
}

export async function fetchReviewData(
  productGroupId: string,
  config: YourViewsConfig,
): Promise<ReviewData | null> {
  if (!config.key) {
    return null;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);
  try {
    const options = {
      headers: {
        YVStoreKey: config.key,
      },
    };
    const response = await fetch(
      `https://service.yourviews.com.br/api/v2/pub/review/${productGroupId}?page=1&count=100&orderBy=1`,
      { ...options, signal: controller.signal },
    );

    if (!response.ok) {
      return null;
    }

    const reviewsData = await response.json();
    const { Element } = reviewsData;

    if (!Element || !Element.Reviews || Element.Reviews.length === 0) {
      return null;
    }

    return {
      averageRating: Element.Rating || 0,
      ratingCount: Element.TotalRatings || 0,
      reviewCount: Element.Reviews ? Element.Reviews.length : 0,
    };
  } catch (_error) {
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}
