export const parseDateToString = (date: Date) => {
    return date.toISOString().split("T")[0];
};

export const parseDateTimeToString = (date: Date) => {
    const [dateString, timeString] = date.toISOString().split("T");
    return `${dateString} ${timeString.substring(0, 5)}`;
};
