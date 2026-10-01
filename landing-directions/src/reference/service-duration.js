export const SERVICE_DURATIONS = [1, 3, 6, 12];

export function getServiceDuration(value) {
  const requested = Number(value);
  const months = SERVICE_DURATIONS.includes(requested) ? requested : 1;
  return { months, label: `${months} month${months === 1 ? "" : "s"}` };
}

export function getServicePeriodEstimate(item) {
  if (
    item?.kind !== "service" ||
    item.billing !== "monthly" ||
    !SERVICE_DURATIONS.includes(item.commitmentMonths) ||
    !Number.isFinite(item.estimate) ||
    item.estimate < 0
  )
    return null;
  return item.estimate * item.commitmentMonths;
}
