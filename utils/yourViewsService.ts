export interface ReviewData {
  averageRating: number;
  ratingCount: number;
  reviewCount: number;
}

export interface YourViewsConfig {
  key: string;
}

export async function fetchReviewData(
  productGroupId: string,
  config: YourViewsConfig
): Promise<ReviewData | null> {
  if (!config.key) {
    return null;
  }

  try {
    const options = {
      headers: {
        YVStoreKey: config.key,
      },
    };

    const response = await fetch(
      `https://service.yourviews.com.br/api/v2/pub/review/${productGroupId}?page=1&count=100&orderBy=1`,
      options,
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
  } catch (error) {
    console.error('Failed to fetch review data:', error);
    return null;
  }
}