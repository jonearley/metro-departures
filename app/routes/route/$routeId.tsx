import { useLoaderData, Outlet, useParams } from "@remix-run/react";
import SelectRoute from '~/components/select-route'

export async function loader({ params }) {
  const directionsData = await fetch(`http://svc.metrotransit.org/NexTrip/Directions/${params.routeId}`, {
    headers: { "accept": "application/json" }
  }).then(resp => resp.json())

  return directionsData.map(direction => {
    return {
      id: direction["Value"],
      label: direction["Text"]
    }
  })
}

export default function Route() {
  const directions = useLoaderData()
  const { routeId } = useParams()

  return (
    <>
      <SelectRoute
        heading="Direction"
        items={directions}
        pathbase={`/route/${routeId}/direction`}
        paramId={'directionId'}
      />
      <Outlet />
    </>
  )
}

