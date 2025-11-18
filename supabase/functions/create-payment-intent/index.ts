import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { amount, causeId, causeName, donorName, donorEmail } = await req.json();

    console.log('Creating Stripe checkout session for:', { amount, causeId, causeName, donorName, donorEmail });

    // Validation
    if (!amount || amount <= 0) {
      throw new Error('Montant invalide');
    }

    if (!causeName || !donorName || !donorEmail) {
      throw new Error('Informations manquantes');
    }

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    });

    // Get the origin from the request
    const origin = req.headers.get('origin') || 'https://obrtxyhbcyuynctdwhyi.supabase.co';

    // Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'paypal'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: causeName,
              description: `Don pour: ${causeName}`,
            },
            unit_amount: Math.round(amount * 100), // Stripe utilise les centimes
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/confirmation?session_id={CHECKOUT_SESSION_ID}&amount=${amount}&cause=${encodeURIComponent(causeName)}&donor=${encodeURIComponent(donorName)}`,
      cancel_url: `${origin}/causes`,
      customer_email: donorEmail,
      metadata: {
        causeId: causeId.toString(),
        causeName,
        donorName,
        donorEmail,
      },
    });

    console.log('Stripe checkout session created:', session.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        sessionId: session.id,
        url: session.url
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error in create-payment-intent:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: errorMessage
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});