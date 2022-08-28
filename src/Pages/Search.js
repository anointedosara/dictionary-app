import React, { useEffect, useState } from "react";

function Search() {
  const [search, setSearch] = useState("welcome");
  const [Wordinformation, setinformation] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = async e => {
    setLoading(true);
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${search}`)
      .then(data => data.json())
      .then(data => {
        console.log(data);
        setinformation(data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="search">
      <form onSubmit={e => e.preventDefault()}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button type="submit" onClick={loadData}>
          Search
        </button>
      </form>

      {Wordinformation.length && !loading ? (
        <>
          {Wordinformation?.map((info, i) => 
            <div className="details" key={i}>
              <h1>{info.word}</h1>
              <p>{info.phonetic}</p>
              <p>Pronounce:</p>

              {info?.phonetics.map(
                (phonetic, i) =>
                  phonetic?.audio && (
                    <audio key={i} controls>
                      <source src={phonetic?.audio} type="audio/ogg" />
                    </audio>
                  ),
              )}

              {info.meanings.map((meaning, i) => (
                <div key={i}>
                  <h2>{meaning.partOfSpeech.toUpperCase()}:-</h2>
                  <ul>
                    {meaning.definitions.map((def, i) => (
                      <li key={i}>{def.definition}</li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="info-btn">
                <button>
                  <a href={info.sourceUrls[0]}>More Info</a>
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        !loading &&
        !Wordinformation.length && (
          <div className="error">
            <h1>{Wordinformation.title}</h1>
            <p>
              {Wordinformation.message} {Wordinformation.resolution}
            </p>
          </div>
        )
      )}

      <div className="btn-div">
        <button>
          <a href="https://github.com/anointedosara?tab=repositories">
            @Anointedosara 2022
          </a>
        </button>
      </div>
    </div>
  );
}

export default Search;
