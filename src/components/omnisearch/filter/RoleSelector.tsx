import React from "react";
import { Role } from "../../../model/Role";

export interface RoleSelectorProps {
  selectedRoles: Role[];
  onRolesUpdate: (newRoles: Role[]) => void;
}

export default function RoleSelector({ selectedRoles, onRolesUpdate }: RoleSelectorProps) {
  const isChecked = (role: Role) => {
    return (
      selectedRoles.find((candidate) => {
        return candidate === role;
      }) !== undefined
    );
  };

  const getNewRoles = (role: Role) => {
    let newRoles = selectedRoles.slice();
    if (isChecked(role)) {
      newRoles = newRoles.filter((candidate) => {
        return candidate !== role;
      });
    } else {
      newRoles.push(role);
    }
    onRolesUpdate(newRoles);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Roles</p>
      <div className="panel-block">
        <p className="control">
          <div className="field">
            <label className="checkbox">
              <input type="checkbox" checked={isChecked(Role.TOP)} onClick={() => getNewRoles(Role.TOP)} /> Top
            </label>
          </div>
          <div className="field">
            <label className="checkbox">
              <input type="checkbox" checked={isChecked(Role.JUNGLE)} onClick={() => getNewRoles(Role.JUNGLE)} /> Jungle
            </label>
          </div>
          <div className="field">
            <label className="checkbox">
              <input type="checkbox" checked={isChecked(Role.MID)} onClick={() => getNewRoles(Role.MID)} /> Mid
            </label>
          </div>
          <div className="field">
            <label className="checkbox">
              <input type="checkbox" checked={isChecked(Role.ADC)} onClick={() => getNewRoles(Role.ADC)} /> ADC
            </label>
          </div>
          <div className="field">
            <label className="checkbox">
              <input type="checkbox" checked={isChecked(Role.SUPPORT)} onClick={() => getNewRoles(Role.SUPPORT)} />{" "}
              Support
            </label>
          </div>
          <div className="field">
            <label className="checkbox">
              <input type="checkbox" checked={isChecked(Role.ALL)} onClick={() => getNewRoles(Role.ALL)} /> All Roles
            </label>
          </div>
        </p>
      </div>
    </nav>
  );
}
