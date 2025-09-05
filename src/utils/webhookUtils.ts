
// Webhook configuration
const WEBHOOK_URL = 'https://agents.truelytics.solutions/webhook/bc7a79c4-29d9-411c-94e5-cb0406154c8a';

// TypeScript interfaces
export interface WaitlistSubmission {
  email: string;
  source?: string;
  timestamp?: string;
}

export interface WebhookResponse {
  success: boolean;
  message?: string;
  error?: string;
}

// Utility function to submit to n8n webhook
export const submitToWaitlist = async (data: WaitlistSubmission): Promise<WebhookResponse> => {
  console.log('🚀 Submitting to n8n webhook:', data);
  
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
        source: data.source || 'agentcamp-landing',
      }),
    });

    console.log('📡 Webhook response status:', response.status);

    // n8n webhooks typically return plain text or simple JSON
    if (response.ok) {
      console.log('✅ Webhook submission successful');
      return { success: true, message: 'Successfully added to waitlist' };
    } else {
      console.error('❌ Webhook response not ok:', response.status);
      return { success: false, error: `Server responded with status ${response.status}` };
    }
  } catch (error) {
    console.error('❌ Error submitting to webhook:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to submit to waitlist' 
    };
  }
};
