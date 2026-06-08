import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export default function PublicLayout() {
  const { pathname, hash } = useLocation()

  // Scroll to top on navigation, or to the anchor when a hash is present.
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo({ top: 0 })
  }, [pathname, hash])

  return (
    <div className="site">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
