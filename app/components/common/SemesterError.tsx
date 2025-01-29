import { Button } from "@/components/ui/button";

export const SemesterError = ({ onRetry }: { onRetry: () => void }) => {
  return (
    <div className="text-center py-12">
      <p className="text-red-500 mb-4">Error loading semesters</p>
      <Button onClick={onRetry}>Try Again</Button>
    </div>
  );
};
