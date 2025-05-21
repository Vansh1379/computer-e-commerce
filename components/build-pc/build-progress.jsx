import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function BuildProgress({ completionPercentage }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Build Progress</h3>
              <p className="text-sm text-muted-foreground">
                {completionPercentage}% complete
              </p>
            </div>
            <Badge
              variant={completionPercentage === 100 ? "default" : "outline"}
            >
              {completionPercentage === 100 ? "Complete" : "In Progress"}
            </Badge>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}
