import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface OpeningHoursProps {
  value: any;
  onChange: (value: any) => void;
}

const DayHoursInput = ({ day, hours, onChange }: {
  day: string;
  hours: any;
  onChange: (day: string, value: any) => void;
}) => {
  return (
    <div className="flex items-center gap-4 py-2">
      <p className="w-24 capitalize">{day}</p>
      <div className="flex items-center gap-2">
        <Switch
          checked={!hours.isClosed}
          onCheckedChange={(checked) => onChange(day, { ...hours, isClosed: !checked })}
        />
        <span className="text-sm text-gray-500">
          {hours.isClosed ? 'Closed' : 'Open'}
        </span>
      </div>
      {!hours.isClosed && (
        <>
          <Input
            type="time"
            value={hours.open}
            onChange={(e) => onChange(day, { ...hours, open: e.target.value })}
            className="w-32"
          />
          <span>to</span>
          <Input
            type="time"
            value={hours.close}
            onChange={(e) => onChange(day, { ...hours, close: e.target.value })}
            className="w-32"
          />
        </>
      )}
    </div>
  );
};

export const OpeningHoursComponent = ({ value, onChange }: OpeningHoursProps) => {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  // Template for a day's hours
  const defaultHours = {
    open: "09:00",
    close: "17:00",
    isClosed: false
  };

  // Initialize hours if not set
  const [hours, setHours] = useState(() => {
    const initialHours = {} as any;
    for (const day of days) {
      initialHours[day] = value?.[day] || defaultHours;
    }
    return initialHours;
  });

  const handleDayChange = (day: string, newValue: any) => {
    const updatedHours = {
      ...hours,
      [day]: newValue
    };
    setHours(updatedHours);
    onChange(updatedHours);
  };

  const copyToAllDays = (sourceDay: string) => {
    const sourceHours = hours[sourceDay];
    const updatedHours = { ...hours };
    for (const day of days) {
      if (day !== sourceDay) {
        updatedHours[day] = { ...sourceHours };
      }
    }
    setHours(updatedHours);
    onChange(updatedHours);
  };

  return (
    <div className="space-y-4">
      <Label>Opening Hours</Label>
      <div className="border rounded-lg p-4 space-y-2">
        {days.map(day => (
          <div key={day} className="flex items-center gap-2">
            <DayHoursInput
              day={day}
              hours={hours[day]}
              onChange={handleDayChange}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => copyToAllDays(day)}
              className="ml-2"
            >
              Copy to all
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};