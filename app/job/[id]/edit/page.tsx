"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "../../../../utils/supabase/client";

type Job = {
  id: string;
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

export default function EditJobPage() {
  const params = useParams();
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [job, setJob] = useState<Job | null>(null);

  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [workMode, setWorkMode] = useState("");
  const [experienceRequired, setExperienceRequired] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [qualification, setQualification] = useState("");
  const [skills, setSkills] = useState("");
  const [description, setDescription] = useState("");
  const [applicationDeadline, setApplicationDeadline] = useState("");
  const [status, setStatus] = useState("active");

  useEffect(() => {
    async function loadJob() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const jobId = params?.id;

      if (!jobId || typeof jobId !== "string") {
        setMessage("Invalid job.");
        setLoading(false);
        return;
      }

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
          qualification,
          skills,
          description,
          application_deadline,
          status
        `)
        .eq("id", jobId)
        .eq("employer_id", user.id)
        .maybeSingle();

      if (error) {
        console.error(error);
        setMessage(error.message);
        setLoading(false);
        return;
      }

      if (!data) {
        setMessage(
          "Job not found or you do not have permission to edit it."
        );
        setLoading(false);
        return;
      }

      const loadedJob = data as Job;

      setJob(loadedJob);

      setJobTitle(loadedJob.job_title || "");
      setCompanyName(loadedJob.company_name || "");
      setLocation(loadedJob.location || "");
      setJobType(loadedJob.job_type || "");
      setWorkMode(loadedJob.work_mode || "");
      setExperienceRequired(loadedJob.experience_required || "");
      setSalaryRange(loadedJob.salary_range || "");
      setQualification(loadedJob.qualification || "");
      setSkills(loadedJob.skills || "");
      setDescription(loadedJob.description || "");

      setApplicationDeadline(
        loadedJob.application_deadline
          ? loadedJob.application_deadline.substring(0, 10)
          : ""
      );

      setStatus(loadedJob.status || "active");

      setLoading(false);
    }

    loadJob();
  }, [params, router, supabase]);

  async function handleSave() {
    if (!job) return;

    if (!jobTitle.trim()) {
      setMessage("Job title is required.");
      return;
    }

    if (!companyName.trim()) {
      setMessage("Company name is required.");
      return;
    }

    setSaving(true);
    setMessage("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { data: updatedJob, error } = await supabase
      .from("jobs")
      .update({
        job_title: jobTitle.trim(),
        company_name: companyName.trim(),
        location: location.trim() || null,
        job_type: jobType.trim() || null,
        work_mode: workMode.trim() || null,
        experience_required: experienceRequired.trim() || null,
        salary_range: salaryRange.trim() || null,
        qualification: qualification.trim() || null,
        skills: skills.trim() || null,
        description: description.trim() || null,
        application_deadline: applicationDeadline || null,
        status: status,
      })
      .eq("id", job.id)
      .eq("employer_id", user.id)
      .select()
      .single();

    if (error) {
      console.error("UPDATE ERROR:", error);
      setMessage(error.message);
      setSaving(false);
      return;
    }

    console.log("UPDATED JOB:", updatedJob);

    router.push("/my-jobs");
    router.refresh();
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 pt-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gray-600">
            Loading job details...
          </p>
        </div>
      </main>
    );
  }

  if (!job) {
    return (
      <main className="min-h-screen bg-gray-50 pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-6">

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">

            <h1 className="text-2xl font-bold text-gray-900">
              Unable to Edit Job
            </h1>

            <p className="mt-3 text-red-600">
              {message || "Job not found."}
            </p>

            <button
              onClick={() => router.push("/my-jobs")}
              className="mt-6 rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800 transition"
            >
              Back to My Jobs
            </button>

          </div>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">

          <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide">
            Job Provider
          </p>

          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
            Edit Job
          </h1>

          <p className="mt-2 text-gray-600">
            Update the details of your job posting.
          </p>

        </div>

        {/* Error */}
        {message && (
          <div className="mt-6 bg-white border border-red-200 rounded-xl p-5 text-red-700">
            {message}
          </div>
        )}

        {/* Form */}
        <div className="mt-6 bg-white rounded-2xl border border-gray-200 shadow-sm p-8">

          <div className="grid md:grid-cols-2 gap-6">

            {/* Job Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700">
                Job Title *
              </label>

              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                placeholder="e.g. Finance Manager"
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Company Name *
              </label>

              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                placeholder="Company name"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Location
              </label>

              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                placeholder="e.g. Chandigarh"
              />
            </div>

            {/* Job Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Job Type
              </label>

              <input
                type="text"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                placeholder="e.g. Full-time"
              />
            </div>

            {/* Work Mode */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Work Mode
              </label>

              <input
                type="text"
                value={workMode}
                onChange={(e) => setWorkMode(e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                placeholder="e.g. On-site / Remote / Hybrid"
              />
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Experience Required
              </label>

              <input
                type="text"
                value={experienceRequired}
                onChange={(e) => setExperienceRequired(e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                placeholder="e.g. 3-5 years"
              />
            </div>

            {/* Salary */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Salary Range
              </label>

              <input
                type="text"
                value={salaryRange}
                onChange={(e) => setSalaryRange(e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                placeholder="e.g. ₹8,00,000 - ₹12,00,000"
              />
            </div>

            {/* Qualification */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Qualification
              </label>

              <input
                type="text"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                placeholder="e.g. CA / MBA / Graduate"
              />
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Application Deadline
              </label>

              <input
                type="date"
                value={applicationDeadline}
                onChange={(e) =>
                  setApplicationDeadline(e.target.value)
                }
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Status
              </label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-600"
              >
                <option value="active">Active</option>
                <option value="closed">Closed</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            {/* Skills */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700">
                Skills Required
              </label>

              <textarea
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                rows={4}
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                placeholder="Enter required skills"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700">
                Job Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={8}
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                placeholder="Describe the role, responsibilities and requirements"
              />
            </div>

          </div>

          {/* Buttons */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap gap-4">

            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800 transition disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

            <button
              onClick={() => router.push("/my-jobs")}
              disabled={saving}
              className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>

          </div>

        </div>

      </div>
    </main>
  );
}