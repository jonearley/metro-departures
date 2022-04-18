import { useLoaderData, Outlet, Link, useParams } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import SelectRoute from "~/components/select-route"

export const loader: LoaderFunction = async ({ params }) => {
  const stopsData = await fetch(`https://svc.metrotransit.org/nextripv2/stops/${params.routeId}/${params.directionId}`, {
    headers: { "accept": "application/json" }
  }).then(resp => resp.json())

  return stopsData.map((stop: { place_code: string; description: string; }) => {
    return {
      id: stop.place_code,
      label: stop.description
    }
  })
}

export default function Direction() {
  const stops = useLoaderData() 
  const { routeId, directionId } = useParams()

  return (
    <>
      <SelectRoute
        heading="Stop"
        items={stops}
        pathbase={`/route/${routeId}/direction/${directionId}/stop`}
        paramId={'stopId'}
      />
      <Outlet />
    </>
  )
}