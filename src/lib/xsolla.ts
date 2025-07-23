export interface XsollaConfig {
  projectId: number;
  sandboxUrl: string;
  accessToken: string;
}

export interface XsollaUser {
  id: string;
  country?: string;
}

export interface XsollaPurchase {
  planId: string;
  amount: number;
  currency: string;
}

export interface XsollaPaymentRequest {
  user: XsollaUser;
  purchase: XsollaPurchase;
  settings?: {
    language?: string;
    theme?: string;
  };
}

const XSOLLA_CONFIG: XsollaConfig = {
  projectId: 286930,
  sandboxUrl: 'https://sandbox-secure.xsolla.com/paystation2/',
  accessToken: 'gauckJuWleHPThgMwCLCLVOVd9J738AM_lc_en_bg_FFFFFF_tb_3D46F5'
};

class XsollaService {
  private config: XsollaConfig;

  constructor(config: XsollaConfig) {
    this.config = config;
  }

  async createPaymentSession(request: XsollaPaymentRequest): Promise<{ paymentUrl: string }> {
    try {
      console.log('Creating Xsolla payment session with request:', request);
      
      // Construct the payment URL with the access token
      const paymentUrl = `${this.config.sandboxUrl}?access_token=${this.config.accessToken}`;
      
      console.log('Generated payment URL:', paymentUrl);
      
      return { paymentUrl };
    } catch (error) {
      console.error('Error creating Xsolla payment session:', error);
      throw new Error('Failed to create payment session');
    }
  }

  openPaymentWindow(paymentUrl: string): Window | null {
    try {
      console.log('Attempting to open payment window with URL:', paymentUrl);
      
      // Calculate center position
      const width = 800;
      const height = 600;
      const left = Math.max(0, (window.screen.width - width) / 2);
      const top = Math.max(0, (window.screen.height - height) / 2);
      
      const windowFeatures = [
        `width=${width}`,
        `height=${height}`,
        `left=${left}`,
        `top=${top}`,
        'resizable=yes',
        'scrollbars=yes',
        'status=yes',
        'toolbar=no',
        'menubar=no',
        'location=no'
      ].join(',');
      
      console.log('Opening window with features:', windowFeatures);
      
      const paymentWindow = window.open(
        paymentUrl,
        'XsollaPayment',
        windowFeatures
      );
      
      if (!paymentWindow) {
        console.error('Failed to open payment window - likely blocked by popup blocker');
        return null;
      }
      
      // Focus the payment window
      paymentWindow.focus();
      
      console.log('Payment window opened successfully');
      return paymentWindow;
    } catch (error) {
      console.error('Error opening payment window:', error);
      return null;
    }
  }

  // Helper method to check if popups are blocked
  isPopupBlocked(): boolean {
    try {
      const testWindow = window.open('', 'test', 'width=1,height=1');
      if (testWindow) {
        testWindow.close();
        return false;
      }
      return true;
    } catch (error) {
      return true;
    }
  }
}

export const xsollaService = new XsollaService(XSOLLA_CONFIG);

// Plan configurations matching your Xsolla setup
export const xsollaPlans = {
  monthly: {
    planId: 'gOw8NQR7',
    name: 'Monthly Plan',
    amount: 4.99,
    currency: 'USD',
    description: 'All 44 educational games, Detailed progress reports, Offline game access, Priority customer support'
  }
};