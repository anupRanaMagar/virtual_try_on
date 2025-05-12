"use client";
import { newVerification } from "@/actions/action";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { BeatLoader } from "react-spinners";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { Button } from "./ui/button";
import Link from "next/link";
import { CheckCircle, XCircle } from "lucide-react"; // Add icons for success/error

const NewVerificationForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const hasRun = useRef(false);

  const onSubmit = useCallback(async () => {
    if (success || error || hasRun.current) return;

    if (!token) {
      setError("No token provided");
      setIsLoading(false);
      return;
    }

    try {
      hasRun.current = true;
      const data = await newVerification(token);
      setSuccess(data.success);
      setError(data.error);
    } catch {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [token, success, error]);

  useEffect(() => {
    if (!hasRun.current) {
      onSubmit();
    }
  }, [onSubmit]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-6">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          Email Verification
        </h1>

        {/* Status Container */}
        <div className="flex flex-col items-center justify-center space-y-4">
          {isLoading ? (
            <div className="flex flex-col items-center">
              <BeatLoader color="#10B981" size={12} />
              <p className="mt-2 text-sm text-gray-600">
                Verifying your email...
              </p>
            </div>
          ) : success ? (
            <div className="flex flex-col items-center text-center animate-fade-in">
              <CheckCircle className="w-12 h-12 text-green-500 mb-2" />
              <FormSuccess message={success} />
            </div>
          ) : (
            <div className="flex flex-col items-center text-center animate-fade-in">
              <XCircle className="w-12 h-12 text-red-500 mb-2" />
              {error && <FormError message={error} />}
            </div>
          )}
        </div>

        {/* Back to Login Button */}
        <div className="flex justify-center">
          <Link href="/login">
            <Button
              asChild
              disabled={isLoading}
              className="w-full max-w-xs bg-primary-700 hover:bg-primary-600 text-white transition-colors"
            >
              Back to Login
            </Button>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default NewVerificationForm;
