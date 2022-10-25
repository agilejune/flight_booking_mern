"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleTypes = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.scheduleTypes = (0, apollo_server_express_1.gql) `
  scalar Date

  type Query {
    success: String!
  }

  type Mutation {
    success: String!
  }

  type AirportData {
    id: Int
    city: String
    name: String
    address: String
  }

  type AirportsResponseData {
    pagination: PaginationData
    airports: [AirportData!]
  }

  type AirportsResponse {
    message: String
    isSuccess: Boolean
    status: Int
    data: AirportsResponseData
  }

  type Query {
    airports(input: PaginationInput): AirportsResponse
  }

  type Seat {
    id: Int
    seat_type: String
    seatmap: String
  }
  type AircraftData {
    id: Int
    name: String
    seats: [Seat]
  }

  type AircraftsResponse {
    message: String
    isSuccess: Boolean
    status: Int
    data: [AircraftData]
  }

  type Query {
    aircrafts: AircraftsResponse
  }

  input ScheduleSeatPrice {
    seat_id: Int
    price: Float
  }

  input CreateScheduleInput {
    depart_airport_id: Int
    arrive_airport_id: Int
    aircraft_id: Int
    depart_time: Date
    arrive_time: Date
    seatsPrice: [ScheduleSeatPrice]
  }
  
  type CreateScheduleResponse {
    message: String!
    isSuccess: Boolean!
    status: Int!
  }

  type ScheduleData {
    id: Int
    depart_airport_id: Int
    arrive_airport_id: Int
    aircraft_id: Int
    depart_airport: AirportData
    arrive_airport: AirportData
    aircraft: AircraftData
    depart_time: Date
    arrive_time: Date
  }

  type SchedulesResponseData {
    pagination: PaginationData
    schedules: [ScheduleData!]
  }

  type ScheduleResponse {
    message: String!
    isSuccess: Boolean!
    status: Int!
    data: SchedulesResponseData
  }

  type Query {
    schedules(input: PaginationInput): ScheduleResponse
  }

  type Mutation {
    createSchedule(input: CreateScheduleInput): CreateScheduleResponse
  }
`;
