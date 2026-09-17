type AlertNotificationProps = {
  type: "success" | "excursion" | "error";
  title: string;
  message: string;
  onClose?: () => void;
};

export default function AlertNotification({
  type,
  title,
  message,
  onClose,
}: AlertNotificationProps) {
  const styles = {
    success:
      "border-green-300 bg-green-50 text-green-800",
    excursion:
      "border-red-300 bg-red-50 text-red-800",
    error:
      "border-red-300 bg-red-50 text-red-800",
  };

  const icons = {
    success: "✓",
    excursion: "⚠",
    error: "✕",
  };

  return (
    <div
      role="alert"
      className={`relative rounded-lg border p-5 ${styles[type]}`}
    >
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close notification"
          className="absolute right-4 top-3 text-xl font-bold opacity-70 transition hover:opacity-100"
        >
          ×
        </button>
      )}

      <div className="flex items-start gap-3 pr-8">
        <span
          aria-hidden="true"
          className="text-xl font-bold"
        >
          {icons[type]}
        </span>

        <div>
          <h3 className="font-bold">
            {title}
          </h3>

          <p className="mt-1">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}