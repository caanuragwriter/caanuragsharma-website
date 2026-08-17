"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../utils/supabase/client";

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
  status: string;
};

export default function FindJobsPage() {
  const router = useRouter();
  const supabase = createClient();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  const [workModeFilter, setWorkModeFilter] = useState("");

  useEffect(() => {
    async function loadJobs() {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("status", "active")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        setMessage("Unable to load jobs.");
        setLoading(false);
        return;
      }

      setJobs((data || []) as Job[]);
      setLoading(false);
    }

    loadJobs();
  }, [supabase]);

  const locations = useMemo(() => {
    return Array.from(
      new Set(
        jobs
          .map((job) => job.location)
          .filter((value): value is string => Boolean(value))
      )
    ).sort();
  }, [jobs]);

  const jobTypes = useMemo(() => {
    return Array.from(
      new Set(
        jobs
          .map((job) => job.job_type)
          .filter((value): value is string => Boolean(value))
      )
    ).sort();
  }, [jobs]);

  const workModes = useMemo(() => {
    return Array.from(
      new Set(
        jobs
          .map((job) => job.work_mode)
          .filter((value): value is string => Boolean(value))
      )
    ).sort();
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return jobs.filter((job) => {
      const matchesSearch =
        !searchText ||
        job.job_title?.toLowerCase().includes(searchText) ||
        job.company_name?.toLowerCase().includes(searchText) ||
        job.skills?.toLowerCase().includes(searchText) ||
        job.qualification?.toLowerCase().includes(searchText);

      const matchesLocation =
        !locationFilter ||
        job.location?.toLowerCase() === locationFilter.toLowerCase();

      const matchesJobType =
        !jobTypeFilter ||
        job.job_type?.toLowerCase() === jobTypeFilter.toLowerCase();

      const matchesWorkMode =
        !workModeFilter ||
        job.work_mode?.toLowerCase() === workModeFilter.toLowerCase();

      return (
        matchesSearch &&
        matchesLocation &&
        matchesJobType &&
        matchesWorkMode
      );
    });
  }, [
    jobs,
    search,
    locationFilter,
    jobTypeFilter,
    workModeFilter,
  ]);

  function clearFilters() {
    setSearch("");
    setLocationFilter("");
    setJobTypeFilter("");
    setWorkModeFilter("");
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 pt-28">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-600">
            Loading available jobs...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>
              <p className="text-sm text-blue-700 font-semibold uppercase tracking-wide">
                Careers
              </p>

              <h1 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
                Find Jobs
              </h1>

              <p className="mt-2 text-gray-600">
                Explore career opportunities posted by companies.
              </p>
            </div>

            <button
              onClick={() => router.push("/account")}
              className="rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              My Account
            </button>

          </div>

        </div>

        {/* Search & Filters */}
        <div className="mt-6 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-gray-700">
                Search Jobs
              </label>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Job title, company, skill..."
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Location
              </label>

              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-600"
              >
                <option value="">All Locations</option>

                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Job Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Job Type
              </label>

              <select
                value={jobTypeFilter}
                onChange={(e) => setJobTypeFilter(e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-600"
              >
                <option value="">All Job Types</option>

                {jobTypes.map((jobType) => (
                  <option key={jobType} value={jobType}>
                    {jobType}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Work Mode + Clear */}
          <div className="mt-4 flex flex-wrap items-end gap-4">

            <div className="w-full md:w-64">
              <label className="block text-sm font-semibold text-gray-700">
                Work Mode
              </label>

              <select
                value={workModeFilter}
                onChange={(e) => setWorkModeFilter(e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-600"
              >
                <option value="">All Work Modes</option>

                {workModes.map((workMode) => (
                  <option key={workMode} value={workMode}>
                    {workMode}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={clearFilters}
              className="rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              Clear Filters
            </button>

          </div>

        </div>

        {/* Message */}
        {message && (
          <div className="mt-6 bg-white rounded-xl border border-red-200 p-5 text-red-700">
            {message}
          </div>
        )}

        {/* Results Count */}
        {!message && (
          <div className="mt-8 flex items-center justify-between">
            <p className="text-gray-600">
              <span className="font-semibold text-gray-900">
                {filteredJobs.length}
              </span>{" "}
              {filteredJobs.length === 1 ? "job" : "jobs"} found
            </p>
          </div>
        )}

        {/* No Jobs */}
        {!message && filteredJobs.length === 0 && (
          <div className="mt-6 bg-white rounded-2xl border border-gray-200 shadow-sm p-12 text-center">

            <h2 className="text-2xl font-bold text-gray-900">
              No Jobs Found
            </h2>

            <p className="mt-3 text-gray-600">
              Try changing your search or filters.
            </p>

            <button
              onClick={clearFilters}
              className="mt-6 rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800 transition"
            >
              Clear Filters
            </button>

          </div>
        )}

        {/* Job Listings */}
        {filteredJobs.length > 0 && (
          <div className="mt-6 space-y-6">

            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8"
              >

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {job.job_title}
                    </h2>

                    <p className="mt-2 text-lg text-blue-700 font-semibold">
                      {job.company_name}
                    </p>
                  </div>

                  <span className="inline-flex w-fit rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                    Active
                  </span>

                </div>

                {/* Details */}
                <div className="mt-6 grid md:grid-cols-2 gap-4 text-sm">

                  {job.location && (
                    <div>
                      <span className="font-semibold text-gray-900">
                        Location:
                      </span>{" "}
                      <span className="text-gray-600">
                        {job.location}
                      </span>
                    </div>
                  )}

                  {job.job_type && (
                    <div>
                      <span className="font-semibold text-gray-900">
                        Job Type:
                      </span>{" "}
                      <span className="text-gray-600">
                        {job.job_type}
                      </span>
                    </div>
                  )}

                  {job.work_mode && (
                    <div>
                      <span className="font-semibold text-gray-900">
                        Work Mode:
                      </span>{" "}
                      <span className="text-gray-600">
                        {job.work_mode}
                      </span>
                    </div>
                  )}

                  {job.experience_required && (
                    <div>
                      <span className="font-semibold text-gray-900">
                        Experience:
                      </span>{" "}
                      <span className="text-gray-600">
                        {job.experience_required}
                      </span>
                    </div>
                  )}

                  {job.salary_range && (
                    <div>
                      <span className="font-semibold text-gray-900">
                        Salary:
                      </span>{" "}
                      <span className="text-gray-600">
                        {job.salary_range}
                      </span>
                    </div>
                  )}

                  {job.qualification && (
                    <div>
                      <span className="font-semibold text-gray-900">
                        Qualification:
                      </span>{" "}
                      <span className="text-gray-600">
                        {job.qualification}
                      </span>
                    </div>
                  )}

                  {job.application_deadline && (
                    <div>
                      <span className="font-semibold text-gray-900">
                        Apply By:
                      </span>{" "}
                      <span className="text-gray-600">
                        {new Date(
                          job.application_deadline
                        ).toLocaleDateString("en-IN")}
                      </span>
                    </div>
                  )}

                </div>

                {/* Skills */}
                {job.skills && (
                  <div className="mt-6">

                    <p className="font-semibold text-gray-900">
                      Skills
                    </p>

                    <p className="mt-2 text-gray-600 leading-7">
                      {job.skills}
                    </p>

                  </div>
                )}

                {/* Description */}
                {job.description && (
                  <div className="mt-6">

                    <p className="font-semibold text-gray-900">
                      Job Description
                    </p>

                    <p className="mt-2 text-gray-600 whitespace-pre-line leading-7">
                      {job.description}
                    </p>

                  </div>
                )}

                {/* Button */}
                <div className="mt-8 pt-6 border-t border-gray-200">

                  <button
                    onClick={() =>
                      router.push(`/job/${job.id}`)
                    }
                    className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800 transition"
                  >
                    View Job
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}