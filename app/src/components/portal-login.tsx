'use client';

import { useRef, useState } from 'react';
import './portal-login.css';

export function PortalLogin() {
  const [attempted, setAttempted] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const cookies = useRef<HTMLDialogElement>(null);
  const recovery = useRef<HTMLDialogElement>(null);

  return (
    <div className="portal-page">
      <a className="portal-sr-only portal-skip-link" href="#maincontent">Skip to main content</a>
      <section className="portal-region" aria-label="Content">
        <div className="portal-wrapper">
          <div className="portal-container">
            <div role="main" id="maincontent">
              <div className="portal-card">
                <div className="portal-column">
              <div className="portal-logo">
                <img src="/portal/kyu-logo.png" width="1050" height="1074" alt="KyU Masomo Portal" />
                <h1 className="portal-sr-only">Log in to KyU Masomo Portal</h1>
              </div>
              <div className="portal-maintenance" role="status" aria-live="polite">
                The site is undergoing maintenance and is currently not available
                {attempted && <span className="portal-attempt">Please try logging in again when maintenance is complete.</span>}
              </div>
              <form className="portal-login-form" onSubmit={event => { event.preventDefault(); setAttempted(true); }}>
                <div className="portal-form-group">
                  <label className="portal-sr-only" htmlFor="username">Username</label>
                  <input type="text" id="username" name="username" placeholder="Username" autoComplete="username" />
                </div>
                <div className="portal-form-group">
                  <label className="portal-sr-only" htmlFor="password">Password</label>
                  <input type="password" id="password" name="password" placeholder="Password" autoComplete="current-password" />
                </div>
                <div className="portal-form-group">
                  <button className="portal-login-button" type="submit">Log in</button>
                </div>
                <div className="portal-form-group portal-forgot">
                  <a href="#lost-password" onClick={event => { event.preventDefault(); setResetSent(false); recovery.current?.showModal(); }}>Lost password?</a>
                </div>
              </form>
              <form className="portal-guest-form" action="/dashboard/">
                <button className="portal-guest-button" type="submit">Access as a guest</button>
              </form>
              <div className="portal-cookie-row">
                <button className="portal-cookie-button" type="button" onClick={() => cookies.current?.showModal()}>
                  <span className="portal-question" aria-hidden="true">?</span> Cookies notice
                </button>
              </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <dialog className="portal-dialog" ref={cookies} aria-labelledby="cookies-heading" onClick={event => { if (event.target === event.currentTarget) cookies.current?.close(); }}>
        <h2 id="cookies-heading">Cookies notice</h2>
        <p>This site uses cookies to keep you signed in and remember your username. Essential session cookies must be enabled in your browser to use the portal.</p>
        <button type="button" onClick={() => cookies.current?.close()}>Close</button>
      </dialog>
      <dialog className="portal-dialog" ref={recovery} aria-labelledby="recovery-heading" onClick={event => { if (event.target === event.currentTarget) recovery.current?.close(); }}>
        <h2 id="recovery-heading">Lost password?</h2>
        <p>Password recovery is currently unavailable while the portal is undergoing maintenance. Please try again when maintenance is complete.</p>
        <form onSubmit={event => { event.preventDefault(); setResetSent(true); }}>
          <label htmlFor="recovery-username">Username or email address</label>
          <input id="recovery-username" name="username" required />
          {resetSent && <p role="status">Your password has not been changed. Please return after maintenance to reset it.</p>}
          <div className="portal-dialog-actions">
            <button type="button" onClick={() => recovery.current?.close()}>Close</button>
            <button type="submit">Continue</button>
          </div>
        </form>
      </dialog>
    </div>
  );
}
