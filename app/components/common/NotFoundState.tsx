// components/NotFoundState.tsx
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { HomeIcon, ArrowLeft, Search } from "lucide-react";

interface NotFoundStateProps {
  title?: string;
  description?: string;
  showHomeButton?: boolean;
  showBackButton?: boolean;
  showSearchButton?: boolean;
  isRTL?: boolean;
}

export const NotFoundState = ({
  title,
  description,
  showHomeButton = true,
  showBackButton = true,
  showSearchButton = true,
  isRTL = false,
}: NotFoundStateProps) => {
  const router = useRouter();

  const defaultTitle = isRTL
    ? "عذراً، لم يتم العثور على المسار التعليمي"
    : "Oops! Academic Path Not Found";

  const defaultDescription = isRTL
    ? "عذراً، المسار التعليمي الذي تبحث عنه غير موجود أو تم نقله"
    : "Sorry, the academic path you're looking for doesn't exist or has been moved";

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="text-center">
        {/* 404 Image */}
        <div className="relative w-64 h-64 mx-auto mb-8">
          <Image
            src="/images/404-illustration.svg" // Add your 404 illustration
            alt="Not Found Illustration"
            fill
            className="object-contain"
          />
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          {title || defaultTitle}
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          {description || defaultDescription}
        </p>

        {/* Action Buttons */}
        <div
          className={`flex flex-wrap gap-4 justify-center ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          {showHomeButton && (
            <Button
              onClick={() => router.push("/")}
              className="flex items-center gap-2"
            >
              <HomeIcon className="w-4 h-4" />
              <span>{isRTL ? "الصفحة الرئيسية" : "Go to Home"}</span>
            </Button>
          )}

          {showBackButton && (
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
              <span>{isRTL ? "العودة" : "Go Back"}</span>
            </Button>
          )}

          {showSearchButton && (
            <Button
              variant="outline"
              onClick={() => router.push("/search")}
              className="flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>{isRTL ? "البحث عن المسارات" : "Search Paths"}</span>
            </Button>
          )}
        </div>

        {/* Additional Help Text */}
        <p className="text-sm text-gray-500 mt-8">
          {isRTL ? "هل تحتاج إلى مساعدة؟ تواصل مع" : "Need help? Contact"}{" "}
          <a
            href="mailto:support@example.com"
            className="text-blue-600 hover:underline"
          >
            {isRTL ? "فريق الدعم" : "support team"}
          </a>
        </p>
      </div>
    </div>
  );
};
