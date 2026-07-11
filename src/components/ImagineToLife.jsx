import {useState} from "react"
import "./ImagineToLife.css"

function ImagineToLife(){
    const[prompt,setPrompt]=useState("")
    const[imageUrl,setImageUrl]=useState(null)
    const[loading,setLoading]=useState(false)

const generateImage= () => {
    if(!prompt) return
    setLoading(true)
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`
    setImageUrl(url)
    setLoading(false)
    
    }
return(
    <div className="imagine">
      <h2 className="imagine-heading">Imagine to Life</h2>
      <p className="imagine-subtext">Describe your dream outfit and watch it come alive</p>
      <input
        className="imagine-input"
        type="text"
        placeholder="A royal blue lehenga with gold embroidery..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button className="imagine-btn" onClick={generateImage}>
        {loading ? "Generating..." : "Generate Design"}
      </button>
      {imageUrl && (
        <img className="imagine-image" src={imageUrl} alt="Generated design" />
      )}
    </div>  
)
}
export default ImagineToLife  
