import { useState } from "react";
import {
  business,
  faq,
  promises,
  repairs,
  services,
  warrantyTerms,
} from "../content";
import { laborRange, matchJobs, smsLink } from "../estimate";
import type { EstimatorJob } from "../content";

export function Services() {
  return (
    <section id="services" className="section" aria-labelledby="services-h">
      <div className="wrap">
        <h2 id="services-h" className="section__title">
          Roadside rescue, flat rates
        </h2>
        <p className="section__lede">
          Posted prices for the common calls. Anything bigger gets a written price before we start.
        </p>
        <ul className="rates">
          {services.map((s) => (
            <li key={s.name} className="rates__row">
              <span>{s.name}</span>
              <strong>{s.price}</strong>
            </li>
          ))}
        </ul>
        <h3 className="section__sub">Repairs at your door</h3>
        <ul className="chips">
          {repairs.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Promises() {
  return (
    <section id="promises" className="section section--alt" aria-labelledby="promises-h">
      <div className="wrap">
        <h2 id="promises-h" className="section__title">
          Our promises
        </h2>
        <div className="promises">
          {promises.map((p) => (
            <article key={p.title} className="promise">
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </article>
          ))}
        </div>
        <details className="terms">
          <summary>Full warranty terms</summary>
          <h4>What is covered</h4>
          <p>{warrantyTerms.covered}</p>
          <h4>Who is covered</h4>
          <p>{warrantyTerms.who}</p>
          <h4>How to make a claim</h4>
          <p>{warrantyTerms.claim}</p>
          <h4>What is not covered</h4>
          <ul>
            {warrantyTerms.excluded.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <h4>Limits on our liability</h4>
          <p>{warrantyTerms.liability}</p>
          <h4>Payment</h4>
          <p>{warrantyTerms.payment}</p>
          <h4>Declined work</h4>
          <p>{warrantyTerms.declined}</p>
        </details>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" className="section section--alt" aria-labelledby="faq-h">
      <div className="wrap wrap--narrow">
        <h2 id="faq-h" className="section__title">
          Questions
        </h2>
        {faq.map((f) => (
          <details key={f.q} className="faq">
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function Contact() {
  const [vehicle, setVehicle] = useState("");
  const [issue, setIssue] = useState("");
  const [result, setResult] = useState<{ jobs: EstimatorJob[]; issue: string; vehicle: string } | null>(null);
  const [error, setError] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (issue.trim().length < 3) {
      setError("Tell us what the car is doing first.");
      setResult(null);
      return;
    }
    setError("");
    setResult({ jobs: matchJobs(issue), issue, vehicle });
  };

  const fixed = result?.jobs.filter((j) => j.fixed) ?? [];
  const labor = result?.jobs.filter((j) => !j.fixed) ?? [];
  const range = result ? laborRange(result.jobs) : null;

  return (
    <section id="contact" className="section" aria-labelledby="contact-h">
      <div className="wrap wrap--split">
        <div>
          <h2 id="contact-h" className="section__title">
            Get a rough price before we roll
          </h2>
          <p className="section__lede">
            Tell us what the car is doing. You get a rough idea right away, and the real price in
            writing before any work starts. Serving {business.area}.
          </p>
          <p>
            <a className="btn btn--primary" href={business.phoneHref}>
              Call {business.phoneDisplay}
            </a>{" "}
            <a className="btn" href={business.smsHref}>
              Text us
            </a>
          </p>
          <p className="muted">
            Email: <a href={`mailto:${business.email}`}>{business.email}</a>
          </p>
        </div>
        <div>
          <form className="form" onSubmit={onSubmit} noValidate>
            <label>
              Year, make, model
              <input
                name="vehicle"
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                placeholder="2014 Honda Accord"
                autoComplete="off"
              />
            </label>
            <label>
              What is the car doing?
              <textarea
                name="issue"
                rows={4}
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                placeholder="Grinding noise when I brake, worse in the cold"
                aria-describedby="issue-err"
                maxLength={600}
              />
            </label>
            <p id="issue-err" role="alert" className="form__status">
              {error}
            </p>
            <button className="btn btn--primary" type="submit">
              Get a rough estimate
            </button>
          </form>

          <div className="estimate" aria-live="polite">
            {result && (
              <>
                {result.jobs.length > 0 ? (
                  <>
                    <h3 className="estimate__h">Sounds like</h3>
                    <ul className="chips">
                      {result.jobs.map((j) => (
                        <li key={j.id}>{j.name}</li>
                      ))}
                    </ul>
                    {fixed.length > 0 && (
                      <ul className="rates estimate__rates">
                        {fixed.map((j) => (
                          <li key={j.id} className="rates__row">
                            <span>{j.name}</span>
                            <strong>{j.fixed}</strong>
                          </li>
                        ))}
                      </ul>
                    )}
                    {labor.length > 0 &&
                      (range ? (
                        <p className="estimate__line">
                          Labor: <strong>${range[0]}–${range[1]}</strong>. Parts are extra and quoted
                          separately.
                        </p>
                      ) : (
                        <p className="estimate__line">
                          We will text you a price for this one. It depends on your vehicle.
                        </p>
                      ))}
                  </>
                ) : (
                  <p className="estimate__line">
                    Not sure from that description, which is normal. Send it over and you will get a
                    straight answer.
                  </p>
                )}
                <p className="muted estimate__fine">
                  A rough guide from your description, not a diagnosis or a quote. The firm price is
                  given in writing before any work starts.
                </p>
                <p>
                  <a
                    className="btn btn--primary"
                    href={smsLink(result.vehicle, result.issue, result.jobs)}
                  >
                    Text this to Sebastian
                  </a>{" "}
                  <a className="btn" href={business.phoneHref}>
                    Call instead
                  </a>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <p>
          {business.name}. {business.tagline}.
        </p>
      </div>
    </footer>
  );
}
