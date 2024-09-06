import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import moment from "moment";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}




export function formatDateFromNow(date: moment.MomentInput) {
  const now = moment();
  const targetMoment = moment(date);

  // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
  let formattedDate

  if (now.diff(targetMoment, 'hours') < 24) {
    const diffInSeconds = now.diff(targetMoment, 'seconds');

    if (diffInSeconds < 10) {
      formattedDate = 'now';
    } else if (diffInSeconds < 60) {
      formattedDate = `${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 3600) {
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      formattedDate = `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    } else {
      const diffInHours = Math.floor(diffInSeconds / 3600);
      formattedDate = `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    }
  } else {
    formattedDate = targetMoment.format("DD/MM/YYYY");
  }

  return formattedDate;
}