import type { Reading } from "../types/reading";

const FRONTEND_API_BASE = "/api/backend";

export type CreateReadingInput = {
  branchId: string;
  recordedAt: string;
  minTempC: number;
  maxTempC: number;
  recordedBy: string;
};

export type UpdateReadingInput = {
  minTempC?: number;
  maxTempC?: number;
  recordedBy?: string;
};

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function apiRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(
    `${FRONTEND_API_BASE}${path}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    }
  );

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;

    try {
      const errorData = await response.json();

      if (errorData.message) {
        message = errorData.message;
      }

      if (errorData.error) {
        message = errorData.error;
      }
    } catch {
      // Keep the default message if the response is not JSON.
    }

    throw new ApiError(message, response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

export async function getBranchReadings(
  branchId: string
): Promise<Reading[]> {
  return apiRequest<Reading[]>(
    `/branches/${encodeURIComponent(branchId)}/readings`
  );
}

export async function getReadingById(
  branchId: string,
  readingId: string
): Promise<Reading> {
  return apiRequest<Reading>(
    `/branches/${encodeURIComponent(branchId)}/readings/${encodeURIComponent(
      readingId
    )}`
  );
}

export async function createReading(
  input: CreateReadingInput
): Promise<Reading> {
  const { branchId, ...body } = input;

  return apiRequest<Reading>(
    `/branches/${encodeURIComponent(branchId)}/readings`,
    {
      method: "POST",
      body: JSON.stringify(body),
    }
  );
}

export async function updateReading(
  branchId: string,
  readingId: string,
  input: UpdateReadingInput
): Promise<Reading> {
  return apiRequest<Reading>(
    `/branches/${encodeURIComponent(branchId)}/readings/${encodeURIComponent(
      readingId
    )}`,
    {
      method: "PATCH",
      body: JSON.stringify(input),
    }
  );
}

export async function deleteReading(
  branchId: string,
  readingId: string
): Promise<void> {
  return apiRequest<void>(
    `/branches/${encodeURIComponent(branchId)}/readings/${encodeURIComponent(
      readingId
    )}`,
    {
      method: "DELETE",
    }
  );
}