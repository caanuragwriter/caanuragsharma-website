"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../utils/supabase/client";

type Applicant = {
  id: string;
  job_id: string;
  job_seeker_id: string;
  status: string | null;
  created_at: string;

  job: {
    job_title: string;
    company_name: string;
  } | null;

  profile: {
    full_name: string | null;
    phone: string | null;
    location: string | null;
    headline: string | null;
    qualification: string | null;
    experience_years: number | null;
    skills: string | null;
    resume_path: string | null;
  } | null;
};

export default function ApplicantsPage() {
  const router = useRouter();
  const supabase = createClient();

  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // View Resume
  async function handleViewResume(resumePath: string | null) {
    if (!resumePath) {
      setMessage("Resume is not available.");
      return;
    }

    const { data, error } = await supabase.storage
      .from("resumes")
      .createSignedUrl(resumePath, 60 * 5);

    if (error) {
      console.error(error);
      setMessage("Unable to open resume.");
      return;
    }

    window.open(data.signedUrl, "_blank");
  }

  // Update Application Status
  async function updateApplicationStatus(
    applicationId: string,
    newStatus: "shortlisted" | "rejected"
  ) {
    setMessage("");

    const { error } = await supabase
      .from("job_applications")
      .update({
        status: newStatus,
      })
      .eq("id", applicationId);

    if (error) {
      console.error(error);
      setMessage("Unable to update application status.");
      return;
    }

    setApplicants((current) =>
      current.map((application) =>
        application.id === applicationId
          ? {
              ...application,
              status: newStatus,
            }
          : application
      )
    );
  }

  // Load Applicants
  useEffect(() => {
    async function loadApplicants() {
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
          job_seeker_id,
          status,
          created_at,
          job:jobs!inner (
            job_title,
            company_name
          ),
          profile:job_seeker_profiles!inner (
            full_name,
            phone,
            location,
            headline,
            qualification,
            experience_years,
            skills,
            resume_path
          )
        `)
        .eq("job.employer_id", user.id)
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error(error);
        setMessage(error.message);
      } else {
        setApplicants((data || []) as unknown as Applicant[]);
      }

      setLoading(false);
    }

    loadApplicants();
  }, [router, supabase]);

  // Loading
  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 pt-28">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-gray-600">
            Loading applicants...
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

              <h1 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
                Applicants
              </h1>

              <p className="mt-2 text-gray-600">
                Review candidates who have applied for your jobs.
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

        {/* Message */}
        {message && (
          <div className="mt-6 bg-white border border-red-200 rounded-xl p-5 text-red-700">
            {message}
          </div>
        )}

        {/* No Applicants */}
        {!message && applicants.length === 0 && (
          <div className="mt-8 bg-white rounded-2xl border border-gray-200 shadow-sm p-12 text-center">

            <h2 className="text-2xl font-bold text-gray-900">
              No Applicants Yet
            </h2>

            <p className="mt-3 text-gray-600">
              You haven't received any applications for your jobs yet.
            </p>

            <button
              onClick={() => router.push("/my-jobs")}
              className="mt-6 rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800 transition"
            >
              View My Jobs
            </button>

          </div>
        )}

        {/* Applicants */}
        <div className="mt-8 space-y-6">

          {applicants.map((application) => (

            <div
              key={application.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8"
            >

              {/* Applicant Header */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">

                <div>

                  <h2 className="text-2xl font-bold text-gray-900">
                    {application.profile?.full_name || "Applicant"}
                  </h2>

                  {application.profile?.headline && (
                    <p className="mt-1 text-gray-600">
                      {application.profile.headline}
                    </p>
                  )}

                  <p className="mt-3 text-sm text-gray-500">
                    Applied for:
                  </p>

                  <p className="font-semibold text-blue-700">
                    {application.job?.job_title}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    {application.job?.company_name}
                  </p>

                </div>

                {/* Status */}
                <span
                  className={`inline-flex w-fit rounded-full px-4 py-2 text-sm font-semibold ${
                    application.status === "applied"
                      ? "bg-blue-100 text-blue-700"
                      : application.status === "shortlisted"
                      ? "bg-green-100 text-green-700"
                      : application.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {application.status || "applied"}
                </span>

              </div>

              {/* Applicant Information */}
              <div className="mt-6 grid md:grid-cols-2 gap-6 border-t border-gray-100 pt-6">

                {application.profile?.phone && (
                  <div>
                    <p className="text-sm text-gray-500">
                      Phone
                    </p>

                    <p className="mt-1 font-semibold text-gray-900">
                      {application.profile.phone}
                    </p>
                  </div>
                )}

                {application.profile?.location && (
                  <div>
                    <p className="text-sm text-gray-500">
                      Location
                    </p>

                    <p className="mt-1 font-semibold text-gray-900">
                      {application.profile.location}
                    </p>
                  </div>
                )}

                {application.profile?.qualification && (
                  <div>
                    <p className="text-sm text-gray-500">
                      Qualification
                    </p>

                    <p className="mt-1 font-semibold text-gray-900">
                      {application.profile.qualification}
                    </p>
                  </div>
                )}

                {application.profile?.experience_years !== null &&
                  application.profile?.experience_years !== undefined && (
                    <div>
                      <p className="text-sm text-gray-500">
                        Experience
                      </p>

                      <p className="mt-1 font-semibold text-gray-900">
                        {application.profile.experience_years} years
                      </p>
                    </div>
                  )}

              </div>

              {/* Skills */}
              {application.profile?.skills && (
                <div className="mt-6">

                  <p className="text-sm text-gray-500">
                    Skills
                  </p>

                  <p className="mt-2 text-gray-700 leading-7">
                    {application.profile.skills}
                  </p>

                </div>
              )}

              {/* Footer / Actions */}
              <div className="mt-6 pt-6 border-t border-gray-100 flex flex-wrap items-center gap-4">

                <p className="text-sm text-gray-500">
                  Applied on{" "}
                  {new Date(
                    application.created_at
                  ).toLocaleDateString("en-IN")}
                </p>

                {/* View Resume */}
                {application.profile?.resume_path && (
                  <button
                    onClick={() =>
                      handleViewResume(
                        application.profile?.resume_path || null
                      )
                    }
                    className="rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800 transition"
                  >
                    View Resume
                  </button>
                )}

                {/* Shortlist */}
                {application.status !== "shortlisted" && (
                  <button
                    onClick={() =>
                      updateApplicationStatus(
                        application.id,
                        "shortlisted"
                      )
                    }
                    className="rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700 transition"
                  >
                    Shortlist
                  </button>
                )}

                {/* Reject */}
                {application.status !== "rejected" && (
                  <button
                    onClick={() =>
                      updateApplicationStatus(
                        application.id,
                        "rejected"
                      )
                    }
                    className="rounded-lg bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700 transition"
                  >
                    Reject
                  </button>
                )}

              </div>

            </div>

          ))}

        </div>

      </div>
    </main>
  );
}