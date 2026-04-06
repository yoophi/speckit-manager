import type { JSX } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'

function HomePage(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="creator">Powered by electron-vite</div>
      <div className="text">
        Build an Electron app with <span className="react">React</span>
        &nbsp;and <span className="ts">TypeScript</span>
      </div>
      <p className="tip">
        Please try pressing <code>F12</code> to open the devTool
      </p>
      <div className="actions">
        <div className="action">
          <Link to="/settings">Settings Route</Link>
        </div>
      </div>
      <div className="actions">
        <div className="action">
          <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">
            Documentation
          </a>
        </div>
        <div className="action">
          <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
            Send IPC
          </a>
        </div>
      </div>
      <Versions></Versions>
    </>
  )
}

function SettingsPage(): JSX.Element {
  return (
    <>
      <div className="creator">React Router Initialized</div>
      <div className="text">Settings</div>
      <p className="tip">
        This route is rendered through <code>HashRouter</code>, which is the safer default for
        Electron.
      </p>
      <div className="actions">
        <div className="action">
          <Link to="/">Back Home</Link>
        </div>
      </div>
    </>
  )
}

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  )
}

export default App
