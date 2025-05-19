  export default function formatDateTime(start, end) {
    if (!start || !end) return '—';
  
    const format = (isoString) => {
      const date = new Date(isoString);
      if (isNaN(date)) return '—';
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${day}.${month}.${year} ${hours}:${minutes}`;
    };
  
    return `${format(start)} — ${format(end)}`;
  }
  