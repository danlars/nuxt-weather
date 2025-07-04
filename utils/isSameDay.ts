export const isSameDay = (dateA: string | Date, dateB: string | Date) => {
    const A = new Date(dateA);
    const B = new Date(dateB);
    return A.getFullYear() === B.getFullYear() && A.getMonth() === B.getMonth() && A.getDate() === B.getDate();
};