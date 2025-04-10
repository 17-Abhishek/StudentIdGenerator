export interface StudentData {
  id: string;
  name: string;
  rollNumber: string;
  class: string;
  division: string;
  allergies: string[];
  photo: string | null;
  rackNumber: string;
  busRoute: string;
  template: string;
  createdAt: string;
}

export interface StudentFormData {
  name: string;
  rollNumber: string;
  class: string;
  division: string;
  allergies: string[];
  photo: string | null;
  rackNumber: string;
  busRoute: string;
}

export type CardTemplateType = '1' | '2';
