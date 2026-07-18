import { useState, useEffect } from "react"
import "./MyCollection.css"

function MyCollection() {
  const [collection, setCollection] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem("ephemeral-collection")
    if (saved) {
      setCollection(JSON.parse(saved))
    }
  }, [])

  const removeDesign = (index) => {
    const updated = collection.filter((_, i) => i !== index)
    setCollection(updated)
    localStorage.setItem("ephemeral-collection", JSON.stringify(updated))
  }

  return (
    <div className="collection">
      <h2 className="collection-heading">My Collection</h2>
      <p className="collection-subtext">Your saved designs live here</p>
      {collection.length === 0 ? (
        <p className="collection-empty">No designs saved yet. Go imagine something beautiful.</p>
      ) : (
        <div className="collection-grid">
          {collection.map((item, index) => (
            <div key={index} className="collection-card">
              <img src={item.imageUrl} alt={item.prompt} className="collection-image" />
              <p className="collection-prompt">{item.prompt}</p>
              <button className="collection-remove" onClick={() => removeDesign(index)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyCollection
