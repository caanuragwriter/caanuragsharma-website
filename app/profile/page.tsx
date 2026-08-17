"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../utils/supabase/client";

export default function ProfilePage() {
  const router = useRouter();
  const supabase = createClient();

  const [userId, setUserId] = useState("");

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    location: "",
    headline: "",
    qualification: "",
    experience_years: "",
    skills: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      setUserId(user.id);

      const { data: profile, error } = await supabase
        .from("job_seeker_profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        console.error(error);
        setMessage("Unable to load your profile.");
      }

      if (profile) {
        setForm({
          full_name: profile.full_name || "",
          phone: profile.phone || "",
          location: profile.location || "",
          headline: profile.headline || "",
          qualification: profile.qualification || "",
          experience_years:
            profile.experience_years?.toString() || "",
          skills: profile.skills || "",
        });
      }

      setLoading(false);
    }

    loadProfile();
  }, [router, supabase]);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setSaving(true);
    setMessage("");

    const { error } = await supabase
      .from("job_seeker_profiles")
      .upsert({
        id: userId,
        full_name: form.full_name,
        phone: form.phone,
        location: form.location,
        headline: form.headline,
        qualification: form.qualification,
        experience_years: form.experience_years
          ? Number(form.experience_years)
          : null,
        skills: form.skills,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      console.error(error);
      setMessage(error.message);
    } else {
      setMessage("Profile saved successfully.");
    }

    setSaving(false);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 pt-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-gray-600">
            Loading profile...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-28 pb-16">
      <div className="max-w-3xl mx-auto px-6">

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">

          <div className="mb-8">
            <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide">
              Job Seeker
            </p>

            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              Professional Profile
            </h1>

            <p className="mt-2 text-gray-600">
              Complete your professional profile to improve your
              job opportunities.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>

              <input
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                required
                placeholder="Your full name"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Your phone number"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>

              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Chandigarh, Delhi, Mumbai..."
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Professional Headline
              </label>

              <input
                name="headline"
                value={form.headline}
                onChange={handleChange}
                placeholder="Finance Manager | CA | IFRS | GST"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Qualification
              </label>

              <input
                name="qualification"
                value={form.qualification}
                onChange={handleChange}
                placeholder="CA, MBA, B.Com, etc."
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Years of Experience
              </label>

              <input
                type="number"
                min="0"
                name="experience_years"
                value={form.experience_years}
                onChange={handleChange}
                placeholder="5"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Skills
              </label>

              <textarea
                name="skills"
                value={form.skills}
                onChange={handleChange}
                rows={4}
                placeholder="GST, Income Tax, IFRS, Excel, Financial Reporting..."
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3"
              />
            </div>

            {message && (
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Profile"}
            </button>

          </form>
        </div>

      </div>
    </main>
  );
}