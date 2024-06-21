export const capitalizeTitle = (title: string): string => {
    return title
    .split (" ")
    .map ((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const calculateElapsedTime = (date: Date): string => {
    const now = new Date ();
    const minutesElapsed = Math.floor ((now.getTime() - date.getTime())/60000);
    return `Hace $ {minutesElapsed} minutos`;
};

export const truncateDescription = (description: string, maxLength: number): string => {
    return description.length > maxLength
    ? description.substring(0, maxLength) + "..."
    : description;
};
