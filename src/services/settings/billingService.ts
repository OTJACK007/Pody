import { supabase } from '../../lib/supabase';
import { BillingSettings } from '../../types/settings';

export const getBillingSettings = async (userId: string): Promise<BillingSettings | null> => {
  try {
    const { data, error } = await supabase
      .from('user_settings')
      .select('billing')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data?.billing;
  } catch (error) {
    console.error('Error fetching billing settings:', error);
    return null;
  }
};

export const updateBillingSettings = async (userId: string, settings: BillingSettings): Promise<void> => {
  try {
    const { error } = await supabase
      .from('user_settings')
      .update({
        billing: settings,
        updated_at: new Date()
      })
      .eq('user_id', userId);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating billing settings:', error);
    throw error;
  }
};

export const addPaymentMethod = async (userId: string, paymentMethod: any): Promise<void> => {
  try {
    const { data: currentSettings, error: fetchError } = await supabase
      .from('user_settings')
      .select('billing')
      .eq('user_id', userId)
      .single();

    if (fetchError) throw fetchError;

    const updatedBilling = {
      ...currentSettings.billing,
      paymentMethods: [...currentSettings.billing.paymentMethods, paymentMethod]
    };

    const { error: updateError } = await supabase
      .from('user_settings')
      .update({
        billing: updatedBilling,
        updated_at: new Date()
      })
      .eq('user_id', userId);

    if (updateError) throw updateError;
  } catch (error) {
    console.error('Error adding payment method:', error);
    throw error;
  }
};

export const removePaymentMethod = async (userId: string, paymentMethodId: string): Promise<void> => {
  try {
    const { data: currentSettings, error: fetchError } = await supabase
      .from('user_settings')
      .select('billing')
      .eq('user_id', userId)
      .single();

    if (fetchError) throw fetchError;

    const updatedBilling = {
      ...currentSettings.billing,
      paymentMethods: currentSettings.billing.paymentMethods.filter(
        (pm: any) => pm.id !== paymentMethodId
      )
    };

    const { error: updateError } = await supabase
      .from('user_settings')
      .update({
        billing: updatedBilling,
        updated_at: new Date()
      })
      .eq('user_id', userId);

    if (updateError) throw updateError;
  } catch (error) {
    console.error('Error removing payment method:', error);
    throw error;
  }
};