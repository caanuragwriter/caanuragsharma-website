"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../utils/supabase/client";

type UserData = {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    role?: string;
  };
};

export default function AccountPage() {
  const router = useRouter();
  const supabase = createClient();

  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      setUser(user);
      setLoading(false);
    }

    loadUser();
  }, [router, supabase]);

  async function handleLogout() {
    if (loggingOut) return;

    setLoggingOut(true);
    setErrorMessage("");

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error);
      setErrorMessage(
        "Unable to logout. Please try again."
      );
      setLoggingOut(false);
      return;
    }

    // Force a complete navigation so the Supabase session
    // is cleared before the login page loads.
    window.location.href = "/login";
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 pt-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gray-600">
            Loading your account...
          </p>
        </div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  const name =
    user.user_metadata?.full_name || "User";

  const role =
    user.user_metadata?.role || "job_seeker";

  const isEmployer = role === "employer";

  return (
    <main className="min-h-screen bg-gray-50 pt-28 pb-16">
      <div className="max-w-5xl mx-auto px-6">

        {/* =========================
            ACCOUNT HEADER
        ========================== */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>
              <p className="text-sm text-blue-700 font-semibold uppercase tracking-wide">
                My Account
              </p>

              <h1 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
                Welcome, {name}
              </h1>

              <p className="mt-2 text-gray-600">
                {user.email}
              </p>
            </div>

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loggingOut ? "Logging out..." : "Logout"}
            </button>

          </div>

          {errorMessage && (
            <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {errorMessage}
            </div>
          )}

        </div>


        {/* =========================
            ACCOUNT TYPE
        ========================== */}

        <div className="mt-8">

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">

            <p className="text-sm text-gray-500">
              Account Type
            </p>

            <h2 className="mt-2 text-2xl font-bold text-blue-700">
              {isEmployer
                ? "Employer / Job Provider"
                : "Job Seeker"}
            </h2>

            <p className="mt-3 text-gray-600">
              {isEmployer
                ? "Manage your company profile, post job opportunities and review applicants."
                : "Create your professional profile, upload your resume and apply for suitable jobs."}
            </p>

          </div>

        </div>


        {/* ==================================================
            EMPLOYER DASHBOARD
        =================================================== */}

        {isEmployer ? (

          <div className="mt-8 grid md:grid-cols-2 gap-6">

            {/* EMPLOYER PROFILE */}

            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">

              <h3 className="text-xl font-bold text-gray-900">
                Employer Profile
              </h3>

              <p className="mt-3 text-gray-600">
                Add or update your company details before posting jobs.
              </p>

              <button
                onClick={() =>
                  router.push("/employer-profile")
                }
                className="mt-6 rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800 transition"
              >
                Manage Company Profile
              </button>

            </div>


            {/* POST A JOB */}

            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">

              <h3 className="text-xl font-bold text-gray-900">
                Post a Job
              </h3>

              <p className="mt-3 text-gray-600">
                Publish your company's requirements and find suitable
                candidates.
              </p>

              <button
                onClick={() =>
                  router.push("/post-job")
                }
                className="mt-6 rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800 transition"
              >
                Post a Job
              </button>

            </div>


            {/* MY JOBS */}

            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">

              <h3 className="text-xl font-bold text-gray-900">
                My Jobs
              </h3>

              <p className="mt-3 text-gray-600">
                View and manage jobs posted by your company.
              </p>

              <button
                onClick={() =>
                  router.push("/my-jobs")
                }
                className="mt-6 rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800 transition"
              >
                Manage My Jobs
              </button>

            </div>


            {/* APPLICANTS */}

            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">

              <h3 className="text-xl font-bold text-gray-900">
                Applicants
              </h3>

              <p className="mt-3 text-gray-600">
                Review candidates who apply for your job postings.
              </p>

              <button
                onClick={() =>
                  router.push("/applicants")
                }
                className="mt-6 rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800 transition"
              >
                View Applicants
              </button>

            </div>

          </div>

        ) : (

          /* ==================================================
             JOB SEEKER DASHBOARD
          =================================================== */

          <div className="mt-8 grid md:grid-cols-2 gap-6">

            {/* MY PROFILE */}

            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">

              <h3 className="text-xl font-bold text-gray-900">
                My Profile
              </h3>

              <p className="mt-3 text-gray-600">
                Add your qualifications, experience, skills and career
                preferences.
              </p>

              <button
                onClick={() =>
                  router.push("/profile")
                }
                className="mt-6 rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800 transition"
              >
                Edit Profile
              </button>

            </div>


            {/* MY RESUME */}

            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">

              <h3 className="text-xl font-bold text-gray-900">
                My Resume
              </h3>

              <p className="mt-3 text-gray-600">
                Upload and manage your resume for job applications.
              </p>

              <button
                onClick={() =>
                  router.push("/resume")
                }
                className="mt-6 rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800 transition"
              >
                Manage Resume
              </button>

            </div>


            {/* MY APPLICATIONS */}

            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">

              <h3 className="text-xl font-bold text-gray-900">
                My Applications
              </h3>

              <p className="mt-3 text-gray-600">
                Track the jobs you have applied for and check your
                application status.
              </p>

              <button
                onClick={() =>
                  router.push("/my-applications")
                }
                className="mt-6 rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800 transition"
              >
                View Applications
              </button>

            </div>


            {/* FIND JOBS */}

            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm md:col-span-2">

              <h3 className="text-xl font-bold text-gray-900">
                Find Jobs
              </h3>

              <p className="mt-3 text-gray-600">
                Search jobs posted by companies and apply for opportunities
                that match your profile.
              </p>

              <button
                onClick={() =>
                  router.push("/find-jobs")
                }
                className="mt-6 rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800 transition"
              >
                Find Jobs
              </button>

            </div>

          </div>

        )}

      </div>
    </main>
  );
}