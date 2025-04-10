export interface Student {
  name: string;
  rollNumber: string;
  class: string;
  division: string;
  allergies: string[];
  photo: string | null;
  rackNumber: string;
  busRoute: string;
}

export interface SavedCard extends Student {
  template: number;
  timestamp: string;
  id: string;
}

export interface FormOptions {
  classes: string[];
  divisions: string[];
  allergies: string[];
  busRoutes: string[];
}
