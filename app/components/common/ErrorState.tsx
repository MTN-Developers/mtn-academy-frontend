// components/common/ErrorState.tsx
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface ErrorStateProps {
  error: Error;
  variant?: "full" | "compact";
  showHomeButton?: boolean;
  className?: string;
  isRTL?: boolean;
}

export const ErrorState = ({
  error,
  variant = "full",
  showHomeButton = true,
  className = "",
  isRTL = false,
}: ErrorStateProps) => {
  const router = useRouter();
  const t = useTranslations("error");

  // Function to get user-friendly error message
  const getErrorMessage = (error: Error): string => {
    if (error.message.includes("404")) {
      return t("notFound");
    }
    if (error.message.includes("network")) {
      return t("network");
    }
    if (error.message.includes("timeout")) {
      return t("timeout");
    }
    return t("generic");
  };

  if (variant === "compact") {
    return (
      <div
        className={`flex flex-col items-center justify-center p-6 rounded-lg bg-red-50 ${className}`}
      >
        <AlertCircle className="w-8 h-8 text-red-500 mb-2" />
        <p className="text-red-600 font-medium text-center mb-4">
          {getErrorMessage(error)}
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.location.reload()}
          className="flex items-center gap-2"
        >
          <RefreshCcw className="w-4 h-4" />
          {t("tryAgain")}
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`min-h-[50vh] flex flex-col items-center justify-center p-8 ${className}`}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", bounce: 0.4 }}
        className="rounded-full bg-red-100 p-4 mb-6"
      >
        <AlertCircle className="w-12 h-12 text-red-500" />
      </motion.div>

      <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
        {t("title")}
      </h1>

      <p className="text-gray-600 mb-6 text-center max-w-md">
        {getErrorMessage(error)}
      </p>

      <div className={`flex gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
        <Button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2"
        >
          <RefreshCcw className="w-4 h-4" />
          {t("tryAgain")}
        </Button>

        {showHomeButton && (
          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className="flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            {t("backToHome")}
          </Button>
        )}
      </div>

      <p className="mt-8 text-sm text-gray-500">
        {t("errorCode")}: {error.name || "Error"}
      </p>

      {process.env.NODE_ENV === "development" && (
        <pre className="mt-4 p-4 bg-gray-100 rounded-lg text-sm overflow-auto max-w-full">
          {error.stack}
        </pre>
      )}
    </motion.div>
  );
};


