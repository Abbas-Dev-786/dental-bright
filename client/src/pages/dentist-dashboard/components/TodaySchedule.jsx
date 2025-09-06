import React from "react";
import Icon from "../../../components/AppIcon";

const TodaySchedule = ({
  appointments,
  selectedDoctor,
  onConfirm,
  onReschedule,
  onCancel,
  onAddNotes,
}) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case "cleaning":
        return "Sparkles";
      case "checkup":
        return "Search";
      case "filling":
        return "Wrench";
      case "extraction":
        return "Scissors";
      default:
        return "Calendar";
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">
            Today's Schedule
          </h2>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Calendar" size={16} />
            <span>
              {new Date()?.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
      <div className="p-6">
        {appointments?.length === 0 ? (
          <div className="text-center py-8">
            <Icon
              name="Calendar"
              size={48}
              className="mx-auto text-muted-foreground mb-4"
            />
            <p className="text-muted-foreground">
              No appointments scheduled for today
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments?.map((appointment) => {
              const startTime = new Date(appointment.start_date);

              return (
                <div
                  key={appointment?.$id}
                  className="border border-border rounded-lg p-4 hover:shadow-card transition-shadow duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon
                          name={getTypeIcon(appointment?.type || "other")}
                          size={20}
                          className="text-primary"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium text-foreground">
                            {appointment?.users?.full_name}
                          </h3>
                          {/* <span
                          className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            appointment?.status
                          )}`}
                        >
                          {appointment?.status}
                        </span> */}
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                          <div className="flex items-center space-x-1">
                            <Icon name="Clock" size={14} />
                            <span>
                              {String(startTime.getUTCHours()).padStart(
                                2,
                                "0"
                              ) +
                                ":" +
                                String(startTime.getUTCMinutes()).padStart(
                                  2,
                                  "0"
                                )}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="Phone" size={14} />
                            <span>{appointment?.users?.phone}</span>
                          </div>
                          {/* <div className="flex items-center space-x-1">
                          <Icon name="Activity" size={14} />
                          <span className="capitalize">
                            {appointment?.type}
                          </span>
                        </div> */}
                        </div>

                        {appointment?.notes && (
                          <p className="text-sm text-muted-foreground bg-muted/50 rounded p-2 mt-2">
                            {appointment?.notes}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* <div className="flex items-center space-x-2 ml-4">
                    {appointment?.status === 'pending' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onConfirm(appointment?.id)}
                        iconName="Check"
                        iconSize={14}
                      >
                        Confirm
                      </Button>
                    )}
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onReschedule(appointment?.id)}
                      iconName="Calendar"
                      iconSize={14}
                    >
                      Reschedule
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onAddNotes(appointment?.id)}
                      iconName="FileText"
                      iconSize={14}
                    >
                      Notes
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onCancel(appointment?.id)}
                      iconName="X"
                      iconSize={14}
                      className="text-error hover:text-error"
                    >
                      Cancel
                    </Button>
                  </div> */}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodaySchedule;
