import ct from "countries-and-timezones";

export function formatDate(time) {
  if (!time) return null;

  let currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (currentTimeZone === "Asia/Calcutta") currentTimeZone = "Asia/Kolkata";

  const countries = ct.getAllCountries();
  for (const countryCode in countries) {
    const country = countries[countryCode];
    if (country.timezones.includes(currentTimeZone)) {
      const regex_pattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
      const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;
      const UTCDate_Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

      const date = new Date(time);

      if (time.match(regex) || time.match(regex_pattern) || time.match(UTCDate_Regex)) {
        const mediumTime = new Intl.DateTimeFormat(country.id, {
          // timeStyle: "medium",
          dateStyle: "short",
          hour12: true,
        });
        return mediumTime.format(date);
      } else {
        return new Intl.DateTimeFormat(country.id).format(date);
      }
    }
  }

  return null;
}