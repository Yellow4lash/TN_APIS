export interface XsollaConfig {
  projectId: number;
  sandboxUrl: string;
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
  sandboxUrl: 'https://sandbox-secure.xsolla.com/paystation2/'
};

class XsollaService {
  private config: XsollaConfig;

  constructor(config: XsollaConfig) {
    this.config = config;
  }

  async createPaymentSession(request: XsollaPaymentRequest): Promise<{ paymentUrl: string }> {
    try {
      // In a real implementation, this would call your backend API
      // which would then communicate with Xsolla's API to get an access token
      
      // For now, we'll construct the payment URL directly using the sandbox setup
      const paymentData = {
        user: {
          country: { value: request.user.country || "US" },
          id: { 
            value: request.user.id, 
            allow_modify: false, 
            hidden: true 
          }
        },
        settings: {
          language: request.settings?.language || "en",
          project_id: this.config.projectId
        },
        purchase: {
          checkout: {
            amount: request.purchase.amount,
            currency: request.purchase.currency
          },
          subscription: {
            plan_id: request.purchase.planId
          }
        }
      };

      // In production, you would get this access_token from your backend
      // For sandbox testing, we'll use a placeholder
      const accessToken = "gauckJuWleHPThgMwCLCLVOVd9J738AM_lc_en_bg_FFFFFF_tb_3D46F5";
      
      const paymentUrl = `${this.config.sandboxUrl}?access_token=${accessToken}`;
      
      console.log('Xsolla Payment Data:', paymentData);
      console.log('Payment URL:', paymentUrl);
      
      return { paymentUrl };
    } catch (error) {
      console.error('Error creating Xsolla payment session:', error);
      throw new Error('Failed to create payment session');
    }
  }

  async getAccessToken(paymentRequest: XsollaPaymentRequest): Promise<string> {
    // This should be implemented on your backend
    // It would call Xsolla's API to get an access token
    // For sandbox testing, we return the provided token
    return "gauckJuWleHPThgMwCLCLVOVd9J738AM_lc_en_bg_FFFFFF_tb_3D46F5";
  }

  openPaymentWindow(paymentUrl: string): Window | null {
    const width = 800;
    const height = 600;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    
    const paymentWindow = window.open(
      paymentUrl,
      'XsollaPayment',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );
    
    return paymentWindow;
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