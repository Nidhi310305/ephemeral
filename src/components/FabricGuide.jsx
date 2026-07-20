import { useState } from "react"
import "./FabricGuide.css"

const FABRIC_SYSTEM_PROMPT = `You are an expert fabric consultant with deep knowledge of textiles, both Indian and Western. 
Your personality is knowledgeable, warm, and precise — like a senior fabric specialist at a luxury boutique.

Your approach:
- Ask questions one at a time about the garment type, occasion, climate, budget, and care preference
- Give specific fabric recommendations with reasons
- Mention both Indian and Western fabric options where relevant
- Keep responses concise and elegant
- After gathering enough information, provide a final fabric recommendation

When ready to give final recommendation, start your response with [RECOMMENDATION] and provide:
- Primary fabric recommendation with reason
- Alternative fabric option
- Care instructions
- Where to source it`

function FabricGuide() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Welcome. I'm your fabric consultant.\n\nThe right fabric can make or break a garment. Let me help you choose wisely.\n\nWhat are you designing?"
    }
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [recommendation, setRecommendation] = useState(null)

  const sendMessage = async () => {
    if (!input.trim()) return
    const userMessage = { role: "user", content: input }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput("")
    setLoading(true)

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
            { role: "system", content: FABRIC_SYSTEM_PROMPT },
            ...updatedMessages
          ],
          max_tokens: 500
        })
      })
      const data = await response.json()
      const reply = data.choices[0].message.content

      if (reply.includes("[RECOMMENDATION]")) {
        const parts = reply.split("[RECOMMENDATION]")
        setMessages([...updatedMessages, { role: "assistant", content: parts[0].trim() }])
        setRecommendation(parts[1].trim())
      } else {
        setMessages([...updatedMessages, { role: "assistant", content: reply }])
      }
    } catch (err) {
      setMessages([...updatedMessages, { role: "assistant", content: "I apologise — something went wrong. Please try again." }])
    }
    setLoading(false)
  }

  return (
    <div className="fabric">
      <div className="fabric-header">
        <h2 className="fabric-title">✦ Fabric Guide</h2>
        <p className="fabric-subtitle">Expert fabric consultation for your design</p>
      </div>
      <div className="fabric-chat">
        {messages.map((msg, index) => (
          <div key={index} className={`fabric-message ${msg.role}`}>
            <p>{msg.content}</p>
          </div>
        ))}
        {loading && (
          <div className="fabric-message assistant">
            <p>Consulting fabric expertise...</p>
          </div>
        )}
      </div>
      {recommendation && (
        <div className="fabric-recommendation">
          <h3>✦ Fabric Recommendation</h3>
          <pre>{recommendation}</pre>
        </div>
      )}
      <div className="fabric-input-area">
        <input
          className="fabric-input"
          type="text"
          placeholder="Describe your garment or ask about fabrics..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="fabric-btn" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  )
}

export default FabricGuide
