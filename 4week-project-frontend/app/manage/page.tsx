"use client";

import {
  FormEvent,
  useState,
} from "react";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createReading,
  updateReading,
  deleteReading,
  type CreateReadingInput,
  type UpdateReadingInput,
} from "../../lib/api";

import AlertNotification from "../components/AlertNotification";

type ManageMode =
  | "create"
  | "edit"
  | "delete";

export default function ManageReadingsPage() {
  const queryClient =
    useQueryClient();

  const [mode, setMode] =
    useState<ManageMode>("create");

  // =========================================
  // CREATE READING STATE
  // =========================================

  const [
    branchId,
    setBranchId,
  ] = useState("BRANCH-001");

  const [
    recordedAt,
    setRecordedAt,
  ] = useState("");

  const [
    minTempC,
    setMinTempC,
  ] = useState("");

  const [
    maxTempC,
    setMaxTempC,
  ] = useState("");

  const [
    recordedBy,
    setRecordedBy,
  ] = useState("");

  const [
    createValidationError,
    setCreateValidationError,
  ] = useState("");

  // =========================================
  // EDIT READING STATE
  // =========================================

  const [
    editBranchId,
    setEditBranchId,
  ] = useState("BRANCH-001");

  const [
    editReadingId,
    setEditReadingId,
  ] = useState("");

  const [
    editMinTempC,
    setEditMinTempC,
  ] = useState("");

  const [
    editMaxTempC,
    setEditMaxTempC,
  ] = useState("");

  const [
    editRecordedBy,
    setEditRecordedBy,
  ] = useState("");

  const [
    editValidationError,
    setEditValidationError,
  ] = useState("");

  // =========================================
  // DELETE READING STATE
  // =========================================

  const [
    deleteBranchId,
    setDeleteBranchId,
  ] = useState("BRANCH-001");

  const [
    deleteReadingId,
    setDeleteReadingId,
  ] = useState("");

  const [
    deleteValidationError,
    setDeleteValidationError,
  ] = useState("");

  const [
    showDeleteConfirmation,
    setShowDeleteConfirmation,
  ] = useState(false);

  const [
    deletedReadingId,
    setDeletedReadingId,
  ] = useState("");

  // =========================================
  // CREATE MUTATION - POST
  // =========================================

  const createMutation =
    useMutation({
      mutationFn: (
        input: CreateReadingInput
      ) =>
        createReading(input),

      onSuccess: async (
        reading,
        variables
      ) => {
        await queryClient.invalidateQueries({
          queryKey: [
            "readings",
            variables.branchId,
          ],
        });

        setRecordedAt("");
        setMinTempC("");
        setMaxTempC("");
        setRecordedBy("");
        setCreateValidationError("");
      },
    });

  // =========================================
  // EDIT MUTATION - PATCH
  // =========================================

  const updateMutation =
    useMutation({
      mutationFn: ({
        branchId,
        readingId,
        input,
      }: {
        branchId: string;
        readingId: string;
        input: UpdateReadingInput;
      }) =>
        updateReading(
          branchId,
          readingId,
          input
        ),

      onSuccess: async (
        reading,
        variables
      ) => {
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: [
              "readings",
              variables.branchId,
            ],
          }),

          queryClient.invalidateQueries({
            queryKey: [
              "reading",
              variables.branchId,
              variables.readingId,
            ],
          }),
        ]);

        setEditMinTempC("");
        setEditMaxTempC("");
        setEditRecordedBy("");
        setEditValidationError("");
      },
    });

  // =========================================
  // DELETE MUTATION - DELETE
  // =========================================

  const deleteMutation =
    useMutation({
      mutationFn: ({
        branchId,
        readingId,
      }: {
        branchId: string;
        readingId: string;
      }) =>
        deleteReading(
          branchId,
          readingId
        ),

      onSuccess: async (
        _data,
        variables
      ) => {
        setDeletedReadingId(
          variables.readingId
        );

        await queryClient.invalidateQueries({
          queryKey: [
            "readings",
            variables.branchId,
          ],
        });

        queryClient.removeQueries({
          queryKey: [
            "reading",
            variables.branchId,
            variables.readingId,
          ],
          exact: true,
        });

        setDeleteReadingId("");
        setDeleteValidationError("");
        setShowDeleteConfirmation(false);
      },
    });

  // =========================================
  // CREATE VALIDATION
  // =========================================

  function validateCreateForm() {
    if (!branchId.trim()) {
      return "Branch ID is required.";
    }

    if (!recordedAt) {
      return "Recorded At is required.";
    }

    if (
      !minTempC ||
      Number.isNaN(
        Number(minTempC)
      )
    ) {
      return "Minimum temperature must be a valid number.";
    }

    if (
      !maxTempC ||
      Number.isNaN(
        Number(maxTempC)
      )
    ) {
      return "Maximum temperature must be a valid number.";
    }

    if (
      Number(maxTempC) <
      Number(minTempC)
    ) {
      return "Maximum temperature cannot be lower than minimum temperature.";
    }

    if (!recordedBy.trim()) {
      return "Recorded By is required.";
    }

    const selectedDate =
      new Date(recordedAt);

    if (
      Number.isNaN(
        selectedDate.getTime()
      )
    ) {
      return "Recorded At must be a valid date and time.";
    }

    if (
      selectedDate.getTime() >
      Date.now()
    ) {
      return "Recorded At cannot be in the future.";
    }

    return "";
  }

  // =========================================
  // EDIT VALIDATION
  // =========================================

  function validateEditForm() {
    if (!editBranchId.trim()) {
      return "Branch ID is required.";
    }

    if (!editReadingId.trim()) {
      return "Reading UUID is required.";
    }

    if (
      !editMinTempC &&
      !editMaxTempC &&
      !editRecordedBy.trim()
    ) {
      return "Enter at least one field to update.";
    }

    if (
      editMinTempC &&
      Number.isNaN(
        Number(editMinTempC)
      )
    ) {
      return "Minimum temperature must be a valid number.";
    }

    if (
      editMaxTempC &&
      Number.isNaN(
        Number(editMaxTempC)
      )
    ) {
      return "Maximum temperature must be a valid number.";
    }

    if (
      editMinTempC &&
      editMaxTempC &&
      Number(editMaxTempC) <
        Number(editMinTempC)
    ) {
      return "Maximum temperature cannot be lower than minimum temperature.";
    }

    return "";
  }

  // =========================================
  // DELETE VALIDATION
  // =========================================

  function validateDeleteForm() {
    if (!deleteBranchId.trim()) {
      return "Branch ID is required.";
    }

    if (!deleteReadingId.trim()) {
      return "Reading UUID is required.";
    }

    return "";
  }

  // =========================================
  // CREATE SUBMIT
  // =========================================

  function handleCreateSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    createMutation.reset();

    const error =
      validateCreateForm();

    if (error) {
      setCreateValidationError(
        error
      );
      return;
    }

    setCreateValidationError("");

    createMutation.mutate({
      branchId:
        branchId.trim(),

      recordedAt:
        new Date(
          recordedAt
        ).toISOString(),

      minTempC:
        Number(minTempC),

      maxTempC:
        Number(maxTempC),

      recordedBy:
        recordedBy.trim(),
    });
  }

  // =========================================
  // EDIT SUBMIT
  // =========================================

  function handleEditSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    updateMutation.reset();

    const error =
      validateEditForm();

    if (error) {
      setEditValidationError(
        error
      );
      return;
    }

    setEditValidationError("");

    const input:
      UpdateReadingInput = {};

    if (editMinTempC) {
      input.minTempC =
        Number(editMinTempC);
    }

    if (editMaxTempC) {
      input.maxTempC =
        Number(editMaxTempC);
    }

    if (
      editRecordedBy.trim()
    ) {
      input.recordedBy =
        editRecordedBy.trim();
    }

    updateMutation.mutate({
      branchId:
        editBranchId.trim(),

      readingId:
        editReadingId.trim(),

      input,
    });
  }

  // =========================================
  // DELETE SUBMIT
  // =========================================

  function handleDeleteSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    deleteMutation.reset();
    setDeletedReadingId("");

    const error =
      validateDeleteForm();

    if (error) {
      setDeleteValidationError(
        error
      );
      return;
    }

    setDeleteValidationError("");

    setShowDeleteConfirmation(
      true
    );
  }

  function confirmDelete() {
    deleteMutation.mutate({
      branchId:
        deleteBranchId.trim(),

      readingId:
        deleteReadingId.trim(),
    });
  }

  // =========================================
  // PAGE
  // =========================================

  return (
    <main className="min-h-screen bg-gray-50 p-10 text-gray-900">

      <div className="mx-auto max-w-5xl">

        <div className="mb-10">

          <h1 className="text-4xl font-bold text-[#174a7e]">
            Manage Readings
          </h1>

          <p className="mt-3 text-lg text-gray-600">
            Create, edit and delete
            cold-chain temperature
            readings.
          </p>

        </div>

        {/* ===================================
            MODE BUTTONS
        =================================== */}

        <div className="mb-8 flex flex-wrap gap-3">

          <button
            type="button"
            onClick={() =>
              setMode("create")
            }
            className={
              mode === "create"
                ? "rounded-lg bg-[#174a7e] px-6 py-3 font-semibold text-white"
                : "rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700"
            }
          >
            Create Reading
          </button>

          <button
            type="button"
            onClick={() =>
              setMode("edit")
            }
            className={
              mode === "edit"
                ? "rounded-lg bg-[#174a7e] px-6 py-3 font-semibold text-white"
                : "rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700"
            }
          >
            Edit Reading
          </button>

          <button
            type="button"
            onClick={() =>
              setMode("delete")
            }
            className={
              mode === "delete"
                ? "rounded-lg bg-red-700 px-6 py-3 font-semibold text-white"
                : "rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700"
            }
          >
            Delete Reading
          </button>

        </div>

        {/* ===================================
            CREATE READING
        =================================== */}

        {mode === "create" && (
          <section className="rounded-xl bg-white p-8 shadow-sm">

            <div className="mb-8">

              <h2 className="text-2xl font-bold text-[#174a7e]">
                Log New Reading
              </h2>

              <p className="mt-2 text-gray-600">
                Enter the temperature
                reading information below.
                The UUID and status are
                generated by the backend.
              </p>

            </div>

            <form
              onSubmit={
                handleCreateSubmit
              }
              className="space-y-6"
            >

              <div>
                <label
                  htmlFor="branchId"
                  className="block font-semibold"
                >
                  Branch ID
                  <span className="text-red-600">
                    {" "}*
                  </span>
                </label>

                <input
                  id="branchId"
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
                  htmlFor="recordedAt"
                  className="block font-semibold"
                >
                  Recorded At
                  <span className="text-red-600">
                    {" "}*
                  </span>
                </label>

                <input
                  id="recordedAt"
                  type="datetime-local"
                  value={recordedAt}
                  onChange={(event) =>
                    setRecordedAt(
                      event.target.value
                    )
                  }
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">

                <div>
                  <label
                    htmlFor="minTempC"
                    className="block font-semibold"
                  >
                    Minimum Temperature °C
                    <span className="text-red-600">
                      {" "}*
                    </span>
                  </label>

                  <input
                    id="minTempC"
                    type="number"
                    step="0.1"
                    value={minTempC}
                    onChange={(event) =>
                      setMinTempC(
                        event.target.value
                      )
                    }
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
                  />
                </div>

                <div>
                  <label
                    htmlFor="maxTempC"
                    className="block font-semibold"
                  >
                    Maximum Temperature °C
                    <span className="text-red-600">
                      {" "}*
                    </span>
                  </label>

                  <input
                    id="maxTempC"
                    type="number"
                    step="0.1"
                    value={maxTempC}
                    onChange={(event) =>
                      setMaxTempC(
                        event.target.value
                      )
                    }
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
                  />
                </div>

              </div>

              <div>
                <label
                  htmlFor="recordedBy"
                  className="block font-semibold"
                >
                  Recorded By
                  <span className="text-red-600">
                    {" "}*
                  </span>
                </label>

                <input
                  id="recordedBy"
                  type="text"
                  value={recordedBy}
                  onChange={(event) =>
                    setRecordedBy(
                      event.target.value
                    )
                  }
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
                />
              </div>

              {createValidationError && (
                <AlertNotification
                  type="error"
                  title="Check the form"
                  message={
                    createValidationError
                  }
                  onClose={() =>
                    setCreateValidationError("")
                  }
                />
              )}

              {createMutation.isError && (
                <AlertNotification
                  type="error"
                  title="Reading could not be saved"
                  message={
                    createMutation.error instanceof Error
                      ? createMutation.error.message
                      : "An unknown error occurred."
                  }
                  onClose={() =>
                    createMutation.reset()
                  }
                />
              )}

              {createMutation.isSuccess &&
                createMutation.data.status === "ok" && (
                  <AlertNotification
                    type="success"
                    title="Reading saved"
                    message={`Reading ${createMutation.data.readingId} was saved successfully.`}
                    onClose={() =>
                      createMutation.reset()
                    }
                  />
                )}

              {createMutation.isSuccess &&
                createMutation.data.status === "excursion" && (
                  <AlertNotification
                    type="excursion"
                    title="Excursion detected"
                    message="The reading was saved successfully and an excursion alert has been raised."
                    onClose={() =>
                      createMutation.reset()
                    }
                  />
                )}

              <button
                type="submit"
                disabled={
                  createMutation.isPending
                }
                className="rounded-lg bg-[#174a7e] px-7 py-3 font-semibold text-white disabled:opacity-50"
              >
                {createMutation.isPending
                  ? "Saving Reading..."
                  : "Save Reading"}
              </button>

            </form>

          </section>
        )}

        {/* ===================================
            EDIT READING
        =================================== */}

        {mode === "edit" && (
          <section className="rounded-xl bg-white p-8 shadow-sm">

            <div className="mb-8">

              <h2 className="text-2xl font-bold text-[#174a7e]">
                Edit Reading
              </h2>

              <p className="mt-2 text-gray-600">
                Enter the branch and
                reading UUID, then enter
                only the fields that you
                want to update.
              </p>

            </div>

            <form
              onSubmit={
                handleEditSubmit
              }
              className="space-y-6"
            >

              <div>
                <label
                  htmlFor="editBranchId"
                  className="block font-semibold"
                >
                  Branch ID
                  <span className="text-red-600">
                    {" "}*
                  </span>
                </label>

                <input
                  id="editBranchId"
                  type="text"
                  value={editBranchId}
                  onChange={(event) =>
                    setEditBranchId(
                      event.target.value
                    )
                  }
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
                />
              </div>

              <div>
                <label
                  htmlFor="editReadingId"
                  className="block font-semibold"
                >
                  Reading UUID
                  <span className="text-red-600">
                    {" "}*
                  </span>
                </label>

                <input
                  id="editReadingId"
                  type="text"
                  value={editReadingId}
                  onChange={(event) =>
                    setEditReadingId(
                      event.target.value
                    )
                  }
                  placeholder="Enter UUID"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 font-mono"
                />
              </div>

              <div className="border-t border-gray-200 pt-6">

                <h3 className="font-bold text-[#174a7e]">
                  Fields to update
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Leave a field blank if
                  you do not want to
                  change it.
                </p>

              </div>

              <div className="grid gap-6 md:grid-cols-2">

                <div>
                  <label
                    htmlFor="editMinTempC"
                    className="block font-semibold"
                  >
                    Minimum Temperature °C
                  </label>

                  <input
                    id="editMinTempC"
                    type="number"
                    step="0.1"
                    value={editMinTempC}
                    onChange={(event) =>
                      setEditMinTempC(
                        event.target.value
                      )
                    }
                    placeholder="Leave blank to keep current value"
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
                  />
                </div>

                <div>
                  <label
                    htmlFor="editMaxTempC"
                    className="block font-semibold"
                  >
                    Maximum Temperature °C
                  </label>

                  <input
                    id="editMaxTempC"
                    type="number"
                    step="0.1"
                    value={editMaxTempC}
                    onChange={(event) =>
                      setEditMaxTempC(
                        event.target.value
                      )
                    }
                    placeholder="Leave blank to keep current value"
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
                  />
                </div>

              </div>

              <div>
                <label
                  htmlFor="editRecordedBy"
                  className="block font-semibold"
                >
                  Recorded By
                </label>

                <input
                  id="editRecordedBy"
                  type="text"
                  value={editRecordedBy}
                  onChange={(event) =>
                    setEditRecordedBy(
                      event.target.value
                    )
                  }
                  placeholder="Leave blank to keep current value"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
                />
              </div>

              {editValidationError && (
                <AlertNotification
                  type="error"
                  title="Check the form"
                  message={
                    editValidationError
                  }
                  onClose={() =>
                    setEditValidationError("")
                  }
                />
              )}

              {updateMutation.isError && (
                <AlertNotification
                  type="error"
                  title="Reading could not be updated"
                  message={
                    updateMutation.error instanceof Error
                      ? updateMutation.error.message
                      : "An unknown error occurred."
                  }
                  onClose={() =>
                    updateMutation.reset()
                  }
                />
              )}

              {updateMutation.isSuccess &&
                updateMutation.data.status === "ok" && (
                  <AlertNotification
                    type="success"
                    title="Reading updated"
                    message={`Reading ${updateMutation.data.readingId} was updated successfully.`}
                    onClose={() =>
                      updateMutation.reset()
                    }
                  />
                )}

              {updateMutation.isSuccess &&
                updateMutation.data.status === "excursion" && (
                  <AlertNotification
                    type="excursion"
                    title="Excursion detected"
                    message="The reading was updated successfully and is currently marked as an excursion."
                    onClose={() =>
                      updateMutation.reset()
                    }
                  />
                )}

              <button
                type="submit"
                disabled={
                  updateMutation.isPending
                }
                className="rounded-lg bg-[#174a7e] px-7 py-3 font-semibold text-white disabled:opacity-50"
              >
                {updateMutation.isPending
                  ? "Updating Reading..."
                  : "Update Reading"}
              </button>

            </form>

          </section>
        )}

        {/* ===================================
            DELETE READING
        =================================== */}

        {mode === "delete" && (
          <section className="rounded-xl bg-white p-8 shadow-sm">

            <div className="mb-8">

              <h2 className="text-2xl font-bold text-red-700">
                Delete Reading
              </h2>

              <p className="mt-2 text-gray-600">
                Enter the branch and UUID
                of the reading you want to
                permanently delete.
              </p>

            </div>

            <form
              onSubmit={
                handleDeleteSubmit
              }
              className="space-y-6"
            >

              <div>
                <label
                  htmlFor="deleteBranchId"
                  className="block font-semibold"
                >
                  Branch ID
                  <span className="text-red-600">
                    {" "}*
                  </span>
                </label>

                <input
                  id="deleteBranchId"
                  type="text"
                  value={deleteBranchId}
                  onChange={(event) => {
                    setDeleteBranchId(
                      event.target.value
                    );

                    setShowDeleteConfirmation(
                      false
                    );
                  }}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
                />
              </div>

              <div>
                <label
                  htmlFor="deleteReadingId"
                  className="block font-semibold"
                >
                  Reading UUID
                  <span className="text-red-600">
                    {" "}*
                  </span>
                </label>

                <input
                  id="deleteReadingId"
                  type="text"
                  value={deleteReadingId}
                  onChange={(event) => {
                    setDeleteReadingId(
                      event.target.value
                    );

                    setShowDeleteConfirmation(
                      false
                    );
                  }}
                  placeholder="Enter UUID"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 font-mono"
                />
              </div>

              {deleteValidationError && (
                <AlertNotification
                  type="error"
                  title="Check the form"
                  message={
                    deleteValidationError
                  }
                  onClose={() =>
                    setDeleteValidationError("")
                  }
                />
              )}

              {deleteMutation.isError && (
                <AlertNotification
                  type="error"
                  title="Reading could not be deleted"
                  message={
                    deleteMutation.error instanceof Error
                      ? deleteMutation.error.message
                      : "An unknown error occurred."
                  }
                  onClose={() =>
                    deleteMutation.reset()
                  }
                />
              )}

              {deletedReadingId && (
                <AlertNotification
                  type="success"
                  title="Reading deleted"
                  message={`Reading ${deletedReadingId} was deleted successfully.`}
                  onClose={() =>
                    setDeletedReadingId("")
                  }
                />
              )}

              {!showDeleteConfirmation && (
                <button
                  type="submit"
                  className="rounded-lg bg-red-700 px-7 py-3 font-semibold text-white hover:bg-red-800"
                >
                  Delete Reading
                </button>
              )}

              {showDeleteConfirmation && (
                <div className="rounded-xl border border-red-300 bg-red-50 p-6">

                  <h3 className="text-lg font-bold text-red-800">
                    Confirm deletion
                  </h3>

                  <p className="mt-2 text-red-800">
                    Are you sure you want to
                    permanently delete this
                    reading?
                  </p>

                  <p className="mt-4 break-all font-mono text-sm text-red-900">
                    {deleteReadingId}
                  </p>

                  <div className="mt-6 flex gap-3">

                    <button
                      type="button"
                      onClick={() =>
                        setShowDeleteConfirmation(
                          false
                        )
                      }
                      className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={
                        confirmDelete
                      }
                      disabled={
                        deleteMutation.isPending
                      }
                      className="rounded-lg bg-red-700 px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {deleteMutation.isPending
                        ? "Deleting..."
                        : "Confirm Delete"}
                    </button>

                  </div>

                </div>
              )}

            </form>

          </section>
        )}

      </div>

    </main>
  );
}