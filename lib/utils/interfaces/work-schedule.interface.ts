export interface WorkSchedule {
    day: string;
    enabled: boolean;
    slots: TimeSlot[];
    __typename: string;
  }

  export interface TimeSlot {
    startTime: string;
    endTime: string;
    __typename: string;
  }

  