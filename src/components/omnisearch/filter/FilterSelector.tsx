import React from "react";
import RoleSelector from "./RoleSelector";
import { Filters } from "./Filters";
import { Role } from "../../../model/Role";

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

  return (
    <>
      <RoleSelector selectedRoles={filters.roles} onRolesUpdate={updateFilterRoles} />
    </>
  );
}
