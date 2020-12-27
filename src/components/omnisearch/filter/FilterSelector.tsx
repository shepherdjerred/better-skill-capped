import React from "react";
import RoleSelector from "./RoleSelector";
import { Filters } from "./Filters";
import { Role } from "../../../model/Role";
import WatchStatusSelector from "./WatchStatusSelector";
import BookmarkStatusSelector from "./BookmarkStatusSelector";

export interface FilterSelectorProps {
  filters: Filters;
  onFiltersUpdate: (newFilters: Filters) => void;
}

export default function FilterSelector({ filters, onFiltersUpdate }: FilterSelectorProps) {
  const updateFilterRoles = (newRoles: Role[]) => {
    const newFilters = {
      ...filters,
      roles: newRoles,
    };
    onFiltersUpdate(newFilters);
  };

  const updateFilterBookmark = (newBookmark: boolean) => {
    const newFilters = {
      ...filters,
      onlyBookmarked: newBookmark,
    };
    onFiltersUpdate(newFilters);
  };

  const updateFilterWatchStatus = (newWatchStatus: boolean) => {
    const newFilters = {
      ...filters,
      onlyUnwatched: newWatchStatus,
    };
    onFiltersUpdate(newFilters);
  };

  return (
    <>
      <RoleSelector selectedRoles={filters.roles} onRolesUpdate={updateFilterRoles} />
      <WatchStatusSelector isSelected={filters.onlyUnwatched} onSelectionChange={updateFilterWatchStatus} />
      <BookmarkStatusSelector isSelected={filters.onlyBookmarked} onSelectionChange={updateFilterBookmark} />
    </>
  );
}
