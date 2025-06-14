
import { useState } from 'react';
import { adService } from '@/services/adService';

export const useAdGatedAction = () => {
  const [isLoading, setIsLoading] = useState(false);

  const executeWithAd = async (action: () => void | Promise<void>): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const adWatched = await adService.showRewardedAd();
      
      if (adWatched) {
        await action();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Ad or action failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { executeWithAd, isLoading };
};
