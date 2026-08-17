"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../utils/supabase/client";

export default function PostJobPage() {
  const router = useRouter();
  const supabase = createClient();

  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    job_title: "",
    company_name: "",
    location: "",
    job_type: "Full-time",
    work_mode: "On-site",
    experience_required: "",
    salary_range: "",
    qualification: "",
    skills: "",
    description: "",
    application_deadline: "",
  });

  useEffect(() => {
    async function loadEmployer() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const role = user.user_metadata?.role;

      if (role !== "employer") {
        router.push("/account");
        return;
      }

      setUserId(user.id);

      const { data: employer, error } = await supabase
        .from("employer_profiles")
        .select("company_name")
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        console.error(error);
      }

      if (employer?.company_name) {
        setForm((current) => ({
          ...current,
          company_name: employer.company_name,
        }));
      }

      setLoading(false);
    }

    loadEmployer();
  }, [router, supabase]);

  function handleChange(
    field: keyof typeof form,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!form.job_title.trim()) {
      setMessage("Please enter the job title.");
      return;
    }

    if (!form.company_name.trim()) {
      setMessage("Please enter the company name.");
      return;
    }

    if (!form.description.trim()) {
      setMessage("Please enter the job description.");
      return;
    }

    setSaving(true);
    setMessage("");

    const { error } = await supabase
      .from("jobs")
      .insert({
        employer_id: userId,
        job_title: form.job_title.trim(),
        company_name: form.company_name.trim(),
        location: form.location.trim(),
        job_type: form.job_type,
        work_mode: form.work_mode,
        experience_required:
          form.experience_required.trim(),
        salary_range: form.salary_range.trim(),
        qualification: form.qualification.trim(),
        skills: form.skills.trim(),
        description: form.description.trim(),
        application_deadline:
          form.application_deadline || null,
        status: "active",
      });

    if (error) {
      console.error(error);
      setMessage(error.message);
      setSaving(false);
      return;
    }

    setMessage("Job posted successfully.");

    setSaving(false);

    setTimeout(() => {
      router.push("/account");
    }, 1200);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 pt-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-gray-600">
            Loading job posting form...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-28 pb-16">
      <div className="max-w-3xl mx-auto px-6">

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">

          <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide">
            Job Provider
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Post a Job
          </h1>

          <p className="mt-2 text-gray-600">
            Share your job requirement with qualified professionals.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >

            {/* Job Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Job Title *
              </label>

              <input
                type="text"
                value={form.job_title}
                onChange={(e) =>
                  handleChange("job_title", e.target.value)
                }
                placeholder="Finance Manager"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                required
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company / Organisation *
              </label>

              <input
                type="text"
                value={form.company_name}
                onChange={(e) =>
                  handleChange("company_name", e.target.value)
                }
                placeholder="ABC Private Limited"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>

              <input
                type="text"
                value={form.location}
                onChange={(e) =>
                  handleChange("location", e.target.value)
                }
                placeholder="Chandigarh / Delhi / Remote"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            {/* Job Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Job Type
              </label>

              <select
                value={form.job_type}
                onChange={(e) =>
                  handleChange("job_type", e.target.value)
                }
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Internship</option>
              </select>
            </div>

            {/* Work Mode */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Work Mode
              </label>

              <select
                value={form.work_mode}
                onChange={(e) =>
                  handleChange("work_mode", e.target.value)
                }
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
              >
                <option>On-site</option>
                <option>Hybrid</option>
                <option>Remote</option>
              </select>
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Experience Required
              </label>

              <input
                type="text"
                value={form.experience_required}
                onChange={(e) =>
                  handleChange(
                    "experience_required",
                    e.target.value
                  )
                }
                placeholder="3-5 years"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            {/* Salary */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Salary Range
              </label>

              <input
                type="text"
                value={form.salary_range}
                onChange={(e) =>
                  handleChange("salary_range", e.target.value)
                }
                placeholder="₹8,00,000 - ₹12,00,000 per annum"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            {/* Qualification */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Required Qualification
              </label>

              <input
                type="text"
                value={form.qualification}
                onChange={(e) =>
                  handleChange("qualification", e.target.value)
                }
                placeholder="CA / MBA / B.Com / Any Graduate"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Required Skills
              </label>

              <input
                type="text"
                value={form.skills}
                onChange={(e) =>
                  handleChange("skills", e.target.value)
                }
                placeholder="Excel, GST, Financial Reporting, SAP"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Job Description *
              </label>

              <textarea
                value={form.description}
                onChange={(e) =>
                  handleChange("description", e.target.value)
                }
                rows={7}
                placeholder="Describe the role, responsibilities and requirements..."
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                required
              />
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Application Deadline
              </label>

              <input
                type="date"
                value={form.application_deadline}
                onChange={(e) =>
                  handleChange(
                    "application_deadline",
                    e.target.value
                  )
                }
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800 disabled:opacity-50 transition"
            >
              {saving ? "Posting Job..." : "Post Job"}
            </button>

          </form>

          {message && (
            <div className="mt-6 rounded-lg bg-gray-50 border border-gray-200 p-4 text-sm text-gray-700">
              {message}
            </div>
          )}

          <button
            type="button"
            onClick={() => router.push("/account")}
            className="mt-6 text-blue-700 font-semibold hover:underline"
          >
            ← Back to Account
          </button>

        </div>

      </div>
    </main>
  );
}