"use client";

import Image from "next/image";
import { AlertCircle, Minus, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ComponentList(props) {
  const {
    components,
    activeCategory,
    selectedComponents,
    selectComponent,
    removeComponent,
  } = props;

  if (components.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
          <AlertCircle className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="font-medium text-lg mb-2">No components found</h3>
        <p className="text-muted-foreground">
          Try adjusting your filters or search query
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {components.map((component) => (
        <Card
          key={component.id}
          className={`overflow-hidden transition-all ${
            selectedComponents[activeCategory]?.id === component.id
              ? "border-primary"
              : "hover:border-primary/50"
          }`}
        >
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-4">
              <div className="p-4 flex items-center justify-center bg-muted/30">
                <Image
                  src={component.image || "/placeholder.svg"}
                  alt={component.name}
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </div>
              <div className="p-4">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">{component.name}</h3>
                    <div className="text-sm text-muted-foreground">
                      Model: {component.model}
                    </div>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm mt-2">
                      {component.socket && (
                        <div className="flex items-center gap-1">
                          <span className="text-muted-foreground">Socket:</span>
                          <span>{component.socket}</span>
                        </div>
                      )}
                      {component.cores && (
                        <div className="flex items-center gap-1">
                          <span className="text-muted-foreground">Cores:</span>
                          <span>{component.cores}</span>
                        </div>
                      )}
                      {component.threads && (
                        <div className="flex items-center gap-1">
                          <span className="text-muted-foreground">
                            Threads:
                          </span>
                          <span>{component.threads}</span>
                        </div>
                      )}
                      {component.speed && (
                        <div className="flex items-center gap-1">
                          <span className="text-muted-foreground">Base:</span>
                          <span>{component.speed}</span>
                        </div>
                      )}
                      {component.boost && (
                        <div className="flex items-center gap-1">
                          <span className="text-muted-foreground">Boost:</span>
                          <span>{component.boost}</span>
                        </div>
                      )}
                      {component.chipset && (
                        <div className="flex items-center gap-1">
                          <span className="text-muted-foreground">
                            Chipset:
                          </span>
                          <span>{component.chipset}</span>
                        </div>
                      )}
                      {component.memory && (
                        <div className="flex items-center gap-1">
                          <span className="text-muted-foreground">Memory:</span>
                          <span>{component.memory}</span>
                        </div>
                      )}
                      {component.capacity && (
                        <div className="flex items-center gap-1">
                          <span className="text-muted-foreground">
                            Capacity:
                          </span>
                          <span>{component.capacity} GB</span>
                        </div>
                      )}
                      {component.speed && component.type === "DDR5" && (
                        <div className="flex items-center gap-1">
                          <span className="text-muted-foreground">Speed:</span>
                          <span>{component.speed} MHz</span>
                        </div>
                      )}
                      {component.wattage && (
                        <div className="flex items-center gap-1">
                          <span className="text-muted-foreground">
                            Wattage:
                          </span>
                          <span>{component.wattage}W</span>
                        </div>
                      )}
                      {component.certification && (
                        <div className="flex items-center gap-1">
                          <span className="text-muted-foreground">Rating:</span>
                          <span>{component.certification}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <div className="text-xl font-bold">
                      ₹{component.price.toLocaleString()}
                    </div>

                    <Badge
                      variant={component.stock ? "outline" : "secondary"}
                      className="mb-2"
                    >
                      {component.stock ? "In Stock" : "Out of Stock"}
                    </Badge>

                    {selectedComponents[activeCategory]?.id === component.id ? (
                      <Button
                        variant="destructive"
                        onClick={() => removeComponent(activeCategory)}
                      >
                        <Minus className="mr-2 h-4 w-4" />
                        Remove
                      </Button>
                    ) : (
                      <Button
                        onClick={() =>
                          selectComponent(activeCategory, component)
                        }
                        disabled={!component.stock}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Select
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
