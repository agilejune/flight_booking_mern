"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookTypes = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.bookTypes = (0, apollo_server_express_1.gql) `
  scalar Date

  type Query {
    success: String!
  }

  type Mutation {
    success: String!
  }

  type CustomerData {
    id: Int
    first_name: String
    last_name: String
    email: String
    phone_number: String
    birthday: String
  }

  type CustomersResponse {
    message: String!
    isSuccess: Boolean!
    status: Int!
    data: [CustomerData]
  }

  type Query {
    customers: CustomersResponse
  }

  input CustomerInput {
    first_name: String,
    last_name: String,
    email: String,
    phone_number: String,
    birthday: String
  }

  type CreateCustomerResponse {
    message: String!
    isSuccess: Boolean!
    status: Int!
    data: CustomerData
  }

  type Mutation {
    createCustomer(input: CustomerInput): CreateCustomerResponse
  }

  input BookedSeatInput {
    schedule_id: Int,
    seat_id: Int,
  }

  type SeatNumberData {
    seat_number: String
  }

  type BookedSeatsResponse {
    message: String!
    isSuccess: Boolean!
    status: Int!
    data: [SeatNumberData]
  }

  type Query {
    getBookedSeats(input: BookedSeatInput): BookedSeatsResponse
  }

  input CurrentSeatPriceInput {
    schedule_id: Int
    seat_id: Int
  }

  type CurrentSeatPriceResponse {
    message: String!
    isSuccess: Boolean!
    status: Int!
    data: Int
  }

  type Query {
    currentSeatPrice(input: CurrentSeatPriceInput): CurrentSeatPriceResponse
  }

  input CustomerBookedSeatsInput {
    seat_id: Int
    schedule_id: Int
    customer_id: Int
  }

  type CustomerBookedSeat {
    seat_number: String
  }

  type CustomerBookedSeatResponse {
    message: String!
    isSuccess: Boolean!
    status: Int!
    data: [CustomerBookedSeat]
  }

  type Query {
    customerBookedSeats(input: CustomerBookedSeatsInput): CustomerBookedSeatResponse
  }

  input SeatMapInput {
    seat_id: Int
    schedule_id: Int
  }

  type SeatMapData {
    seat_map: String
    booked_seats: SeatNumberData
  }

  type SeatMapResponse {
    message: String!
    isSuccess: Boolean!
    status: Int!
    data: [SeatMapData]
  }

  type Query {
    seatMap(input: SeatMapInput): SeatMapResponse
  }

  input SeatData {
    seat_id: Int
    seat_number: String
    price: Float
  }

  input BookInput {
    outgo_schedule_id: Int
    return_schedule_id: Int
    customer_id: Int
    user_id: Int
    agent_id: Int
    outgo_seats: [SeatData]
    return_seats: [SeatData]
    payment_type: String
  }

  type BookResponse {
    message: String!
    isSuccess: Boolean!
    status: Int!
  }

  type Mutation {
    book(input: BookInput): BookResponse
  }

  input PaginationInput {
    current: Int
    pageSize: Int
    total: Int
  }

  type PaginationData {
    current: Int
    pageSize: Int
    total: Int
  }

  type PriceRulesBySeat {
    seat_type: String
    id: Int
    greater_than: Int
    less_equal_than: Int
    status: String
    percentage: Int
  }

  type PriceRulesBySeatReaponseData {
    pagination: PaginationData
    price_rules_by_seat: [PriceRulesBySeat]
  }

  type PriceRulesBySeatResponse {
    message: String!
    isSuccess: Boolean!
    status: Int!
    data: PriceRulesBySeatReaponseData
  }

  type Query {
    listPriceRulesBySeat(input: PaginationInput): PriceRulesBySeatResponse
  }

  input UpdatePriceRuleBySeatInput {
    id: Int!
    value: Boolean!
  }

  type UpdatePriceRuleBySeatResponse {
    message: String!
    isSuccess: Boolean!
    status: Int!
  }

  type Mutation {
    updatePriceRuleBySeat(input: UpdatePriceRuleBySeatInput): UpdatePriceRuleBySeatResponse
  }

  type PriceRulesByDate {
    id: Int
    greater_than: Int
    less_equal_than: Int
    status: String
    percentage: Int
  }

  type PriceRulesByDateReaponseData {
    pagination: PaginationData
    price_rules_by_date: [PriceRulesByDate]
  }

  type PriceRulesByDateResponse {
    message: String!
    isSuccess: Boolean!
    status: Int!
    data: PriceRulesByDateReaponseData
  }

  type Query {
    listPriceRulesByDate(input: PaginationInput): PriceRulesByDateResponse
  }

  input UpdatePriceRuleByDateInput {
    id: Int!
    value: Boolean!
  }

  type UpdatePriceRuleByDateResponse {
    message: String!
    isSuccess: Boolean!
    status: Int!
  }

  type Mutation {
    updatePriceRuleByDate(input: UpdatePriceRuleByDateInput): UpdatePriceRuleByDateResponse
  }

  type BooklistData {
    id: Int
    code: String
    outgo_schedule_id: Int
    return_schedule_id: Int
    agent_id: Int
    user_id: Int
    customer_id: Int
    status: String
    payment_type: String
    payment_status: String
    total_cost: Float
    createdAt: Date
    customer: CustomerData
    user: User
    agent: User
    outgo_schedule: ScheduleData
    return_schedule: ScheduleData
  }

  type BooklistsReaponseData {
    pagination: PaginationData
    booklists: [BooklistData]
  }

  type BooklistsResponse {
    message: String!
    isSuccess: Boolean!
    status: Int!
    data: BooklistsReaponseData
  }

  type Query {
    booklists(input: PaginationInput): BooklistsResponse
  }

  input AddApproveListInput {
    outgo_schedule_id: Int
    return_schedule_id: Int
    customer_id: Int
    agent_id: Int
    outgo_seats: [SeatData]
    return_seats: [SeatData]
  }

  type AddApproveListResponse {
    message: String!
    isSuccess: Boolean!
    status: Int!
  }

  type Mutation {
    addApproveList(input: AddApproveListInput): AddApproveListResponse
  }

  type ApprovelistData {
    id: Int
    outgo_schedule_id: Int
    return_schedule_id: Int
    agent_id: Int
    customer_id: Int
    status: String
    total_cost: Float
    createdAt: Date
    customer: CustomerData
    agent: User
    outgo_schedule: ScheduleData
    return_schedule: ScheduleData
  }

  type ApprovelistsReaponseData {
    pagination: PaginationData
    approvelists: [ApprovelistData]
  }

  type ApprovelistsResponse {
    message: String!
    isSuccess: Boolean!
    status: Int!
    data: ApprovelistsReaponseData
  }

  type Query {
    approvelists(input: PaginationInput): ApprovelistsResponse
  }

  type AuthorizationUrlData {
    authorization_url: String
    access_code: String
    reference: String
  }

  input InvokePaymentInput {
    email: String
    amount: Int
    name: String
  }

  type InvokePaymentResponse {
    status: Boolean!
    message: String!
    data: AuthorizationUrlData
  }

  type Mutation {
    invokePayment(input: InvokePaymentInput): InvokePaymentResponse
  }
`;
