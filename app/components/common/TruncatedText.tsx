// Optional: Create a reusable component for truncated text with tooltip
"use client";
export const TruncatedText = ({
  text,
  maxLength = 20,
  className,
}: {
  text: string;
  maxLength?: number;
  className?: string;
}) => {
  const isTruncated = text.length > maxLength;
  const truncatedText = isTruncated
    ? `${text.substring(0, maxLength)}...`
    : text;

  return (
    <div className="relative group">
      <p className={className}>{truncatedText}</p>
      {isTruncated && (
        <div className="absolute z-10 invisible group-hover:visible bg-gray-100 text-gray-800 p-2 rounded text-sm -top-8 left-0 whitespace-nowrap">
          {text}
        </div>
      )}
    </div>
  );
};
