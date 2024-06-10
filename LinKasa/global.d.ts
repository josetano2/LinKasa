import { Timestamp } from "firebase/firestore";
export {};

declare global {
  interface Account extends Staff {
    email: string;
    password: string;
  }

  interface Staff {
    name: string;
    role: string;
  }

  interface Feedback {
    title: string;
    content: string;
  }

  interface BroadcastMessage {
    id: string;
    text: string;
    sentAt: firebase.firestore.Timestamp;
    user: string;
    staffName?: string;
    staffRole?: string;
  }

  // flight
  interface Airplane {
    tailNumber: string;
    airline: string;
    model: string;
    status:
      | "Available"
      | "Maintenance"
      | "Maintenance Check"
      | "On Schedule"
      | "Refueling";
    capacity: number;
    refuelingSchedule?: Timestamp;
  }

  interface ScheduledFlights {
    airplaneTailNumber: string;
    flightNumber: string;
    gate: string;
    terminal: string;
    flightStatus:
      | "On Time"
      | "Delayed"
      | "Cancelled"
      | "In Transit"
      | "Arrived";
    departureTime: Timestamp;
    arrivalTime: Timestamp;
    origin: string;
    destination: string;
    seats: Seat[];
    pilot: string;
    crews: string[];
  }
  interface Passenger {
    name: string;
    passportNumber: string;
    age: int;
    dob: Timestamp;
  }

  interface BoardingPass {
    boardingPassID: string;
    passenger: Passenger;
    scheduledFlight: ScheduledFlights;
    seatNumber: string;
  }

  interface Seat {
    seatNumber: string;
    boardingPass?: BoardingPass;
    seatStatus: "Available" | "Not Available";
  }

  interface LostAndFoundItem {
    itemName: string;
    image: string;
    description: string;
    status: "Returned to Owner" | "Unclaimed";
  }

  interface WeatherData {
    name?: string;
    main?: {
      temp?: number;
      feels_like?: number;
      humidity?: number;
    };
    weather?: [
      {
        main?: string;
        description?: string;
      }
    ];
    wind?: {
      speed?: number;
    };
    sys?: {
      country?: string;
    };
  }

  interface Facility {
    name: string;
    description: string;
    status: "Available" | "Not Available" | "Maintenance" | "Maintenance Check";
    maintenanceSchedule?: Timestamp;
    maintenanceCheckSchedule?: Timestamp;
  }

  interface SecurityIncident {
    title: string;
    description: string;
  }

  interface EmployeeTraining {
    title: string;
    description: string;
  }

  interface FlightCrew {
    id?: string;
    name: string;
    role: "Cabin Crew" | "Pilot";
    status: "Active" | "On Leave" | "Retired";
    airline: string;
  }
}
