"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  getBranchReadings,
  getReadingById,
} from "../../lib/api";

import ReadingsTable from "../components/ReadingsTable";
import StatusBadge from "../components/StatusBadge";

type ViewMode = "branch" | "individual";

export default function ReadingsPage() {
  const [viewMode, setViewMode] =
    useState<ViewMode>("branch");

  const [branchId, setBranchId] =
    useState("BRANCH-001");

  const [readingId, setReadingId] =
    useState("");

  // -----------------------------------------
  // GET ALL READINGS FOR A BRANCH
  // -----------------------------------------

  const branchQuery = useQuery({
    queryKey: [
      "readings",
      branchId,
    ],

    queryFn: () =>
      getBranchReadings(branchId),

    enabled:
      viewMode === "branch" &&
      Boolean(branchId),
  });

  // -----------------------------------------
  // GET ONE READING BY UUID
  // -----------------------------------------

  const individualQuery = useQuery({
    queryKey: [
      "reading",
      branchId,
      readingId,
    ],

    queryFn: () =>
      getReadingById(
        branchId,
        readingId
      ),

    enabled: false,
  });

  function handleFindReading() {
    if (
      !branchId.trim() ||
      !readingId.trim()
    ) {
      return;
    }

    individualQuery.refetch();
  }

  function formatDateTime(
    dateString?: string
  ) {
    if (!dateString) {
      return "—";
    }

    return new Date(
      dateString
    ).toLocaleString("en-GB");
  }

  return (
    <main className="min-h-screen bg-gray-50 p-10 text-gray-900">

      <div className="mx-auto max-w-[1600px]">

        <div className="mb-10">

          <h1 className="text-4xl font-bold text-[#174a7e]">
            Temperature Readings
          </h1>

          <p className="mt-3 text-lg text-gray-600">
            View branch readings or search for an
            individual reading using its UUID.
          </p>

        </div>

        {/* VIEW SELECTOR */}

        <section className="mb-8 rounded-xl bg-white p-6 shadow-sm">

          <label
            htmlFor="viewMode"
            className="block font-semibold text-[#174a7e]"
          >
            View
          </label>

          <select
            id="viewMode"
            value={viewMode}
            onChange={(event) =>
              setViewMode(
                event.target.value as ViewMode
              )
            }
            className="mt-3 w-full max-w-md rounded-lg border border-gray-300 px-4 py-3"
          >
            <option value="branch">
              Branch Readings
            </option>

            <option value="individual">
              Individual Reading
            </option>
          </select>

        </section>

        {/* BRANCH MODE */}

        {viewMode === "branch" && (
          <>
            <section className="mb-8 rounded-xl bg-white p-6 shadow-sm">

              <label
                htmlFor="branchId"
                className="block font-semibold text-[#174a7e]"
              >
                Branch ID
              </label>

              <div className="mt-3 flex max-w-xl gap-3">

                <input
                  id="branchId"
                  type="text"
                  value={branchId}
                  onChange={(event) =>
                    setBranchId(
                      event.target.value
                    )
                  }
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#159fbd]"
                />

                <button
                  type="button"
                  onClick={() =>
                    branchQuery.refetch()
                  }
                  className="rounded-lg bg-[#174a7e] px-6 py-3 font-semibold text-white hover:bg-[#123a63]"
                >
                  Refresh
                </button>

              </div>
            </section>

            {branchQuery.isLoading && (
              <div className="rounded-xl bg-white p-8 shadow-sm">
                Loading temperature readings...
              </div>
            )}

            {branchQuery.isError && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-6">

                <h2 className="font-bold text-red-700">
                  Unable to load readings.
                </h2>

                <p className="mt-2 text-red-700">
                  {branchQuery.error instanceof Error
                    ? branchQuery.error.message
                    : "An unknown error occurred."}
                </p>

              </div>
            )}

            {!branchQuery.isLoading &&
              !branchQuery.isError &&
              branchQuery.data?.length === 0 && (
                <div className="rounded-xl bg-white p-8 text-center shadow-sm">

                  <h2 className="text-xl font-bold text-[#174a7e]">
                    No readings recorded
                  </h2>

                  <p className="mt-2 text-gray-600">
                    No readings recorded for this
                    branch yet.
                  </p>

                </div>
              )}

            {!branchQuery.isLoading &&
              !branchQuery.isError &&
              branchQuery.data &&
              branchQuery.data.length > 0 && (
                <ReadingsTable
                  readings={branchQuery.data}
                />
              )}
          </>
        )}

        {/* INDIVIDUAL READING MODE */}

        {viewMode === "individual" && (
          <>
            <section className="mb-8 rounded-xl bg-white p-6 shadow-sm">

              <div className="grid max-w-3xl gap-5 md:grid-cols-2">

                <div>
                  <label
                    htmlFor="individualBranchId"
                    className="block font-semibold text-[#174a7e]"
                  >
                    Branch ID
                  </label>

                  <input
                    id="individualBranchId"
                    type="text"
                    value={branchId}
                    onChange={(event) =>
                      setBranchId(
                        event.target.value
                      )
                    }
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
                  />
                </div>

                <div>
                  <label
                    htmlFor="readingId"
                    className="block font-semibold text-[#174a7e]"
                  >
                    Reading UUID
                  </label>

                  <input
                    id="readingId"
                    type="text"
                    value={readingId}
                    onChange={(event) =>
                      setReadingId(
                        event.target.value
                      )
                    }
                    placeholder="Enter reading UUID"
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
                  />
                </div>

              </div>

              <button
                type="button"
                onClick={handleFindReading}
                disabled={
                  !branchId.trim() ||
                  !readingId.trim()
                }
                className="mt-6 rounded-lg bg-[#174a7e] px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Find Reading
              </button>

            </section>

            {individualQuery.isFetching && (
              <div className="rounded-xl bg-white p-8 shadow-sm">
                Loading reading...
              </div>
            )}

            {individualQuery.isError && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-6">

                <h2 className="font-bold text-red-700">
                  Unable to find reading.
                </h2>

                <p className="mt-2 text-red-700">
                  {individualQuery.error instanceof Error
                    ? individualQuery.error.message
                    : "An unknown error occurred."}
                </p>

              </div>
            )}

            {individualQuery.data && (
              <section className="rounded-xl bg-white p-8 shadow-sm">

                <div className="flex flex-wrap items-center justify-between gap-4">

                  <h2 className="text-2xl font-bold text-[#174a7e]">
                    Reading Details
                  </h2>

                  <StatusBadge
                    status={
                      individualQuery.data.status
                    }
                  />

                </div>

                {individualQuery.data.status ===
                  "excursion" && (
                  <div className="mt-6 rounded-lg border border-red-300 bg-red-50 p-5">

                    <p className="font-bold text-red-700">
                      ⚠ Excursion detected
                    </p>

                    <p className="mt-1 text-red-700">
                      This reading is outside the
                      permitted temperature range.
                    </p>

                  </div>
                )}

                <dl className="mt-8 grid gap-6 md:grid-cols-2">

                  <div>
                    <dt className="font-semibold text-gray-500">
                      Reading UUID
                    </dt>

                    <dd className="mt-1 break-all font-mono">
                      {
                        individualQuery.data
                          .readingId
                      }
                    </dd>
                  </div>

                  <div>
                    <dt className="font-semibold text-gray-500">
                      Branch ID
                    </dt>

                    <dd className="mt-1">
                      {
                        individualQuery.data
                          .branchId
                      }
                    </dd>
                  </div>

                  <div>
                    <dt className="font-semibold text-gray-500">
                      Recorded At
                    </dt>

                    <dd className="mt-1">
                      {formatDateTime(
                        individualQuery.data
                          .recordedAt
                      )}
                    </dd>
                  </div>

                  <div>
                    <dt className="font-semibold text-gray-500">
                      Recorded By
                    </dt>

                    <dd className="mt-1">
                      {
                        individualQuery.data
                          .recordedBy
                      }
                    </dd>
                  </div>

                  <div>
                    <dt className="font-semibold text-gray-500">
                      Minimum Temperature
                    </dt>

                    <dd className="mt-1">
                      {
                        individualQuery.data
                          .minTempC
                      }
                      °C
                    </dd>
                  </div>

                  <div>
                    <dt className="font-semibold text-gray-500">
                      Maximum Temperature
                    </dt>

                    <dd className="mt-1">
                      {
                        individualQuery.data
                          .maxTempC
                      }
                      °C
                    </dd>
                  </div>

                  <div>
                    <dt className="font-semibold text-gray-500">
                      Status
                    </dt>

                    <dd className="mt-2">
                      <StatusBadge
                        status={
                          individualQuery.data
                            .status
                        }
                      />
                    </dd>
                  </div>

                  <div>
                    <dt className="font-semibold text-gray-500">
                      Alert Raised At
                    </dt>

                    <dd className="mt-1">
                      {formatDateTime(
                        individualQuery.data
                          .alertRaisedAt
                      )}
                    </dd>
                  </div>

                </dl>

              </section>
            )}
          </>
        )}

      </div>

    </main>
  );
}