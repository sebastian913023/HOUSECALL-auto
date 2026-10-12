import { business, estimator, type EstimatorJob } from "./content";

// Word-start match on the customer's text: "brak" matches "brakes", "braking".
export function matchJobs(text: string): EstimatorJob[] {
  const t = ` ${text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ")} `;
  return estimator.jobs.filter((j) => j.keywords.some((k) => t.includes(` ${k}`)));
}

const round5 = (n: number) => Math.round(n / 5) * 5;

// Labor-only range for matched jobs that have hours. Returns null unless a
// public rate is set AND every non-fixed matched job has hours, so a number is
// never shown on partial data. Overlapping jobs (pads + rotors) can double
// count shared labor; set hours with that in mind.
export function laborRange(jobs: EstimatorJob[]): [number, number] | null {
  const rate = estimator.rate;
  const labor = jobs.filter((j) => !j.fixed);
  if (!rate || labor.length === 0 || labor.some((j) => !j.hours)) return null;
  const low = labor.reduce((s, j) => s + (j.hours as [number, number])[0], 0) * rate;
  const high = labor.reduce((s, j) => s + (j.hours as [number, number])[1], 0) * rate;
  return [round5(low), round5(high)];
}

export function smsLink(vehicle: string, issue: string, jobs: EstimatorJob[]): string {
  const lines = [
    "Estimate request from the website",
    vehicle.trim() && `Vehicle: ${vehicle.trim().slice(0, 80)}`,
    `Issue: ${issue.trim().slice(0, 500)}`,
    jobs.length > 0 && `Possible: ${jobs.map((j) => j.name).join(", ")}`,
  ].filter(Boolean);
  const number = business.smsHref.replace("sms:", "");
  return `sms:${number}?&body=${encodeURIComponent(lines.join("\n"))}`;
}
