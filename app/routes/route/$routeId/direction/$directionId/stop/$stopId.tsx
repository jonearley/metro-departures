import { useLoaderData, Link } from "@remix-run/react";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ params }) => {
  return await fetch(`http://svc.metrotransit.org/NexTrip/${params.routeId}/${params.directionId}/${params.stopId}`, {
      headers: { "accept": "application/json" }
    }).then(resp => resp.json())
}

export const meta: MetaFunction = ({ data }) => {
  try {
    const title = [
      data[0].Route,
      data[0].Description
    ].join(" ")
  
    return {
      title
    }
  } catch {
    return {
      title: "No departures at this time."
    }
  }
  
}

export default function Direction() {
  const departures = useLoaderData()

  return (
    <main className="main-departures">
      <table className="departures">
        <caption>
          <h1>Departures</h1>
          <p>Last updated: {new Date().toLocaleTimeString()} ( <Link to="">refresh</Link> ).</p>
        </caption>
        <thead>
          <tr>
            <th>
              Route
            </th>
            <th>
              Destination
            </th>
            <th>
              Departure
            </th>
          </tr>
        </thead>
        <tbody>
          {departures && departures.length > 0 ? (
            <>
              {departures.map(departure => (
                <tr>
                  <td>{departure.Route}</td>
                  <td>{departure.Description}</td>
                  <td>{departure.DepartureText}</td>
                </tr>
              ))}
            </>
          ) : (
            <>
              <tr>
                <td colSpan={3}>No departures at this time.</td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </main>
  )
}