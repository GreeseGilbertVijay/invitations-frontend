export type TemplateId = "classic" | "modern" | "floral";

export interface WeddingInvite {
  _id?: string;
  groomName: string;
  brideName: string;
  weddingDate: string;
  weddingTime?: string;
  venue: string;
  venueAddress?: string;
  receptionDate?: string;
  receptionTime?: string;
  contactName?: string;
  contactPhone?: string;
  message?: string;
  template: TemplateId;
  slug: string;
  createdBy?: string;
  createdAt?: string;
}
