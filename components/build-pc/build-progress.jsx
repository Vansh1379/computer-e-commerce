import { Progress } from "@/components/ui/progress";

export default function BuildProgress({ completionPercentage }) {
  const isComplete = completionPercentage === 100;

  return (
    <div className="w-full rounded-2xl border border-muted bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-6 px-2 py-1">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h5 className="text-sm font-light pt-2 pl-5 ">Build Progress</h5>
            <p className="text-sm text-muted-foreground mt-1">
              {completionPercentage}% complete
            </p>
          </div>

          {/* Custom Badge */}
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium
              ${
                isComplete
                  ? "bg-green-600 text-white"
                  : "bg-yellow-100 text-yellow-800 border border-yellow-300"
              }`}
          >
            {isComplete ? "Complete" : "In Progress"}
          </div>
        </div>

        {/* Progress Bar */}
        <Progress
          value={completionPercentage}
          className="h-3 rounded-full bg-gray-200"
          barClassName="bg-gradient-to-r from-purple-500 to-pink-500"
        />
      </div>
    </div>
  );
}
