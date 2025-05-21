"use client";
import { useState, useEffect } from "react";
import BuildSummary from "@/components/build-pc/build-summary.jsx";
import PerformanceMetrics from "@/components/build-pc/performance-metrics.jsx";
import BuildProgress from "@/components/build-pc/build-progress.jsx";
import { ComponentSelection } from "@/components/build-pc/component-selection.jsx";
import { BuildVisualization } from "@/components/build-pc/build-visualization.jsx";
import {
  componentCategories,
  ComponentCategories,
} from "@/components/build-pc/componentCategories.jsx";
import { sampleComponents } from "@/data/sample-components.js";
import Topbar1 from "@/components/headers/Topbar1";
import Header1 from "@/components/headers/Header1";

export default function PCBuilder() {
  const [activeCategory, setActiveCategory] = useState("cpu");
  const [selectedComponents, setSelectedComponents] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [estimatedWattage, setEstimatedWattage] = useState(0);
  const [showOutOfStock, setShowOutOfStock] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBrand, setFilterBrand] = useState("");
  const [sortOption, setSortOption] = useState("price-low");

  // Calculate total price and estimated wattage whenever selected components change
  useEffect(() => {
    let price = 0;
    let wattage = 0;

    Object.values(selectedComponents).forEach((component) => {
      if (component) {
        price += component.price;

        // Estimate wattage based on component type
        if (component.category === "cpu") {
          wattage += component.tdp || 0;
        } else if (component.category === "gpu") {
          wattage += component.tdp || 250; // Approximate GPU wattage
        } else if (component.category === "ram") {
          wattage += 10;
        } else if (component.category === "storage") {
          wattage += component.type === "HDD" ? 10 : 5;
        } else {
          wattage += 5; // Other components
        }
      }
    });

    // Add 50W buffer
    wattage += 50;

    setTotalPrice(price);
    setEstimatedWattage(wattage);
  }, [selectedComponents]);

  // Helper function to convert PCComponent to ComponentListComponent
  const toComponentListFormat = (component) => {
    // Extract relevant properties based on component category
    const baseProps = {
      id: component.id,
      name: component.name,
      image: component.image,
      model: component.model,
      price: component.price,
      stock: component.stock,
      brand: component.brand,
    };

    // Add specific properties based on component type
    if (component.category === "cpu") {
      return {
        ...baseProps,
        socket: component.socket,
        cores: component.cores,
        threads: component.threads,
        speed: component.speed,
        boost: component.boost,
      };
    } else if (component.category === "gpu") {
      return {
        ...baseProps,
        memory: component.memory,
      };
    } else if (component.category === "motherboard") {
      return {
        ...baseProps,
        socket: component.socket,
        chipset: component.chipset,
      };
    } else if (component.category === "ram") {
      return {
        ...baseProps,
        capacity: parseInt(component.capacity),
        speed: component.speed,
      };
    } else if (component.category === "storage") {
      return {
        ...baseProps,
        capacity: parseInt(component.capacity),
        type: component.type,
      };
    } else if (component.category === "psu") {
      return {
        ...baseProps,
        wattage: component.wattage,
        certification: component.efficiency,
      };
    } else if (component.category === "case") {
      return {
        ...baseProps,
        type: component.formFactor,
      };
    } else if (component.category === "cooler") {
      return {
        ...baseProps,
        type: component.type,
      };
    }

    return baseProps;
  };

  // Convert a ComponentListComponent back to PCComponent
  const fromComponentListFormat = (listComponent, category) => {
    // Start with base properties
    const baseProps = {
      id: listComponent.id,
      name: listComponent.name,
      price: listComponent.price,
      model: listComponent.model || "",
      brand: listComponent.brand || "",
      stock: listComponent.stock,
      image: listComponent.image || "",
    };

    // Add category-specific properties
    switch (category) {
      case "cpu":
        return {
          ...baseProps,
          category: "cpu",
          socket: listComponent.socket || "",
          cores: listComponent.cores || 0,
          threads: listComponent.threads || 0,
          speed: listComponent.speed || "",
          boost: listComponent.boost || "",
          tdp: 65, // Default TDP if not specified
        };
      case "gpu":
        return {
          ...baseProps,
          category: "gpu",
          memory: listComponent.memory || "",
          tdp: 150, // Default TDP if not specified
        };
      case "motherboard":
        return {
          ...baseProps,
          category: "motherboard",
          socket: listComponent.socket || "",
          chipset: listComponent.chipset || "",
          formFactor: "ATX", // Default form factor
        };
      case "ram":
        return {
          ...baseProps,
          category: "ram",
          capacity: listComponent.capacity?.toString() || "0",
          speed: listComponent.speed || "",
        };
      case "storage":
        return {
          ...baseProps,
          category: "storage",
          capacity: listComponent.capacity?.toString() || "0",
          type: listComponent.type || "SSD",
          interface: "SATA", // Default interface
        };
      case "psu":
        return {
          ...baseProps,
          category: "psu",
          wattage: listComponent.wattage || 0,
          efficiency: listComponent.certification || "80+ Bronze",
        };
      case "case":
        return {
          ...baseProps,
          category: "case",
          formFactor: listComponent.type || "ATX",
        };
      case "cooler":
        return {
          ...baseProps,
          category: "cooler",
          type: listComponent.type || "Air",
        };
      case "wifi":
        return {
          ...baseProps,
          category: "wifi",
          standard: "WiFi 6",
        };
      default:
        // Handle unknown categories safely
        return {
          ...baseProps,
          category: category,
        };
    }
  };

  // Handle component selection - updated to use the conversion functions
  const selectComponent = (category, component) => {
    // Convert from ComponentList format to PCComponent format
    const pcComponent = fromComponentListFormat(component, category);

    setSelectedComponents({
      ...selectedComponents,
      [category]: pcComponent,
    });

    // Move to next category if this is the first time selecting this component
    if (!selectedComponents[category]) {
      const currentIndex = componentCategories.findIndex(
        (c) => c.id === category
      );
      if (currentIndex < componentCategories.length - 1) {
        setActiveCategory(componentCategories[currentIndex + 1].id);
      }
    }
  };

  // Remove a component
  const removeComponent = (category) => {
    const newSelectedComponents = { ...selectedComponents };
    delete newSelectedComponents[category];
    setSelectedComponents(newSelectedComponents);
  };

  // Filter and sort components
  const getFilteredComponents = (category) => {
    // Handle missing categories
    let components = sampleComponents[category] || [];

    // Filter by stock if needed
    if (!showOutOfStock) {
      components = components.filter((c) => c.stock);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      components = components.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.brand.toLowerCase().includes(query) ||
          c.model.toLowerCase().includes(query)
      );
    }

    // Filter by brand
    if (filterBrand) {
      components = components.filter((c) => c.brand === filterBrand);
    }

    // Sort components
    if (sortOption === "price-low") {
      components.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-high") {
      components.sort((a, b) => b.price - a.price);
    } else if (sortOption === "name") {
      components.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Convert to ComponentListComponent format
    return components.map(toComponentListFormat);
  };

  // Get unique brands for the current category
  const getUniqueBrands = (category) => {
    const components = sampleComponents[category] || [];
    const brands = new Set(components.map((c) => c.brand));
    return Array.from(brands);
  };

  // Check if components are compatible
  const checkCompatibility = () => {
    const issues = [];

    // Check CPU and motherboard socket compatibility
    const cpu = selectedComponents.cpu;
    const motherboard = selectedComponents.motherboard;

    if (cpu && motherboard) {
      if (cpu.socket !== motherboard.socket) {
        issues.push(
          `CPU socket (${cpu.socket}) is not compatible with motherboard socket (${motherboard.socket})`
        );
      }
    }

    // Check if PSU has enough wattage
    const psu = selectedComponents.psu;
    if (psu && estimatedWattage > psu.wattage) {
      issues.push(
        `Power supply (${psu.wattage}W) may not be sufficient for your build (${estimatedWattage}W estimated)`
      );
    }

    return issues;
  };

  // Calculate build completion percentage
  const getBuildCompletionPercentage = () => {
    const selectedCount = Object.keys(selectedComponents).length;
    const totalCategories = componentCategories.length;
    return Math.round((selectedCount / totalCategories) * 100);
  };

  // Get compatibility issues
  const compatibilityIssues = checkCompatibility();
  const completionPercentage = getBuildCompletionPercentage();
  const filteredComponents = getFilteredComponents(activeCategory);
  const uniqueBrands = getUniqueBrands(activeCategory);

  // Convert selectedComponents to ComponentListComponent format for rendering
  const selectedComponentsForList = Object.entries(selectedComponents).reduce(
    (acc, [category, component]) => {
      if (component) {
        acc[category] = toComponentListFormat(component);
      }
      return acc;
    },
    {}
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        <Topbar1 />
        <Header1 />
        <div>
          <h1 className="text-xl font-bold mb-2">Custom PC Builder</h1>
          <p className="text-muted-foreground">
            Select components to build your custom PC. Our tool ensures
            compatibility and helps you create the perfect system for your
            needs.
          </p>
        </div>

        {/* Build progress */}
        <BuildProgress completionPercentage={completionPercentage} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Component selection sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <ComponentCategories
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              selectedComponents={selectedComponentsForList}
            />

            {/* Build Summary */}
            <BuildSummary
              estimatedWattage={estimatedWattage}
              totalPrice={totalPrice}
              compatibilityIssues={compatibilityIssues}
              selectedComponentsCount={Object.keys(selectedComponents).length}
            />

            {/* Performance Metrics */}
            {Object.keys(selectedComponents).length >= 2 && (
              <PerformanceMetrics />
            )}
          </div>

          {/* Component selection main area */}
          <div className="lg:col-span-2 space-y-6">
            <ComponentSelection
              activeCategory={activeCategory}
              selectedComponents={selectedComponentsForList}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              sortOption={sortOption}
              setSortOption={setSortOption}
              filterBrand={filterBrand}
              setFilterBrand={setFilterBrand}
              showOutOfStock={showOutOfStock}
              setShowOutOfStock={setShowOutOfStock}
              uniqueBrands={uniqueBrands}
              filteredComponents={filteredComponents}
              selectComponent={selectComponent}
              removeComponent={removeComponent}
            />

            {/* Build visualization */}
            {Object.keys(selectedComponents).length > 0 && (
              <BuildVisualization selectedComponents={selectedComponents} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
