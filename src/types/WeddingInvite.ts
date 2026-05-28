export type TemplateId = "classic" | "modern" | "floral" | "birthday1" | "birthday2" | "babyshower1" | "babyshower2";
export type InviteCategory = "wedding" | "birthday" | "babyshower";

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
  groomImage?: string;
  brideImage?: string;
  gallery?: string[];
  video?: string;
  audio?: string;
  createdBy?: string;
  createdAt?: string;
}
