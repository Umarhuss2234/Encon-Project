import type { Reading } from "../../types/reading";
import StatusBadge from "./StatusBadge";

type ReadingsTableProps = {
  readings: Reading[];
};

export default function ReadingsTable({
  readings,
}: ReadingsTableProps) {
  const sortedReadings = [...readings].sort(
    (a, b) =>
      new Date(b.recordedAt).getTime() -
      new Date(a.recordedAt).getTime()
  );

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString(
      "en-GB"
    );
  }

  function formatTime(dateString: string) {
    return new Date(dateString).toLocaleTimeString(
      "en-GB",
      {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }
    );
  }

  function formatAlertTime(
    reading: Reading
  ) {
    if (reading.alertRaisedAt) {
      return new Date(
        reading.alertRaisedAt
      ).toLocaleString("en-GB");
    }

    if (reading.status === "excursion") {
      return "Pending";
    }

    return "—";
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full border-collapse text-left text-sm text-gray-800">

        <thead className="bg-gray-100">
          <tr>
            <th className="border-b px-4 py-4 font-bold">
              Reading UUID
            </th>

            <th className="border-b px-4 py-4 font-bold">
              Branch
            </th>

            <th className="border-b px-4 py-4 font-bold">
              Date
            </th>

            <th className="border-b px-4 py-4 font-bold">
              Time
            </th>

            <th className="border-b px-4 py-4 font-bold">
              Min °C
            </th>

            <th className="border-b px-4 py-4 font-bold">
              Max °C
            </th>

            <th className="border-b bg-red-50 px-4 py-4 font-bold text-red-700">
              Status
            </th>

            <th className="border-b bg-red-50 px-4 py-4 font-bold text-red-700">
              Alert Raised At
            </th>

            <th className="border-b px-4 py-4 font-bold">
              Recorded By
            </th>
          </tr>
        </thead>

        <tbody>
          {sortedReadings.map((reading) => (
            <tr
              key={reading.readingId}
              className={
                reading.status === "excursion"
                  ? "border-b bg-red-50/50"
                  : "border-b bg-white"
              }
            >
              <td className="max-w-xs break-all px-4 py-4 font-mono text-xs">
                {reading.readingId}
              </td>

              <td className="px-4 py-4">
                {reading.branchId}
              </td>

              <td className="px-4 py-4">
                {formatDate(
                  reading.recordedAt
                )}
              </td>

              <td className="px-4 py-4">
                {formatTime(
                  reading.recordedAt
                )}
              </td>

              <td className="px-4 py-4">
                {reading.minTempC}°C
              </td>

              <td className="px-4 py-4">
                {reading.maxTempC}°C
              </td>

              <td className="px-4 py-4">
                <StatusBadge
                  status={reading.status}
                />
              </td>

              <td className="px-4 py-4">
                {formatAlertTime(
                  reading
                )}
              </td>

              <td className="px-4 py-4">
                {reading.recordedBy}
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}