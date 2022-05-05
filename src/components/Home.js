import './Home.css';
import { useState } from 'react';
import { useFetch } from "../hooks/useFetch";
import { Link } from 'react-router-dom';

const Home = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const url = "http://localhost:3004/clients";

  const { data, httpConfig } = useFetch(url);

  const handleSubmit = e => {
    e.preventDefault(e);

    if(name === "" || email === "" || phone === "") {
      alert("Preencha todos os campos!")
      return
    }

    const dataPerson = {
      name,
      email,
      phone
    }

    httpConfig(dataPerson, "POST");

    setName("");
    setEmail("");
    setPhone("");
  }

  const handleRemove = id => {
    console.log(`Index: ${id}`)

    httpConfig(id, "DELETE");
  }
  return (
    <div className="home">
      <h1 className="title">Agenda de Contatos</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input 
            type="text"
            name="text"
            placeholder="Nome do Cliente: "
            value={name}
            onChange={e => setName(e.target.value)}
            autoComplete="off"
          />
        </label>
        <label>
          <input 
            type="email"
            name="email"
            value={email}
            placeholder="E-mail do Cliente: "
            onChange={e => setEmail(e.target.value)}
            autoComplete="off"
          />
        </label>
        <label>
          <input 
            type="text"
            name="phone"
            value={phone}
            placeholder="Telefone do Cliente: "
            onChange={e => setPhone(e.target.value)}
            autoComplete="off"
          />
        </label>
        <label>
          <input 
            type="submit"
            name="submit"
            value="Cadastrar"
          />
        </label>
      </form>
      <table border="1">
        <thead>
          <tr>
            <td>Nome</td>
            <td>E-mail</td>
            <td>Celular</td>
            <td>Opções</td>
          </tr>
        </thead>
        <tbody>
          {data && data.map(person => (
            <tr key={person.id}>
              <td>{person.name}</td>
              <td>{person.email}</td>
              <td>{person.phone}</td>
              <td>
                <button onClick={() => handleRemove(person.id)}>X</button>
                <Link className="details" to={`/clients/${person.id}`}>+</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Home