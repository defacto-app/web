import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Clock } from "lucide-react";

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
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 py-4 border-b last:border-b-0">
      <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto">
        <p className="w-32 text-lg font-medium capitalize">{day}</p>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="sm:hidden"
          onClick={() => onChange('copyFrom', day)}
        >
          Copy
        </Button>
      </div>

      <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full">
        <div className="flex items-center gap-3">
          <Switch
            checked={!hours.isClosed}
            onCheckedChange={(checked) => onChange(day, { ...hours, isClosed: !checked })}
          />
          <span className="text-sm text-gray-500 min-w-[3rem]">
            {hours.isClosed ? 'Closed' : 'Open'}
          </span>
        </div>

        {!hours.isClosed && (
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Input
                type="time"
                value={hours.open}
                onChange={(e) => onChange(day, { ...hours, open: e.target.value })}
                className="w-full sm:w-36 pl-10"
              />
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>

            <span className="text-gray-500">to</span>

            <div className="relative flex-1 sm:flex-none">
              <Input
                type="time"
                value={hours.close}
                onChange={(e) => onChange(day, { ...hours, close: e.target.value })}
                className="w-full sm:w-36 pl-10"
              />
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>
          </div>
        )}

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="hidden sm:block ml-2"
          onClick={() => onChange('copyFrom', day)}
        >
          Copy to all
        </Button>
      </div>
    </div>
  );
};

export const OpeningHoursComponent = ({ value, onChange }: OpeningHoursProps) => {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  const defaultHours = {
    open: "10:00",
    close: "19:00",
    isClosed: false
  };

  const handleDayChange = (day: string, newValue: any) => {
    if (day === 'copyFrom') {
      // Handle copy to all functionality
      const sourceHours = value[newValue];
      const updatedHours = { ...value };
      for (const d of days) {
        if (d !== newValue) {
          updatedHours[d] = { ...sourceHours };
        }
      }
      onChange(updatedHours);
      return;
    }

    onChange({
      ...value,
      [day]: newValue
    });
  };

  return (
    <div className="space-y-4">
      <Label className="text-lg font-semibold">Opening Hours</Label>
      <div className="border rounded-xl p-6 space-y-2 bg-white shadow-sm">
        {days.map(day => (
          <DayHoursInput
            key={day}
            day={day}
            hours={value?.[day] || defaultHours}
            onChange={handleDayChange}
          />
        ))}
      </div>
    </div>
  );
};