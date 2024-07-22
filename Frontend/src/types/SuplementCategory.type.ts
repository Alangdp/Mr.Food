export interface SuplementCategory {
  createdAt: string;
  updatedAt: string;
  id: number;
  name: string;
  companyId: number;
  type?: string;
  active?: boolean;
}
