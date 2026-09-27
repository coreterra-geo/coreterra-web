import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate('/admin')
  }

  return <div className="login-shell">
    <aside className="login-aside">
      <Link className="login-brand" to="/" aria-label="Back to Coreterra home"><img src="/logo.png" alt="" width="48" height="48" /><span><strong>CORETERRA</strong><small>GEOENGINEERING</small></span></Link>
      <div className="login-aside-content">
        <p className="login-overline">ADMINISTRATION / 01</p>
        <h1>Make the ground<br /><em>legible.</em></h1>
        <p>Access the workspace for managing investigations, field records, analysis, and engineering recommendations.</p>
      </div>
      <div className="login-aside-footer"><span className="login-coordinate">07°47′S / 110°22′E</span><span className="login-status"><i /> SYSTEM READY</span></div>
      <div className="login-strata" aria-hidden="true"><span /><span /><span /><span /></div>
    </aside>

    <main className="login-main">
      <div className="login-main-top"><span>CORETERRA / INTERNAL</span><Link to="/">Return to website <b aria-hidden="true">↗</b></Link></div>
      <div className="login-form-wrap">
        <div className="login-heading"><p className="login-overline">SECURE ACCESS</p><h2>Welcome back.</h2><p>Sign in to continue to the Coreterra admin workspace.</p></div>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Work email</label>
          <input id="email" name="email" type="email" autoComplete="email" placeholder="name@company.com" />
          <div className="login-label-row"><label htmlFor="password">Password</label><a href="#forgot-password">Forgot password?</a></div>
          <div className="password-field"><input id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" placeholder="Enter your password" /><button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? 'Hide' : 'Show'}</button></div>
          <label className="remember"><input type="checkbox" name="remember" /><span>Keep me signed in</span></label>
          <button className="login-submit" type="submit">Enter workspace <span aria-hidden="true">↗</span></button>
        </form>
        <p className="login-help">Need access? <a href="mailto:admin.cge@coreterra-geo.com">Contact your Coreterra administrator</a></p>
      </div>
      <div className="login-main-bottom"><span>© {new Date().getFullYear()} Coreterra Geoengineering</span><span>Privacy &amp; security</span></div>
    </main>
  </div>
}

export default LoginPage
