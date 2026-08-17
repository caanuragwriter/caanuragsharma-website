"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../utils/supabase/client";

export default function ResumePage() {
  const router = useRouter();
  const supabase = createClient();

  const [userId, setUserId] = useState("");
  const [resumePath, setResumePath] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadResume() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      setUserId(user.id);

      const { data: profile } = await supabase
        .from("job_seeker_profiles")
        .select("resume_path")
        .eq("id", user.id)
        .maybeSingle();

      if (profile?.resume_path) {
        setResumePath(profile.resume_path);
      }

      setLoading(false);
    }

    loadResume();
  }, [router, supabase]);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) {
      setResumeFile(null);
      return;
    }

    if (file.type !== "application/pdf") {
      setMessage("Please select a PDF file only.");
      setResumeFile(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage("Resume must be less than 5 MB.");
      setResumeFile(null);
      return;
    }

    setResumeFile(file);
    setMessage("");
  }

  async function uploadResume() {
    if (!resumeFile || !userId) {
      setMessage("Please select a PDF resume first.");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      /*
       * Store one resume per user.
       */
      const filePath = `${userId}/resume.pdf`;

      const { error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(filePath, resumeFile, {
          contentType: "application/pdf",
          upsert: true,
        });

      if (uploadError) {
        throw uploadError;
      }

      /*
       * Save the storage path in the user's profile.
       */
      const { error: profileError } = await supabase
        .from("job_seeker_profiles")
        .upsert({
          id: userId,
          resume_path: filePath,
          updated_at: new Date().toISOString(),
        });

      if (profileError) {
        throw profileError;
      }

      setResumePath(filePath);
      setResumeFile(null);

      setMessage("Resume uploaded successfully.");
    } catch (error: any) {
      console.error(error);

      setMessage(
        error?.message || "Unable to upload resume."
      );
    }

    setUploading(false);
  }

  async function viewResume() {
    if (!resumePath) return;

    const { data, error } = await supabase.storage
      .from("resumes")
      .createSignedUrl(resumePath, 60);

    if (error) {
      console.error(error);
      setMessage("Unable to open your resume.");
      return;
    }

    window.open(data.signedUrl, "_blank");
  }

  async function deleteResume() {
    if (!resumePath) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete your resume?"
    );

    if (!confirmed) return;

    setUploading(true);
    setMessage("");

    try {
      const { error: storageError } = await supabase.storage
        .from("resumes")
        .remove([resumePath]);

      if (storageError) {
        throw storageError;
      }

      const { error: profileError } = await supabase
        .from("job_seeker_profiles")
        .update({
          resume_path: null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId);

      if (profileError) {
        throw profileError;
      }

      setResumePath("");
      setMessage("Resume deleted successfully.");
    } catch (error: any) {
      console.error(error);

      setMessage(
        error?.message || "Unable to delete resume."
      );
    }

    setUploading(false);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 pt-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-gray-600">
            Loading resume section...
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
              My Resume
            </h1>

            <p className="mt-2 text-gray-600">
              Upload your latest resume so you can use it when
              applying for jobs.
            </p>
          </div>

          {/* Existing resume */}
          {resumePath ? (
            <div className="rounded-xl border border-green-200 bg-green-50 p-5">

              <div className="flex items-center justify-between gap-4">

                <div>
                  <p className="font-semibold text-gray-900">
                    Resume uploaded
                  </p>

                  <p className="mt-1 text-sm text-gray-600">
                    Your resume is stored securely.
                  </p>
                </div>

                <div className="text-3xl">
                  📄
                </div>

              </div>

              <div className="mt-5 flex flex-wrap gap-3">

                <button
                  type="button"
                  onClick={viewResume}
                  className="rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800 transition"
                >
                  View Resume
                </button>

                <button
                  type="button"
                  onClick={deleteResume}
                  disabled={uploading}
                  className="rounded-lg border border-red-300 px-5 py-3 font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50 transition"
                >
                  Delete Resume
                </button>

              </div>

            </div>
          ) : (
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <p className="font-semibold text-gray-900">
                No resume uploaded yet.
              </p>

              <p className="mt-2 text-sm text-gray-600">
                Upload a PDF resume to complete your job seeker profile.
              </p>
            </div>
          )}

          {/* Upload */}
          <div className="mt-8">

            <label className="block text-sm font-medium text-gray-700">
              {resumePath ? "Replace Resume" : "Upload Resume"}
            </label>

            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3"
            />

            <p className="mt-2 text-sm text-gray-500">
              PDF only · Maximum size 5 MB
            </p>

            {resumeFile && (
              <div className="mt-4 rounded-lg bg-blue-50 p-4">
                <p className="font-medium text-gray-800">
                  Selected file:
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  {resumeFile.name}
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={uploadResume}
              disabled={!resumeFile || uploading}
              className="mt-6 w-full rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50 transition"
            >
              {uploading
                ? "Uploading..."
                : resumePath
                ? "Replace Resume"
                : "Upload Resume"}
            </button>

          </div>

          {message && (
            <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
              {message}
            </div>
          )}

          <button
            type="button"
            onClick={() => router.push("/account")}
            className="mt-8 text-blue-700 font-semibold hover:underline"
          >
            ← Back to Account
          </button>

        </div>

      </div>
    </main>
  );
}