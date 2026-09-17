import type { ReadingStatus } from "../../types/reading";

type StatusBadgeProps = {
  status: ReadingStatus;
};

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  if (status === "excursion") {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-red-300 bg-red-50 px-3 py-1 text-sm font-bold text-red-700">
        <span aria-hidden="true">⚠</span>
        EXCURSION
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-green-300 bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">
      <span aria-hidden="true">✓</span>
      OK
    </span>
  );
}