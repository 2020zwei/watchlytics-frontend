// export const dateFormater = (date: any) => {
//     if (!date || typeof date !== "string") return "";

//     const [day, month, year] = date.split("-");
//     if (!day || !month || !year) return "";

//     return `${year}-${month}-${day}`;
// };


export const formatDate = (date: Date | string) => {
    if (!date) return "";
    if (typeof date === "string") return date;
    return date.toISOString().split("T")[0]; // 'YYYY-MM-DD'
};