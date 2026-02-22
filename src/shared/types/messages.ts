export type MessageCategory = 'claims' | 'prior-auth' | 'eligibility' | 'general' | 'billing' | 'technical';
export type MessageStatus = 'unread' | 'read' | 'replied' | 'archived';

export interface Message {
  id: string;
  subject: string;
  body: string;
  from: string;
  to: string;
  date: string;
  category: MessageCategory;
  status: MessageStatus;
  isInbound: boolean;
  attachments?: MessageAttachment[];
  relatedRef?: string;
}

export interface MessageAttachment {
  id: string;
  name: string;
  size: string;
  type: string;
}
