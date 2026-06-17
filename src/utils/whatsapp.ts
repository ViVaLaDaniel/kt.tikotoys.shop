import { WHATSAPP_NUMBER } from '../constants';

export const createWhatsAppLink = (message: string): string => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

export const WHATSAPP_MESSAGES = {
  default:
    'Hello Yulia! I am visiting your website and would love to inquire about your handmade knitted toy chests.',
  smallBox:
    'Hello Yulia! I would like to order the Charming Toy Gift Box (Small, €500).',
  largeBox:
    'Hello Yulia! I would like to order the Royal Toy Gift Box (Large, €1000).',
  contactPage:
    'Hello Yulia! I am reaching out through your contact page.',
} as const;

export const openWhatsApp = (message: string): void => {
  window.open(createWhatsAppLink(message), '_blank');
};
