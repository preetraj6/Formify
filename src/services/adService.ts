
interface AdConfig {
  adUnitId: string;
  testMode: boolean;
}

class AdService {
  private config: AdConfig = {
    adUnitId: 'ca-app-pub-3940256099942544/1033173712', // Test ad unit
    testMode: true
  };

  private adWatched = false;

  async initializeAds(): Promise<void> {
    // Initialize Google AdMob or AdSense
    console.log('Initializing ads...');
  }

  async showRewardedAd(): Promise<boolean> {
    return new Promise((resolve) => {
      // Simulate ad watching for demo
      const adModal = document.createElement('div');
      adModal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
      adModal.innerHTML = `
        <div class="bg-white rounded-lg p-6 max-w-sm mx-4 text-center">
          <div class="mb-4">
            <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg class="w-8 h-8 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <h3 class="font-display font-semibold text-lg">Watch Ad to Continue</h3>
            <p class="text-gray-600 text-sm mt-2">Please watch this short ad to unlock premium features</p>
          </div>
          <div class="bg-gray-100 rounded-lg p-4 mb-4">
            <div class="text-2xl font-bold text-center" id="countdown">5</div>
          </div>
          <button id="skip-ad" class="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium opacity-50 cursor-not-allowed" disabled>
            Continue
          </button>
        </div>
      `;

      document.body.appendChild(adModal);

      let countdown = 5;
      const countdownEl = adModal.querySelector('#countdown');
      const skipBtn = adModal.querySelector('#skip-ad') as HTMLButtonElement;

      const interval = setInterval(() => {
        countdown--;
        if (countdownEl) countdownEl.textContent = countdown.toString();
        
        if (countdown <= 0) {
          clearInterval(interval);
          skipBtn.disabled = false;
          skipBtn.className = 'bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity';
          skipBtn.textContent = 'Continue';
        }
      }, 1000);

      skipBtn.addEventListener('click', () => {
        document.body.removeChild(adModal);
        this.adWatched = true;
        resolve(true);
      });
    });
  }

  hasWatchedAd(): boolean {
    return this.adWatched;
  }

  resetAdStatus(): void {
    this.adWatched = false;
  }
}

export const adService = new AdService();
