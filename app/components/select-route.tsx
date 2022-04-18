import { Link, useParams } from "@remix-run/react";

type SelectRouteItem = {
  id: string,
  label: string
}

type SelectRouteProps = {
  heading: string,
  items: SelectRouteItem[],
  pathbase: string,
  paramId: string
}

export default function SelectRoute({
  heading, items, pathbase, paramId
}: SelectRouteProps) {
  const params = useParams()
  
  function getAriaCurrent(id: string) {
    if (id === params[paramId]) {
      return "page"
    }

    return "false"
  }
  
  return (
    <nav className="select-route">
      <h2>{heading}</h2>
      <ul>
        {items.map(({ id, label }) => (
          <li key={id}>
            <Link
              to={`${pathbase}/${id}`}
              aria-current={getAriaCurrent(id)}
            >{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}