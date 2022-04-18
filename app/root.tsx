import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
  useLoaderData,
  useParams
} from "@remix-run/react";
import globalStyles from "./styles/global.css"
import SelectRoute from "./components/select-route";

export const links = () => ([
  {
    rel: "preconnect",
    href: "https://fonts.googleapis.com"
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "true"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Ropa+Sans:ital@0;1&display=swap"
  },
  {
    rel: "stylesheet",
    href: globalStyles
  },
  {
    rel: "icon",
    href: `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚎</text></svg>`
  }
])

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "METRO departures",
  viewport: "width=device-width,initial-scale=1",
});

export async function loader() {
  const response = await fetch("https://svc.metrotransit.org/nextripv2/routes")
  const OK = response["status"] === 200

  if (OK) {
    const routesData = await response.json()

    return routesData.map((item: { route_id: string; route_label: string; }) => {
      return {
        id: item.route_id,
        label: item.route_label
      }
    });
  }

  return undefined
}

function IssuePage() {
  return (
    <Layout>
      <main className="app-error">
        <p aria-hidden="true" style={{ fontSize: '3rem' }}>🚆 🚎</p>
        <h1>Oh, no. We're not getting you there.</h1>
        <p>Somehow the route, direction, or stop doesn't add up to departures.</p>
        <p><Link to="/" style={{ fontSize: "1.25rem", padding: "0.5rem" }}>Start from routes and try again</Link></p>
      </main>
    </Layout>
  )
}

export function ErrorBoundary() {
  return <IssuePage />
}

export function CatchBoundary() {
  return <IssuePage />
}

type LayoutProps = {
  children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
    <head>
      <Meta />
      <Links />
    </head>
    <body>
      <div className="app-layout">
        <header className="app-header">
          <Link className="app-name" to="/">Minneapolis METRO departures</Link>
        </header>
        {children}
      </div>
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </body>
  </html>
  )
}

export default function App() {
  const routes = useLoaderData();

  return (
    <Layout>
      <SelectRoute
        heading="Route"
        items={routes}
        pathbase={`/route`}
        paramId={'routeId'}
      />
      <Outlet />
    </Layout>
  );
}