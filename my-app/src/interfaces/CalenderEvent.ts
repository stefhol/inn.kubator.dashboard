

export interface CalenderEventValue {
    "@odata.etag": string;
    id: string;
    createdDateTime: string;
    lastModifiedDateTime: string;
    changeKey: string;
    categories: any[];
    transactionId: null;
    originalStartTimeZone: OriginalEndTimeZoneEnum;
    originalEndTimeZone: OriginalEndTimeZoneEnum;
    iCalUId: string;
    reminderMinutesBeforeStart: number;
    isReminderOn: boolean;
    hasAttachments: boolean;
    subject: string;
    bodyPreview: string;
    importance: Importance;
    sensitivity: Importance;
    isAllDay: boolean;
    isCancelled: boolean;
    isOrganizer: boolean;
    responseRequested: boolean;
    seriesMasterId: null;
    showAs: ShowAs;
    type: ValueType;
    webLink: string;
    onlineMeetingUrl: null;
    isOnlineMeeting: boolean;
    onlineMeetingProvider: OnlineMeetingProvider;
    allowNewTimeProposals: boolean;
    occurrenceId: null;
    isDraft: boolean;
    hideAttendees: boolean;
    responseStatus: Status;
    body: Body;
    start: End;
    end: End;
    location: Location;
    locations: Location[];
    recurrence: Recurrence | null;
    attendees: Attendee[];
    organizer: Organizer;
    onlineMeeting: OnlineMeeting;
    "calendar@odata.associationLink": string;
    "calendar@odata.navigationLink": string;
}

export interface Attendee {
    type: AttendeeType;
    status: Status;
    emailAddress: EmailAddress;
}

export interface EmailAddress {
    name: string;
    address: string;
}

export interface Status {
    response: Response;
    time: string;
}

export enum Response {
    Accepted = "accepted",
    None = "none",
    NotResponded = "notResponded",
}

export enum AttendeeType {
    Required = "required",
}

export interface Body {
    contentType: ContentType;
    content: string;
}

export enum ContentType {
    HTML = "html",
}

export interface End {
    dateTime: string;
    timeZone: TimeZone;
}

export enum TimeZone {
    UTC = "UTC",
}

export enum Importance {
    Normal = "normal",
}

export interface Location {
    displayName: string;
    locationType: LocationType;
    uniqueId: string;
    uniqueIdType: UniqueIDType;
}

export enum LocationType {
    Default = "default",
}

export enum UniqueIDType {
    Private = "private",
    Unknown = "unknown",
}

export interface OnlineMeeting {
    joinUrl: string;
    conferenceId: string;
    tollNumber: TollNumber;
}

export enum TollNumber {
    The31207081472 = "+31 20 708 1472",
}

export enum OnlineMeetingProvider {
    TeamsForBusiness = "teamsForBusiness",
}

export interface Organizer {
    emailAddress: EmailAddress;
}

export enum OriginalEndTimeZoneEnum {
    EasternStandardTime = "Eastern Standard Time",
    PacificStandardTime = "Pacific Standard Time",
}

export interface Recurrence {
    pattern: Pattern;
    range: Range;
}

export interface Pattern {
    type: string;
    interval: number;
    month: number;
    dayOfMonth: number;
    daysOfWeek: DaysOfWeek[];
    firstDayOfWeek: string;
    index: string;
}

export enum DaysOfWeek {
    Friday = "friday",
    Monday = "monday",
    Wednesday = "wednesday",
}

export interface Range {
    type: string;
    startDate: string;
    endDate: string;
    recurrenceTimeZone: OriginalEndTimeZoneEnum;
    numberOfOccurrences: number;
}

export enum ShowAs {
    Busy = "busy",
    Tentative = "tentative",
}

export enum ValueType {
    SeriesMaster = "seriesMaster",
    SingleInstance = "singleInstance",
}
