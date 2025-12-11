export class DateFormatter {
  static getDateString(date) {
    const today = new Date();
    const messageDate = new Date(date);

    // Reset hours to compare just the date
    today.setHours(0, 0, 0, 0);
    messageDate.setHours(0, 0, 0, 0);

    const diffTime = today - messageDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';

    const day = new Date(date).getDate().toString().padStart(2, '0');
    const month = (new Date(date).getMonth() + 1).toString().padStart(2, '0');
    const year = new Date(date).getFullYear();
    return `${day}/${month}/${year}`;
  }

  static getTimeString(date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
}
