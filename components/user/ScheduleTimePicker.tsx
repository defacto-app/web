import React, {useState} from 'react';
import {format, addDays, isToday, isTomorrow} from 'date-fns';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface ScheduleTimePickerProps {
    selected?: Date | null;
    onSelect: (date: Date) => void;
    className?: string;
}

interface TimeSlot {
    start: string;
    end: string;
}

const DEFAULT_TIME_SLOT = {
    start: "09:00",
    end: "09:30"
};

const ScheduleTimePicker: React.FC<ScheduleTimePickerProps> = ({
                                                                   selected = null,
                                                                   onSelect,
                                                                   className = ""
                                                               }) => {
    // Initialize with current date if no date is selected
    const [selectedDate, setSelectedDate] = useState<Date>(selected || new Date());
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot>(DEFAULT_TIME_SLOT);

    // Generate available dates (today + 6 days)
    const availableDates = React.useMemo(() => {
        const today = new Date();
        return Array.from({length: 7}, (_, i) => {
            const date = addDays(today, i);
            // Reset hours to start of day to avoid time zone issues
            date.setHours(0, 0, 0, 0);
            return date;
        });
    }, []);

    // Generate time slots from 9:00 to 22:00 with 30-minute intervals
    const timeSlots = React.useMemo(() => {
        const slots: TimeSlot[] = [];
        const startHour = 9;
        const endHour = 22;

        for (let hour = startHour; hour <= endHour; hour++) {
            for (let minutes of [0, 30]) {
                if (hour === endHour && minutes === 30) continue;

                const currentSlot = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
                const nextMinutes = minutes === 30 ? 0 : 30;
                const nextHour = minutes === 30 ? hour + 1 : hour;
                const nextSlot = `${nextHour.toString().padStart(2, '0')}:${nextMinutes.toString().padStart(2, '0')}`;

                slots.push({
                    start: currentSlot,
                    end: nextSlot
                });
            }
        }
        return slots;
    }, []);

    const formatDateDisplay = (date: Date): string => {
        if (isToday(date)) return 'Today';
        if (isTomorrow(date)) return 'Tomorrow';
        return format(date, 'EEE dd MMM');
    };

    const formatTimeDisplay = (slot: TimeSlot): string => {
        return `${slot.start} - ${slot.end}`;
    };

    const handleDateSelect = (dateString: string) => {
        const selectedIndex = availableDates.findIndex(
            date => formatDateDisplay(date) === dateString
        );
        if (selectedIndex !== -1) {
            const newDate = availableDates[selectedIndex];
            setSelectedDate(newDate);

            const [hours, minutes] = selectedTimeSlot.start.split(':');
            newDate.setHours(parseInt(hours), parseInt(minutes));
            onSelect(newDate);
        }
    };

    const handleTimeSelect = (timeString: string) => {
        const slot = timeSlots.find(slot => formatTimeDisplay(slot) === timeString);
        if (slot) {
            setSelectedTimeSlot(slot);

            const newDate = new Date(selectedDate);
            const [hours, minutes] = slot.start.split(':');
            newDate.setHours(parseInt(hours), parseInt(minutes));
            onSelect(newDate);
        }
    };

    const handleSetTime = () => {
        const date = new Date(selectedDate);
        const [hours, minutes] = selectedTimeSlot.start.split(':');
        date.setHours(parseInt(hours), parseInt(minutes));
        onSelect(date);
    };

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle className={`text-center`}>Set a delivery time</CardTitle>
                <p className="text-muted-foreground text-center">
                    Pick a date and time for your order to start
                </p>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Select
                            value={formatDateDisplay(selectedDate)}
                            onValueChange={handleDateSelect}
                        >
                            <SelectTrigger>
                                <SelectValue/>
                            </SelectTrigger>
                            <SelectContent>
                                {availableDates.map((date) => (
                                    <SelectItem
                                        key={date.toISOString()}
                                        value={formatDateDisplay(date)}
                                    >
                                        {formatDateDisplay(date)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select
                            value={formatTimeDisplay(selectedTimeSlot)}
                            onValueChange={handleTimeSelect}
                        >
                            <SelectTrigger>
                                <SelectValue/>
                            </SelectTrigger>
                            <SelectContent>
                                {timeSlots.map((slot) => (
                                    <SelectItem
                                        key={`${slot.start}-${slot.end}`}
                                        value={formatTimeDisplay(slot)}
                                    >
                                        {formatTimeDisplay(slot)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                  <div
                      className=" flex justify-center"
                  >
                      <Button
                          variant={`primary`}
                          className="w-80 "
                          onClick={handleSetTime}
                      >
                          Set time
                      </Button>
                  </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ScheduleTimePicker;