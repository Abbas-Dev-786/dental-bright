import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";

const AppointmentTable = ({
  appointments,
  onConfirm,
  onReschedule,
  onCancel,
  onViewPatient,
}) => {
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("asc");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAppointments, setSelectedAppointments] = useState([]);

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "confirmed", label: "Confirmed" },
    { value: "pending", label: "Pending" },
    { value: "cancelled", label: "Cancelled" },
    { value: "completed", label: "Completed" },
  ];

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  console.log("appointments data", appointments);
  const filteredAppointments = appointments
    ?.filter((apt) => {
      // const matchesStatus =
      //   filterStatus === "all" || apt?.status === filterStatus;
      const matchesSearch =
        apt?.users?.full_name
          ?.toLowerCase()
          ?.includes(searchTerm?.toLowerCase()) ||
        apt?.phone?.includes(searchTerm) ||
        apt?.type?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      return matchesSearch;
    })
    ?.sort((a, b) => {
      let aValue = a?.[sortField];
      let bValue = b?.[sortField];

      if (sortField === "date") {
        aValue = new Date(a.start_date);
        bValue = new Date(b.start_date);
      }

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedAppointments(filteredAppointments?.map((apt) => apt?.id));
    } else {
      setSelectedAppointments([]);
    }
  };

  const handleSelectAppointment = (appointmentId, checked) => {
    if (checked) {
      setSelectedAppointments([...selectedAppointments, appointmentId]);
    } else {
      setSelectedAppointments(
        selectedAppointments?.filter((id) => id !== appointmentId)
      );
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-success/10 text-success border-success/20";
      case "pending":
        return "bg-warning/10 text-warning border-warning/20";
      case "cancelled":
        return "bg-error/10 text-error border-error/20";
      case "completed":
        return "bg-muted/10 text-muted-foreground border-muted/20";
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const SortButton = ({ field, children }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center space-x-1 text-left font-medium text-foreground hover:text-primary transition-colors duration-200"
    >
      <span>{children}</span>
      {sortField === field && (
        <Icon
          name={sortDirection === "asc" ? "ChevronUp" : "ChevronDown"}
          size={16}
          className="text-primary"
        />
      )}
    </button>
  );

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <h2 className="text-xl font-semibold text-foreground">
            All Appointments
          </h2>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <Input
              type="search"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full sm:w-64"
            />

            {/* <Select
              options={statusOptions}
              value={filterStatus}
              onChange={setFilterStatus}
              placeholder="Filter by status"
              className="w-full sm:w-48"
            /> */}
          </div>
        </div>

        {/* {selectedAppointments?.length > 0 && (
          <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-primary font-medium">
                {selectedAppointments?.length} appointment(s) selected
              </span>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Calendar"
                  iconSize={14}
                >
                  Bulk Reschedule
                </Button>
                <Button variant="outline" size="sm" iconName="X" iconSize={14}>
                  Bulk Cancel
                </Button>
              </div>
            </div>
          </div>
        )} */}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              {/* <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={
                    selectedAppointments?.length ===
                      filteredAppointments?.length &&
                    filteredAppointments?.length > 0
                  }
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                  className="rounded border-border"
                />
              </th> */}
              <th className="px-6 py-3 text-left">
                <SortButton field="date">Date & Time</SortButton>
              </th>
              <th className="px-6 py-3 text-left">
                <SortButton field="patientName">Patient</SortButton>
              </th>
              <th className="px-6 py-3 text-left">
                <SortButton field="duration">Duration</SortButton>
              </th>
              <th className="px-6 py-3 text-left">
                <SortButton field="status">Status</SortButton>
              </th>
              <th className="px-6 py-3 text-left">Notes</th>
              {/* <th className="px-6 py-3 text-right">Actions</th> */}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredAppointments?.map((appointment) => {
              const startTime = new Date(appointment.start_date);

              return (
                <tr
                  key={appointment?.$id}
                  className="hover:bg-muted/30 transition-colors duration-200"
                >
                  {/* <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedAppointments?.includes(appointment?.$id)}
                      onChange={(e) =>
                        handleSelectAppointment(
                          appointment?.$id,
                          e?.target?.checked
                        )
                      }
                      className="rounded border-border"
                    />
                  </td> */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">
                        {startTime.toDateString()}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {String(startTime.getUTCHours()).padStart(2, "0") +
                          ":" +
                          String(startTime.getUTCMinutes()).padStart(2, "0")}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <button
                        onClick={() => onViewPatient(appointment?.$id)}
                        className="font-medium text-primary hover:text-primary/80 text-left transition-colors duration-200"
                      >
                        {appointment?.users?.full_name}
                      </button>
                      <span className="text-sm text-muted-foreground">
                        {appointment?.users?.phone}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-foreground">30 Minutes</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        appointment?.status
                      )}`}
                    >
                      {appointment?.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-32">
                      {appointment?.notes ? (
                        <p
                          className="text-sm text-muted-foreground truncate"
                          title={appointment?.notes}
                        >
                          {appointment?.notes}
                        </p>
                      ) : (
                        <span className="text-sm text-muted-foreground">-</span>
                      )}
                    </div>
                  </td>
                  {/* <td className="px-6 py-4">
                  <div className="flex items-center justify-end space-x-2">
                    {appointment?.status === 'pending' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onConfirm(appointment?.id)}
                        iconName="Check"
                        iconSize={14}
                        className="text-success hover:text-success"
                      />
                    )}
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onReschedule(appointment?.id)}
                      iconName="Calendar"
                      iconSize={14}
                    />
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onCancel(appointment?.id)}
                      iconName="X"
                      iconSize={14}
                      className="text-error hover:text-error"
                    />
                  </div>
                </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {filteredAppointments?.length === 0 && (
        <div className="text-center py-8">
          <Icon
            name="Search"
            size={48}
            className="mx-auto text-muted-foreground mb-4"
          />
          <p className="text-muted-foreground">
            No appointments found matching your criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default AppointmentTable;
