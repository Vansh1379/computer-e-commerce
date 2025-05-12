import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ComponentFilters from "@/components/build-pc/component-filters";
import ComponentList from "@/components/build-pc/component-list";

export function ComponentSelection({
  activeCategory,
  selectedComponents,
  searchQuery,
  setSearchQuery,
  sortOption,
  setSortOption,
  filterBrand,
  setFilterBrand,
  showOutOfStock,
  setShowOutOfStock,
  uniqueBrands,
  filteredComponents,
  selectComponent,
  removeComponent,
}) {
  const categoryName =
    activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1);

  const currentComponent = selectedComponents[activeCategory];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{categoryName}</CardTitle>
        <CardDescription>
          {currentComponent
            ? "Current selection: " + currentComponent.name
            : "Choose a component from the list below"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ComponentFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortOption={sortOption}
          setSortOption={setSortOption}
          filterBrand={filterBrand}
          setFilterBrand={setFilterBrand}
          showOutOfStock={showOutOfStock}
          setShowOutOfStock={setShowOutOfStock}
          uniqueBrands={uniqueBrands}
        />

        <ComponentList
          components={filteredComponents}
          activeCategory={activeCategory}
          selectedComponents={selectedComponents}
          selectComponent={selectComponent}
          removeComponent={removeComponent}
        />
      </CardContent>
    </Card>
  );
}
