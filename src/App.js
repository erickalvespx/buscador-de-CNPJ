//bloco de importações do código!
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import "./style.css";
import api from './services/api';

//foi utilizada uma função asycrona para caso de demora!
function App() {
  const [input, setInput] = useState(''); //pesquisar oq significa useState
  const [cnpj, setCNPJ] = useState({});  

  async function handleSearch() {

    //verificação de usuário, se ele tiver digitado o cep na tela  
    if(input === ''){
      alert("Preencha algum CEP!")
      return;
    }

    //se tudo der certo a função try será inicializada!
    try{
      const response = await api.get(`${input}`)
      setCNPJ(response.data)
      setInput("")
    }//caso o CEP não existir ou não estiver correto o catch irá rodar
    catch{
      alert("Erro ao buscar o CNPJ!")
      setInput("")
    }
  }

  return (
    <div className='container'>
      <h1 className='title'>Buscador de CNPJ</h1>

        <div className='containerInput'>
          <input 
      
          type="text"
          placeholder="Digite seu CNPJ..."
          value={input}
          onChange={(e) => setInput (e.target.value)} //pesquisar sobre oq é onChange!
          />
          
          
          <button className="buttonSearch" onClick={handleSearch}> 
            <FiSearch size={25} color="#FFF"/>
          </button> 
          
        </div>

        {Object.keys(cnpj).length > 0 && (
          <main className="main">
            <h3>Razão Social: {cnpj.razao_social}</h3>
            <span>Rua: {cnpj.logradouro}</span>
            <span>Data de Inicio: {cnpj.data_inicio_atividade}</span>
            <span>Complemento: {cnpj.complemento}</span>
            <span>Bairro: {cnpj.bairro}</span>
            <span>{cnpj.cep} - {cnpj.uf}</span>
          </main>
        )}
    </div>
  );
}

export default App;