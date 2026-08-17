"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../utils/supabase/client";

type Application = {
  id: string;
  job_id: string;
  status: string | null;
  created_at: string;

  job: {
    job_title: string;
    company_name: string;
    location: string | null;
    job_type: string | null;
    work_mode: string | null;
  } | null;
};

export default function MyApplicationsPage() {
  const router = useRouter();
  const supabase = createClient();

  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadApplications() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("job_applications")
        .select(`
          id,
          job_id,
          status,
          created_at,
          job:jobs (
            job_title,
            company_name,
            location,
            job_type,
            work_mode
          )
        `)
        .eq("job_seeker_id", user.id)
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error(error);
        setMessage(error.message);
      } else {
        setApplications((data || []) as unknown as Application[]);
      }

      setLoading(false);
    }

    loadApplications();
  }, [router, supabase]);

  function getStatusClass(status: string | null) {
    if (status === "shortlisted") {
      return "bg-green-100 text-green-700";
    }

    if (status === "rejected") {
      return "bg-red-100 text-red-700";
    }

    return "bg-blue-100 text-blue-700";
  }

  function getStatusText(status: string | null) {
    if (status === "shortlisted") {
      return "Shortlisted";
    }

    if (status === "rejected") {
      return "Rejected";
    }

    return "Applied";
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 pt-28">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-gray-600">
            Loading your applications...
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
                Job Seeker
              </p>

              <h1 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
                My Applications
              </h1>

              <p className="mt-2 text-gray-600">
                Track the status of jobs you have applied for.
              </p>
            </div>

            <button
              onClick={() => router.push("/account")}
              className="rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-700 hover:bg-white transition"
            >
              ← My Account
            </button>

          </div>

        </div>

        {/* Error */}
        {message && (
          <div className="mt-6 bg-white border border-red-200 rounded-xl p-5 text-red-700">
            {message}
          </div>
        )}

        {/* No Applications */}
        {!message && applications.length === 0 && (
          <div className="mt-8 bg-white rounded-2xl border border-gray-200 shadow-sm p-12 text-center">

            <h2 className="text-2xl font-bold text-gray-900">
              No Applications Yet
            </h2>

            <p className="mt-3 text-gray-600">
              You haven't applied for any jobs yet.
            </p>

            <button
              onClick={() => router.push("/find-jobs")}
              className="mt-6 rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800 transition"
            >
              Find Jobs
            </button>

          </div>
        )}

        {/* Applications */}
        <div className="mt-8 space-y-6">

          {applications.map((application) => (

            <div
              key={application.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8"
            >

              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">

                <div>

                  <h2 className="text-2xl font-bold text-gray-900">
                    {application.job?.job_title || "Job"}
                  </h2>

                  <p className="mt-2 text-lg text-gray-600">
                    {application.job?.company_name || "Company"}
                  </p>

                </div>

                <span
                  className={`inline-flex w-fit rounded-full px-4 py-2 text-sm font-semibold ${getStatusClass(
                    application.status
                  )}`}
                >
                  {getStatusText(application.status)}
                </span>

              </div>

              {/* Job Information */}
              <div className="mt-6 grid md:grid-cols-2 gap-6 border-t border-gray-100 pt-6">

                {application.job?.location && (
                  <div>
                    <p className="text-sm text-gray-500">
                      Location
                    </p>

                    <p className="mt-1 font-semibold text-gray-900">
                      {application.job.location}
                    </p>
                  </div>
                )}

                {application.job?.job_type && (
                  <div>
                    <p className="text-sm text-gray-500">
                      Job Type
                    </p>

                    <p className="mt-1 font-semibold text-gray-900">
                      {application.job.job_type}
                    </p>
                  </div>
                )}

                {application.job?.work_mode && (
                  <div>
                    <p className="text-sm text-gray-500">
                      Work Mode
                    </p>

                    <p className="mt-1 font-semibold text-gray-900">
                      {application.job.work_mode}
                    </p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-gray-500">
                    Applied On
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {new Date(
                      application.created_at
                    ).toLocaleDateString("en-IN")}
                  </p>
                </div>

              </div>

              {/* Status Message */}
              <div className="mt-6 pt-6 border-t border-gray-100">

                {application.status === "shortlisted" && (
                  <p className="text-green-700 font-semibold">
                    Congratulations! You have been shortlisted for this position.
                  </p>
                )}

                {application.status === "rejected" && (
                  <p className="text-red-700 font-semibold">
                    Your application was not selected for this position.
                  </p>
                )}

                {(!application.status ||
                  application.status === "applied") && (
                  <p className="text-blue-700 font-semibold">
                    Your application has been received and is under review.
                  </p>
                )}

              </div>

              {/* View Job */}
              <div className="mt-6">

                <button
                  onClick={() =>
                    router.push(`/jobs/${application.job_id}`)
                  }
                  className="rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                  View Job
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </main>
  );
}