"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "../../../utils/supabase/client";

type Job = {
  id: string;
  employer_id: string;
  job_title: string;
  company_name: string;
  location: string | null;
  job_type: string | null;
  work_mode: string | null;
  experience_required: string | null;
  salary_range: string | null;
  qualification: string | null;
  skills: string | null;
  description: string | null;
  application_deadline: string | null;
  status: string | null;
};

export default function JobDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const supabase = createClient();

  const jobId = params.id as string;

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function loadJob() {
      if (!jobId) return;

      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", jobId)
        .eq("status", "active")
        .single();

      if (error) {
        console.error(error);
        setMessage("This job is no longer available.");
      } else {
        setJob(data as Job);
      }

      setLoading(false);
    }

    loadJob();
  }, [jobId, supabase]);

  async function handleApply() {
    setMessage("");
    setSuccess("");
    setApplying(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // User is not logged in
    if (!user) {
      router.push(`/login?redirect=/job/${jobId}`);
      return;
    }

    // Check whether already applied
    const { data: existingApplication, error: existingError } =
      await supabase
        .from("job_applications")
        .select("id")
        .eq("job_id", jobId)
        .eq("job_seeker_id", user.id)
        .maybeSingle();

    if (existingError) {
      console.error(existingError);
      setMessage("Unable to check your application.");
      setApplying(false);
      return;
    }

    if (existingApplication) {
      setMessage("You have already applied for this job.");
      setApplying(false);
      return;
    }

    // Submit application
    const { error } = await supabase
      .from("job_applications")
      .insert({
        job_id: jobId,
        job_seeker_id: user.id,
        status: "applied",
      });

    if (error) {
      console.error(error);
      setMessage(error.message);
      setApplying(false);
      return;
    }

    setSuccess("Your application has been submitted successfully.");
    setApplying(false);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 pt-28">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-gray-600">Loading job...</p>
        </div>
      </main>
    );
  }

  if (!job) {
    return (
      <main className="min-h-screen bg-gray-50 pt-28 pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Job Not Found
            </h1>

            <p className="mt-3 text-gray-600">
              This job may have been closed or removed.
            </p>

            <button
              onClick={() => router.push("/find-jobs")}
              className="mt-6 rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800"
            >
              ← Back to Jobs
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-28 pb-16">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide">
            Careers
          </p>

          <div className="mt-3 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                {job.job_title}
              </h1>

              <p className="mt-3 text-xl font-semibold text-blue-700">
                {job.company_name}
              </p>
            </div>

            <span className="inline-flex w-fit rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
              Active
            </span>
          </div>
        </div>

        {/* Job Details */}
        <div className="mt-6 bg-white rounded-2xl border border-gray-200 shadow-sm p-8">

          <div className="grid md:grid-cols-2 gap-6">

            {job.location && (
              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Location
                </p>
                <p className="mt-1 font-semibold text-gray-900">
                  {job.location}
                </p>
              </div>
            )}

            {job.job_type && (
              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Job Type
                </p>
                <p className="mt-1 font-semibold text-gray-900">
                  {job.job_type}
                </p>
              </div>
            )}

            {job.work_mode && (
              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Work Mode
                </p>
                <p className="mt-1 font-semibold text-gray-900">
                  {job.work_mode}
                </p>
              </div>
            )}

            {job.experience_required && (
              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Experience
                </p>
                <p className="mt-1 font-semibold text-gray-900">
                  {job.experience_required}
                </p>
              </div>
            )}

            {job.salary_range && (
              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Salary
                </p>
                <p className="mt-1 font-semibold text-gray-900">
                  {job.salary_range}
                </p>
              </div>
            )}

            {job.qualification && (
              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Qualification
                </p>
                <p className="mt-1 font-semibold text-gray-900">
                  {job.qualification}
                </p>
              </div>
            )}

            {job.application_deadline && (
              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Application Deadline
                </p>
                <p className="mt-1 font-semibold text-gray-900">
                  {new Date(
                    job.application_deadline
                  ).toLocaleDateString("en-IN")}
                </p>
              </div>
            )}

          </div>

          {/* Skills */}
          {job.skills && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">
                Skills
              </h2>

              <p className="mt-3 text-gray-600 leading-7">
                {job.skills}
              </p>
            </div>
          )}

          {/* Description */}
          {job.description && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">
                Job Description
              </h2>

              <p className="mt-3 text-gray-600 whitespace-pre-line leading-7">
                {job.description}
              </p>
            </div>
          )}

          {/* Messages */}
          {message && (
            <div className="mt-8 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
              {message}
            </div>
          )}

          {success && (
            <div className="mt-8 rounded-lg border border-green-200 bg-green-50 p-4 text-green-700">
              {success}
            </div>
          )}

          {/* Actions */}
          <div className="mt-8 pt-8 border-t border-gray-200 flex flex-wrap gap-3">

            <button
              onClick={() => router.push("/find-jobs")}
              className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
            >
              ← Back to Jobs
            </button>

            <button
              onClick={handleApply}
              disabled={applying || !!success}
              className="rounded-lg bg-blue-700 px-7 py-3 font-semibold text-white hover:bg-blue-800 disabled:bg-gray-400"
            >
              {applying
                ? "Applying..."
                : success
                ? "Application Submitted"
                : "Apply Now"}
            </button>

          </div>

        </div>

      </div>
    </main>
  );
}