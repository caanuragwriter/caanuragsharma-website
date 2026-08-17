"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../utils/supabase/client";

export default function EmployerProfilePage() {
  const router = useRouter();
  const supabase = createClient();

  const [userId, setUserId] = useState("");

  const [form, setForm] = useState({
    company_name: "",
    contact_person: "",
    email: "",
    phone: "",
    website: "",
    location: "",
    industry: "",
    company_description: "",
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

      const { data, error } = await supabase
        .from("employer_profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        console.error(error);
        setMessage("Unable to load employer profile.");
      }

      if (data) {
        setForm({
          company_name: data.company_name || "",
          contact_person: data.contact_person || "",
          email: data.email || user.email || "",
          phone: data.phone || "",
          website: data.website || "",
          location: data.location || "",
          industry: data.industry || "",
          company_description: data.company_description || "",
        });
      } else {
        setForm((current) => ({
          ...current,
          email: user.email || "",
        }));
      }

      setLoading(false);
    }

    loadProfile();
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

    if (!form.company_name.trim()) {
      setMessage("Please enter your company name.");
      return;
    }

    setSaving(true);
    setMessage("");

    const { error } = await supabase
      .from("employer_profiles")
      .upsert({
        id: userId,
        company_name: form.company_name.trim(),
        contact_person: form.contact_person.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        website: form.website.trim(),
        location: form.location.trim(),
        industry: form.industry.trim(),
        company_description:
          form.company_description.trim(),
        updated_at: new Date().toISOString(),
      });

    if (error) {
      console.error(error);
      setMessage(error.message);
      setSaving(false);
      return;
    }

    setMessage("Employer profile saved successfully.");
    setSaving(false);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 pt-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-gray-600">
            Loading employer profile...
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
            Employer Profile
          </h1>

          <p className="mt-2 text-gray-600">
            Add your organisation details before posting jobs.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >

            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company / Organisation Name *
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

            {/* Contact Person */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact Person
              </label>

              <input
                type="text"
                value={form.contact_person}
                onChange={(e) =>
                  handleChange("contact_person", e.target.value)
                }
                placeholder="Your name"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Business Email
              </label>

              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  handleChange("email", e.target.value)
                }
                placeholder="hr@company.com"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>

              <input
                type="tel"
                value={form.phone}
                onChange={(e) =>
                  handleChange("phone", e.target.value)
                }
                placeholder="+91 XXXXX XXXXX"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            {/* Website */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Website
              </label>

              <input
                type="url"
                value={form.website}
                onChange={(e) =>
                  handleChange("website", e.target.value)
                }
                placeholder="https://www.company.com"
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
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

            {/* Industry */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Industry
              </label>

              <input
                type="text"
                value={form.industry}
                onChange={(e) =>
                  handleChange("industry", e.target.value)
                }
                placeholder="Finance, IT, Manufacturing..."
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company Description
              </label>

              <textarea
                value={form.company_description}
                onChange={(e) =>
                  handleChange(
                    "company_description",
                    e.target.value
                  )
                }
                rows={5}
                placeholder="Tell job seekers about your organisation..."
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            {/* Save */}
            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800 disabled:opacity-50 transition"
            >
              {saving
                ? "Saving..."
                : "Save Employer Profile"}
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