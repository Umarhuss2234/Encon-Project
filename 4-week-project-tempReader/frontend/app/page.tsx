import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">

      {/* HERO */}

      <section className="bg-[#174a7e] px-6 pb-20 pt-12 text-white">

        <div className="mx-auto max-w-[1400px]">

          <div className="max-w-4xl">

            <p className="mb-4 font-semibold uppercase tracking-widest text-[#5ed0e6]">
              Cold Chain Monitoring
            </p>

            <h1 className="text-5xl font-bold leading-tight md:text-6xl">
              Cold Chain
              <br />
              Operations Portal
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-blue-100">
              A central portal for recording,
              monitoring and managing cold-chain
              temperature readings across branches.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <Link
                href="/manage"
                className="rounded-lg bg-[#159fbd] px-7 py-4 font-bold text-white transition hover:bg-[#1189a3]"
              >
                Manage Readings
              </Link>

              <Link
                href="/readings"
                className="rounded-lg border-2 border-white px-7 py-4 font-bold text-white transition hover:bg-white hover:text-[#174a7e]"
              >
                View Readings
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* ABOUT PORTAL */}

      <section className="px-6 py-16">

        <div className="mx-auto max-w-[1400px]">

          <div className="grid gap-10 lg:grid-cols-2">

            <div>

              <p className="font-semibold uppercase tracking-widest text-[#159fbd]">
                About the portal
              </p>

              <h2 className="mt-3 text-4xl font-bold text-[#174a7e]">
                Monitor temperature readings
                from one place
              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-600">
                This operations portal connects
                directly to the cold-chain backend
                and allows users to create, update,
                delete and retrieve temperature
                readings.
              </p>

              <p className="mt-4 text-lg leading-8 text-gray-600">
                Every reading is given a unique UUID
                by the backend and is automatically
                checked to determine whether the
                recorded temperatures are within the
                permitted cold-chain range.
              </p>

            </div>

            {/* TEMPERATURE RULE */}

            <div className="rounded-2xl bg-white p-8 shadow-md">

              <p className="font-semibold uppercase tracking-widest text-[#159fbd]">
                Temperature rule
              </p>

              <div className="mt-5 flex items-end gap-3">

                <span className="text-6xl font-bold text-[#174a7e]">
                  2°C
                </span>

                <span className="pb-2 text-xl text-gray-500">
                  to
                </span>

                <span className="text-6xl font-bold text-[#174a7e]">
                  8°C
                </span>

              </div>

              <p className="mt-6 leading-7 text-gray-600">
                A reading is considered safe when
                the minimum and maximum temperatures
                remain within the permitted range.
              </p>

              <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-5">

                <p className="font-bold text-red-700">
                  ⚠ Excursion
                </p>

                <p className="mt-2 text-red-700">
                  If the minimum falls below 2°C or
                  the maximum rises above 8°C, the
                  reading is marked as an excursion
                  and an alert is raised.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* HOW TO USE */}

      <section className="bg-white px-6 py-16">

        <div className="mx-auto max-w-[1400px]">

          <div className="text-center">

            <p className="font-semibold uppercase tracking-widest text-[#159fbd]">
              How to use the portal
            </p>

            <h2 className="mt-3 text-4xl font-bold text-[#174a7e]">
              Simple cold-chain management
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600">
              The portal is split into two main
              working areas: managing readings and
              viewing stored data.
            </p>

          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-2xl border border-gray-200 p-7">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#174a7e] text-xl font-bold text-white">
                1
              </div>

              <h3 className="mt-5 text-xl font-bold text-[#174a7e]">
                Log a reading
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Enter the branch, date and time,
                minimum temperature, maximum
                temperature and recorded-by details.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 p-7">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#174a7e] text-xl font-bold text-white">
                2
              </div>

              <h3 className="mt-5 text-xl font-bold text-[#174a7e]">
                Automatic validation
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                The backend validates the request,
                generates the UUID and determines
                whether the reading is OK or an
                excursion.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 p-7">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#174a7e] text-xl font-bold text-white">
                3
              </div>

              <h3 className="mt-5 text-xl font-bold text-[#174a7e]">
                Handle excursions
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Out-of-range readings are clearly
                marked as excursions and trigger
                the alert process.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 p-7">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#174a7e] text-xl font-bold text-white">
                4
              </div>

              <h3 className="mt-5 text-xl font-bold text-[#174a7e]">
                Review the data
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                View all readings for a branch or
                retrieve an individual reading
                using its UUID.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* NAVIGATION CARDS */}

      <section className="px-6 py-16">

        <div className="mx-auto max-w-[1400px]">

          <div className="grid gap-8 md:grid-cols-2">

            <Link
              href="/manage"
              className="group rounded-2xl bg-[#174a7e] p-9 text-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
            >

              <p className="font-semibold uppercase tracking-widest text-[#5ed0e6]">
                Manage
              </p>

              <h2 className="mt-4 text-3xl font-bold">
                Manage Readings
              </h2>

              <p className="mt-4 max-w-xl leading-7 text-blue-100">
                Create new temperature readings,
                edit existing readings and
                permanently remove readings.
              </p>

              <p className="mt-8 font-bold text-[#5ed0e6]">
                Open Manage Readings →
              </p>

            </Link>

            <Link
              href="/readings"
              className="group rounded-2xl bg-white p-9 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
            >

              <p className="font-semibold uppercase tracking-widest text-[#159fbd]">
                View
              </p>

              <h2 className="mt-4 text-3xl font-bold text-[#174a7e]">
                View Readings
              </h2>

              <p className="mt-4 max-w-xl leading-7 text-gray-600">
                View branch readings in a
                database-style table or retrieve
                one individual reading using its
                UUID.
              </p>

              <p className="mt-8 font-bold text-[#159fbd]">
                Open View Readings →
              </p>

            </Link>

          </div>

        </div>

      </section>

      {/* ABOUT ME */}

      <section className="bg-[#eef6fa] px-6 py-16">

        <div className="mx-auto max-w-[1400px]">

          <div className="rounded-2xl bg-white p-10 shadow-sm">

            <div className="max-w-4xl">

              <p className="font-semibold uppercase tracking-widest text-[#159fbd]">
                About the developer
              </p>

              <h2 className="mt-3 text-3xl font-bold text-[#174a7e]">
                Umar Asif Hussain
              </h2>

              <p className="mt-2 text-lg font-semibold text-gray-700">
                Junior Developer at Encon Pharma
              </p>

              <p className="mt-6 text-lg leading-8 text-gray-600">
                This Cold Chain Operations Portal
                is one of the projects I completed
                during my internship at Encon Pharma.
                The project allowed me to apply the
                software development, cloud,
                infrastructure, API and frontend
                skills I developed throughout the
                internship in one complete
                application.
              </p>

              <p className="mt-4 text-lg leading-8 text-gray-600">
                I developed the frontend to work
                with the backend application I had
                already built, allowing users to
                create, edit, delete and retrieve
                real cold-chain temperature
                readings through a clear operations
                portal.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="bg-[#174a7e] px-6 py-8 text-white">

        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-6">

          <div>
            <p className="font-bold">
              Umar Asif Hussain
            </p>

            <p className="mt-1 text-sm text-blue-200">
              Cold Chain Operations Portal
            </p>
          </div>

          <p className="text-sm text-blue-200">
            Developed with: Next.js • TypeScript • Tailwind • TanStack Query
          </p>

        </div>

      </footer>

    </main>
  );
}