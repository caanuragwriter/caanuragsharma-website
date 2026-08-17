"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../utils/supabase/client";
const supabase = createClient();

type Job = {
  id: string;
  job_title: string;
  company_name: string;
  location: string | null;
  job_type: string | null;
  work_mode: string | null;
  experience_required: string | null;
  salary_range: string | null;
  application_deadline: string | null;
  status: string | null;
  created_at: string;
};

export default function MyJobsPage() {
  const router = useRouter();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadJobs() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }
      console.log("LOGGED IN USER ID:", user.id);
console.log("JOB EMPLOYER ID SHOULD BE:", "55829481-59ca-455c-afb7-285d549c07e7");

      const { data, error } = await supabase
        .from("jobs")
        .select(`
          id,
          job_title,
          company_name,
          location,
          job_type,
          work_mode,
          experience_required,
          salary_range,
          application_deadline,
          status,
          created_at
        `)
        .eq("employer_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
  console.error("MY JOBS ERROR:", error);
  setMessage(error.message);
} else {
  console.log("MY JOBS USER ID:", user.id);
  console.log("MY JOBS DATA:", data);
  console.log("MY JOBS COUNT:", data?.length);

  setJobs(data || []);
}

      setLoading(false);
    }

    loadJobs();
  }, [router, supabase]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 pt-28">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-gray-600">
            Loading your jobs...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-28 pb-16">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>
              <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide">
                Job Provider
              </p>

              <h1 className="mt-2 text-3xl font-bold text-gray-900">
                My Jobs
              </h1>

              <p className="mt-2 text-gray-600">
                View and manage jobs posted by your company.
              </p>
            </div>

            <button
              onClick={() => router.push("/post-job")}
              className="rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800 transition"
            >
              + Post a Job
            </button>

          </div>

        </div>

        {/* Error */}
        {message && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {message}
          </div>
        )}

        {/* No Jobs */}
        {!message && jobs.length === 0 && (
          <div className="mt-8 bg-white rounded-2xl border border-gray-200 shadow-sm p-10 text-center">

            <h2 className="text-xl font-bold text-gray-900">
              No Jobs Posted Yet
            </h2>

            <p className="mt-3 text-gray-600">
              You haven't posted any jobs yet.
            </p>

            <button
              onClick={() => router.push("/post-job")}
              className="mt-6 rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800 transition"
            >
              Post Your First Job
            </button>

          </div>
        )}

        {/* Jobs */}
        <div className="mt-8 space-y-6">

          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8"
            >

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {job.job_title}
                  </h2>

                  <p className="mt-2 text-gray-600">
                    {job.company_name}
                  </p>
                </div>

                <span
                  className={`inline-flex w-fit rounded-full px-3 py-1 text-sm font-semibold ${
                    job.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {job.status || "active"}
                </span>

              </div>

              <div className="mt-6 grid md:grid-cols-2 gap-4 text-sm">

                {job.location && (
                  <div>
                    <span className="font-semibold text-gray-700">
                      Location:
                    </span>{" "}
                    <span className="text-gray-600">
                      {job.location}
                    </span>
                  </div>
                )}

                {job.job_type && (
                  <div>
                    <span className="font-semibold text-gray-700">
                      Job Type:
                    </span>{" "}
                    <span className="text-gray-600">
                      {job.job_type}
                    </span>
                  </div>
                )}

                {job.work_mode && (
                  <div>
                    <span className="font-semibold text-gray-700">
                      Work Mode:
                    </span>{" "}
                    <span className="text-gray-600">
                      {job.work_mode}
                    </span>
                  </div>
                )}

                {job.experience_required && (
                  <div>
                    <span className="font-semibold text-gray-700">
                      Experience:
                    </span>{" "}
                    <span className="text-gray-600">
                      {job.experience_required}
                    </span>
                  </div>
                )}

                {job.salary_range && (
                  <div>
                    <span className="font-semibold text-gray-700">
                      Salary:
                    </span>{" "}
                    <span className="text-gray-600">
                      {job.salary_range}
                    </span>
                  </div>
                )}

                {job.application_deadline && (
                  <div>
                    <span className="font-semibold text-gray-700">
                      Application Deadline:
                    </span>{" "}
                    <span className="text-gray-600">
                      {new Date(
                        job.application_deadline
                      ).toLocaleDateString("en-IN")}
                    </span>
                  </div>
                )}

              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 flex flex-wrap gap-3">

                <button
  onClick={() => router.push(`/job/${job.id}`)}
  className="rounded-lg border border-gray-300 px-5 py-2.5 font-semibold text-gray-700 hover:bg-gray-50 transition"
>
  View Job
</button>

                <button
  onClick={() => router.push(`/job/${job.id}/edit`)}
  className="rounded-lg bg-blue-700 px-5 py-2.5 font-semibold text-white hover:bg-blue-800 transition"
>
  Edit
</button>

               <button
  onClick={() => router.push("/applicants")}
  className="rounded-lg bg-blue-700 px-5 py-2.5 font-semibold text-white hover:bg-blue-800 transition"
>
  Applicants
</button>

              </div>

            </div>
          ))}

        </div>

        {/* Back */}
        <button
          onClick={() => router.push("/account")}
          className="mt-8 text-blue-700 font-semibold hover:underline"
        >
          ← Back to Account
        </button>

      </div>
    </main>
  );
}