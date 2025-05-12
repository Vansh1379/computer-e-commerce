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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function BuildVisualization({ selectedComponents }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Build</CardTitle>
        <CardDescription>
          Visual representation of your selected components
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative bg-muted/30 rounded-lg p-6 min-h-[300px] flex items-center justify-center">
          <div className="grid grid-cols-3 gap-4 w-full max-w-2xl">
            {/* CPU */}
            <div className="relative">
              {selectedComponents.cpu ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="bg-background rounded-lg p-4 flex flex-col items-center justify-center h-full border-2 border-primary">
                        <Cpu className="h-8 w-8 text-primary mb-2" />
                        <div className="text-xs text-center font-medium">
                          {selectedComponents.cpu.name}
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-sm font-medium">
                        {selectedComponents.cpu.name}
                      </div>
                      <div className="text-xs">
                        ₹{selectedComponents.cpu.price.toLocaleString()}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <div className="bg-background rounded-lg p-4 flex flex-col items-center justify-center h-full border-2 border-dashed border-muted-foreground/30">
                  <Cpu className="h-8 w-8 text-muted-foreground mb-2" />
                  <div className="text-xs text-center text-muted-foreground">
                    CPU
                  </div>
                </div>
              )}
            </div>

            {/* Cooling */}
            <div className="relative">
              {selectedComponents.cooling ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="bg-background rounded-lg p-4 flex flex-col items-center justify-center h-full border-2 border-primary">
                        <Fan className="h-8 w-8 text-primary mb-2" />
                        <div className="text-xs text-center font-medium">
                          {selectedComponents.cooling.name}
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-sm font-medium">
                        {selectedComponents.cooling.name}
                      </div>
                      <div className="text-xs">
                        ₹{selectedComponents.cooling.price.toLocaleString()}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <div className="bg-background rounded-lg p-4 flex flex-col items-center justify-center h-full border-2 border-dashed border-muted-foreground/30">
                  <Fan className="h-8 w-8 text-muted-foreground mb-2" />
                  <div className="text-xs text-center text-muted-foreground">
                    Cooling
                  </div>
                </div>
              )}
            </div>

            {/* RAM */}
            <div className="relative">
              {selectedComponents.ram ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="bg-background rounded-lg p-4 flex flex-col items-center justify-center h-full border-2 border-primary">
                        <MemoryStick className="h-8 w-8 text-primary mb-2" />
                        <div className="text-xs text-center font-medium">
                          {selectedComponents.ram.name}
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-sm font-medium">
                        {selectedComponents.ram.name}
                      </div>
                      <div className="text-xs">
                        ₹{selectedComponents.ram.price.toLocaleString()}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <div className="bg-background rounded-lg p-4 flex flex-col items-center justify-center h-full border-2 border-dashed border-muted-foreground/30">
                  <MemoryStick className="h-8 w-8 text-muted-foreground mb-2" />
                  <div className="text-xs text-center text-muted-foreground">
                    RAM
                  </div>
                </div>
              )}
            </div>

            {/* Motherboard */}
            <div className="relative">
              {selectedComponents.motherboard ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="bg-background rounded-lg p-4 flex flex-col items-center justify-center h-full border-2 border-primary">
                        <Layers className="h-8 w-8 text-primary mb-2" />
                        <div className="text-xs text-center font-medium">
                          {selectedComponents.motherboard.name}
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-sm font-medium">
                        {selectedComponents.motherboard.name}
                      </div>
                      <div className="text-xs">
                        ₹{selectedComponents.motherboard.price.toLocaleString()}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <div className="bg-background rounded-lg p-4 flex flex-col items-center justify-center h-full border-2 border-dashed border-muted-foreground/30">
                  <Layers className="h-8 w-8 text-muted-foreground mb-2" />
                  <div className="text-xs text-center text-muted-foreground">
                    Motherboard
                  </div>
                </div>
              )}
            </div>

            {/* GPU */}
            <div className="relative">
              {selectedComponents.gpu ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="bg-background rounded-lg p-4 flex flex-col items-center justify-center h-full border-2 border-primary">
                        <Monitor className="h-8 w-8 text-primary mb-2" />
                        <div className="text-xs text-center font-medium">
                          {selectedComponents.gpu.name}
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-sm font-medium">
                        {selectedComponents.gpu.name}
                      </div>
                      <div className="text-xs">
                        ₹{selectedComponents.gpu.price.toLocaleString()}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <div className="bg-background rounded-lg p-4 flex flex-col items-center justify-center h-full border-2 border-dashed border-muted-foreground/30">
                  <Monitor className="h-8 w-8 text-muted-foreground mb-2" />
                  <div className="text-xs text-center text-muted-foreground">
                    GPU
                  </div>
                </div>
              )}
            </div>

            {/* Storage */}
            <div className="relative">
              {selectedComponents.storage ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="bg-background rounded-lg p-4 flex flex-col items-center justify-center h-full border-2 border-primary">
                        <HardDrive className="h-8 w-8 text-primary mb-2" />
                        <div className="text-xs text-center font-medium">
                          {selectedComponents.storage.name}
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-sm font-medium">
                        {selectedComponents.storage.name}
                      </div>
                      <div className="text-xs">
                        ₹{selectedComponents.storage.price.toLocaleString()}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <div className="bg-background rounded-lg p-4 flex flex-col items-center justify-center h-full border-2 border-dashed border-muted-foreground/30">
                  <HardDrive className="h-8 w-8 text-muted-foreground mb-2" />
                  <div className="text-xs text-center text-muted-foreground">
                    Storage
                  </div>
                </div>
              )}
            </div>

            {/* PSU */}
            <div className="relative">
              {selectedComponents.psu ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="bg-background rounded-lg p-4 flex flex-col items-center justify-center h-full border-2 border-primary">
                        <Battery className="h-8 w-8 text-primary mb-2" />
                        <div className="text-xs text-center font-medium">
                          {selectedComponents.psu.name}
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-sm font-medium">
                        {selectedComponents.psu.name}
                      </div>
                      <div className="text-xs">
                        ₹{selectedComponents.psu.price.toLocaleString()}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <div className="bg-background rounded-lg p-4 flex flex-col items-center justify-center h-full border-2 border-dashed border-muted-foreground/30">
                  <Battery className="h-8 w-8 text-muted-foreground mb-2" />
                  <div className="text-xs text-center text-muted-foreground">
                    PSU
                  </div>
                </div>
              )}
            </div>

            {/* Case */}
            <div className="relative">
              {selectedComponents.case ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="bg-background rounded-lg p-4 flex flex-col items-center justify-center h-full border-2 border-primary">
                        <Disc className="h-8 w-8 text-primary mb-2" />
                        <div className="text-xs text-center font-medium">
                          {selectedComponents.case.name}
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-sm font-medium">
                        {selectedComponents.case.name}
                      </div>
                      <div className="text-xs">
                        ₹{selectedComponents.case.price.toLocaleString()}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <div className="bg-background rounded-lg p-4 flex flex-col items-center justify-center h-full border-2 border-dashed border-muted-foreground/30">
                  <Disc className="h-8 w-8 text-muted-foreground mb-2" />
                  <div className="text-xs text-center text-muted-foreground">
                    Case
                  </div>
                </div>
              )}
            </div>

            {/* Networking */}
            <div className="relative">
              {selectedComponents.wifi ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="bg-background rounded-lg p-4 flex flex-col items-center justify-center h-full border-2 border-primary">
                        <Wifi className="h-8 w-8 text-primary mb-2" />
                        <div className="text-xs text-center font-medium">
                          {selectedComponents.wifi.name}
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-sm font-medium">
                        {selectedComponents.wifi.name}
                      </div>
                      <div className="text-xs">
                        ₹{selectedComponents.wifi.price.toLocaleString()}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <div className="bg-background rounded-lg p-4 flex flex-col items-center justify-center h-full border-2 border-dashed border-muted-foreground/30">
                  <Wifi className="h-8 w-8 text-muted-foreground mb-2" />
                  <div className="text-xs text-center text-muted-foreground">
                    Wifi
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
