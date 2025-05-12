"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Cpu,
  Fan,
  HardDrive,
  Monitor,
  MemoryStick,
  Layers,
  Battery,
  Disc,
  Wifi,
} from "lucide-react";

// Component categories definition
export const componentCategories = [
  { id: "cpu", name: "Processor (CPU)", icon: <Cpu className="h-5 w-5" /> },
  {
    id: "motherboard",
    name: "Motherboard",
    icon: <Layers className="h-5 w-5" />,
  },
  {
    id: "ram",
    name: "Memory (RAM)",
    icon: <MemoryStick className="h-5 w-5" />,
  },
  { id: "gpu", name: "Graphics Card", icon: <Monitor className="h-5 w-5" /> },
  { id: "storage", name: "Storage", icon: <HardDrive className="h-5 w-5" /> },
  { id: "psu", name: "Power Supply", icon: <Battery className="h-5 w-5" /> },
  { id: "case", name: "Case", icon: <Disc className="h-5 w-5" /> },
  { id: "cooling", name: "CPU Cooling", icon: <Fan className="h-5 w-5" /> },
  { id: "wifi", name: "Networking", icon: <Wifi className="h-5 w-5" /> },
];

export function ComponentCategories({
  activeCategory,
  setActiveCategory,
  selectedComponents,
}) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Components</CardTitle>
        <CardDescription>
          Select each component category to build your PC
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1">
          {componentCategories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "ghost"}
              className={`w-full justify-start rounded-none h-14 ${
                selectedComponents[category.id]
                  ? "bg-primary/10 hover:bg-primary/20"
                  : ""
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <div className="flex items-center gap-3 w-full">
                <div
                  className={`${
                    activeCategory === category.id
                      ? "text-primary-foreground"
                      : "text-primary"
                  }`}
                >
                  {category.icon}
                </div>
                <div className="flex-1 text-left">
                  <span className="block">{category.name}</span>
                  {selectedComponents[category.id] && (
                    <span className="text-xs block truncate">
                      {selectedComponents[category.id].name}
                    </span>
                  )}
                </div>
                {selectedComponents[category.id] && (
                  <Badge variant="outline" className="ml-auto">
                    ₹{selectedComponents[category.id].price.toLocaleString()}
                  </Badge>
                )}
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
