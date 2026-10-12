import { useState } from "react";
import {
  business,
  estimateFormEndpoint,
  faq,
  promises,
  repairs,
  services,
  warrantyTerms,
} from "../content";

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
  const [status, setStatus] = useState<string>("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!estimateFormEndpoint) {
      setStatus(
        "This form is not connected yet, so nothing was sent. Please call or text instead."
      );
      return;
    }
    // Wire a real endpoint via estimateFormEndpoint in src/content.ts.
  };

  return (
    <section id="contact" className="section" aria-labelledby="contact-h">
      <div className="wrap wrap--split">
        <div>
          <h2 id="contact-h" className="section__title">
            Get a price before we roll
          </h2>
          <p className="section__lede">
            Serving {business.area}. Call or text for the fastest answer.
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
        <form className="form" onSubmit={onSubmit} noValidate>
          <label>
            Name
            <input name="name" autoComplete="name" required />
          </label>
          <label>
            Phone
            <input name="phone" type="tel" autoComplete="tel" required />
          </label>
          <label>
            What is the car doing?
            <textarea name="issue" rows={4} />
          </label>
          <button className="btn btn--primary" type="submit">
            Request an estimate
          </button>
          <p role="status" className="form__status">
            {status}
          </p>
        </form>
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
