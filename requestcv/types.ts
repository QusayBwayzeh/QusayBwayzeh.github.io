
export interface CVRequestData {
  name: string;
  justification: string;
  mobileNumber: string;
}

export interface CVRequest extends CVRequestData {
  id: number;
  createdAt: string;
}