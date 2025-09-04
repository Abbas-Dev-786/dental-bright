import React, { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import BreadcrumbTrail from "../../components/ui/BreadcrumbTrail";
import ProgressIndicator from "../../components/ui/ProgressIndicator";
import FilterSidebar from "./components/FilterSidebar";
import SearchAndSort from "./components/SearchAndSort";
import DentistGrid from "./components/DentistGrid";
import QuickViewModal from "./components/QuickViewModal";
import { useQuery } from "@tanstack/react-query";
import { getAllDentists } from "services/dentist.service";

const DentistSelection = () => {
  const {
    data: mockDentists,
    isLoading: loading,
    isError,
  } = useQuery({
    queryKey: ["dentists"],
    queryFn: getAllDentists,
    select(data) {
      return data.documents;
    },
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedDentist, setSelectedDentist] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [filters, setFilters] = useState({
    specializations: [],
    locations: [],
    availability: [],
    minRating: 0,
    priceRange: { min: 0, max: 1000 },
  });

  // Filter and sort dentists
  const filteredAndSortedDentists = useMemo(() => {
    let filtered = mockDentists?.filter((dentist) => {
      // Search filter
      if (
        searchQuery &&
        !dentist?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      ) {
        return false;
      }

      // Specialization filter
      if (
        filters?.specializations?.length > 0 &&
        !filters?.specializations?.includes(dentist?.specialization)
      ) {
        return false;
      }

      const [minPrice, maxPrice] = dentist?.priceRange?.split("-");

      // Price range filter
      if (
        minPrice > filters?.priceRange?.max ||
        maxPrice < filters?.priceRange?.min
      ) {
        return false;
      }

      return true;
    });

    // Sort dentists
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case "experience":
          return b?.experience - a?.experience;
        case "price-low":
          return (
            a?.priceRange?.split("-")?.[0] - b?.priceRange?.split("-")?.[0]
          );
        case "price-high":
          return (
            b?.priceRange?.split("-")?.[1] - a?.priceRange?.split("-")?.[1]
          );
        case "name":
          return a?.name?.localeCompare(b?.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, filters, sortBy, loading]);

  const handleQuickView = (dentist) => {
    setSelectedDentist(dentist);
    setIsQuickViewOpen(true);
  };

  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
    setSelectedDentist(null);
  };

  const customBreadcrumbs = [
    { label: "Home", path: "/", icon: "Home" },
    { label: "Book Appointment", path: "/dentist-selection", icon: "Calendar" },
    {
      label: "Select Dentist",
      path: "/dentist-selection",
      icon: "Search",
      isLast: true,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Select Dentist - DentalBright</title>
        <meta
          name="description"
          content="Browse and select from our network of qualified dental professionals. Find the perfect dentist for your needs with detailed profiles, ratings, and availability."
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header onLogout={() => {}} />
        <BreadcrumbTrail customBreadcrumbs={customBreadcrumbs} />
        {/* <ProgressIndicator 
          currentStep={1} 
          totalSteps={3}
          steps={[
            { label: 'Select Dentist', isCompleted: false },
            { label: 'Choose Time', isCompleted: false },
            { label: 'Confirmation', isCompleted: false }
          ]}
        /> */}

        <div className="flex">
          <FilterSidebar
            filters={filters}
            onFiltersChange={setFilters}
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
          />

          <div className="flex-1 min-h-screen">
            <SearchAndSort
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onToggleFilters={() => setIsFilterOpen(true)}
              resultsCount={filteredAndSortedDentists?.length}
            />

            <div className="p-6">
              <DentistGrid
                dentists={filteredAndSortedDentists}
                loading={loading}
                onQuickView={handleQuickView}
              />
            </div>
          </div>
        </div>

        <QuickViewModal
          dentist={selectedDentist}
          isOpen={isQuickViewOpen}
          onClose={handleCloseQuickView}
        />
      </div>
    </>
  );
};

export default DentistSelection;
