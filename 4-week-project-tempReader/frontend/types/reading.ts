export type ReadingStatus = "ok" | "excursion";

export type Reading = {
  readingId: string;
  branchId: string;
  recordedAt: string;
  minTempC: number;
  maxTempC: number;
  status: ReadingStatus;
  recordedBy: string;
  alertRaisedAt?: string;
};