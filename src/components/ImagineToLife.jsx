import { useState } from "react"
import "./ImagineToLife.css"

function ImagineToLife() {
  const [prompt, setPrompt] = useState("")
  const [imageUrls, setImageUrls] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const enrichPrompt = async (userPrompt) => {
    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "user",
              content: `You are a fashion design AI. Convert this simple outfit description into a detailed image generation prompt. Identify if it's South Asian, Western, fusion or fantasy. Always end with: "fashion mannequin, studio lighting, full length, white background, haute couture, professional fashion photography, highly detailed". Return only the prompt, nothing else. Description: ${userPrompt}`
            }
          ],
          max_tokens: 200
        })
      })
      const data = await response.json()
      console.log("Groq full:", JSON.stringify(data))
      return data.choices[0].message.content
    } catch (err) {
      console.log("LLM failed, using rule-based fallback")
      return ruleBased(userPrompt)
    }
  }

  const ruleBased = (userPrompt) => {
    const lower = userPrompt.toLowerCase()
    let cultural = lower.includes("lehenga") || lower.includes("saree") || lower.includes("anarkali") || lower.includes("kurta")
      ? "South Asian ethnic wear, intricate embroidery, Indian fashion, "
      : lower.includes("gown") || lower.includes("dress") || lower.includes("blazer")
      ? "Western fashion, contemporary design, "
      : "fusion fashion, global style, "
    let occasion = lower.includes("wedding") || lower.includes("bridal")
      ? "bridal, heavily embellished, luxurious, "
      : lower.includes("party") || lower.includes("festive")
      ? "festive, glamorous, "
      : ""
    return `${userPrompt}, ${cultural}${occasion}fashion mannequin, studio lighting, full length, white background, haute couture, professional fashion photography, highly detailed`
  }
  const generateImage = async () => {
    console.log("API KEY:", import.meta.env.VITE_GROQ_API_KEY)
    if (!prompt) return
    setLoading(true)
    setError(null)
    setImageUrls([])
    try {
      const enrichedPrompt = await enrichPrompt(prompt)
      console.log("Enriched prompt:", enrichedPrompt)
      const urls = [1].map((seed) =>
  `https://image.pollinations.ai/prompt/${encodeURIComponent(enrichedPrompt)}?seed=${seed}&width=768&height=1024&model=flux&enhance=true&nologo=true`
)
      setImageUrls(urls)
    } catch (err) {
      console.log("Error:", err)
      setError("Something went wrong. Please try again.")
    }
    setLoading(false)
  }

  return (
    <div className="imagine">
      <h2 className="imagine-heading">Imagine to Life</h2>
      <p className="imagine-subtext">Describe your outfit and watch it come alive</p>
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
      {error && <p className="imagine-error">{error}</p>}
      <div className="imagine-grid">
        {imageUrls.map((url, index) => (
          <img key={index} className="imagine-image" src={url} alt={`Design ${index + 1}`} />
        ))}
      </div>
    </div>
  )
}

export default ImagineToLife