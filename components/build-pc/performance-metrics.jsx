"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const performanceMetrics = {
  gaming: {
    "1080p": 95,
    "1440p": 85,
    "4K": 70,
  },
  productivity: {
    "Video Editing": 90,
    "3D Rendering": 85,
    "Photo Editing": 95,
  },
};

export default function PerformanceMetrics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
        <CardDescription>
          Estimated performance based on your selected components
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="font-medium mb-3">Gaming Performance</h4>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>1080p Gaming</span>
                <span>{performanceMetrics.gaming["1080p"]}%</span>
              </div>
              <Progress
                value={performanceMetrics.gaming["1080p"]}
                className="h-2"
              />
            </div>
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>1440p Gaming</span>
                <span>{performanceMetrics.gaming["1440p"]}%</span>
              </div>
              <Progress
                value={performanceMetrics.gaming["1440p"]}
                className="h-2"
              />
            </div>
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>4K Gaming</span>
                <span>{performanceMetrics.gaming["4K"]}%</span>
              </div>
              <Progress
                value={performanceMetrics.gaming["4K"]}
                className="h-2"
              />
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3">Productivity</h4>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Video Editing</span>
                <span>{performanceMetrics.productivity["Video Editing"]}%</span>
              </div>
              <Progress
                value={performanceMetrics.productivity["Video Editing"]}
                className="h-2"
              />
            </div>
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>3D Rendering</span>
                <span>{performanceMetrics.productivity["3D Rendering"]}%</span>
              </div>
              <Progress
                value={performanceMetrics.productivity["3D Rendering"]}
                className="h-2"
              />
            </div>
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Photo Editing</span>
                <span>{performanceMetrics.productivity["Photo Editing"]}%</span>
              </div>
              <Progress
                value={performanceMetrics.productivity["Photo Editing"]}
                className="h-2"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
