import { useParams } from "react-router-dom"
import { useFetch } from "../hooks/useFetch"
import "./Details.css";

const Details = () => {
  const { id } = useParams();
  const url = `http://localhost:3004/clients/${id}`;

  const { data } = useFetch(url);

  return (
    <div>
      <h1 className="titleDetails">Detalhes do Cliente</h1> 
      <div>
        {data && (
          <div className="detailsContainer">
            <p>{data.name}</p>
            <p>{data.email}</p>
            <p>{data.phone}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Details
