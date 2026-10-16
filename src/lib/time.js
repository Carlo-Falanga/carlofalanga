const naplesClock = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Rome",
  hour: "2-digit",
  minute: "2-digit",
});

export function naplesTime() {
  return naplesClock.format(new Date());
}
