import { useState } from "react"
import "./AITailor.css"

const SYSTEM_PROMPT = `You are an experienced boutique fashion consultant and master tailor AI named "The Tailor". 
Your personality is warm but professional — like a trusted boutique consultant, not a cheerful chatbot.
You help users refine their fashion design ideas and prepare detailed tailor briefs.

Your approach:
- Ask questions one at a time, never overwhelm the user
- Detect garment type from context (lehenga, saree, gown, blazer etc) and ask relevant questions only
- Give professional, confident responses
- After gathering enough information, generate a structured Tailor Brief
- If user mentions conflicting preferences, point it out politely
- Keep responses concise and elegant

When you have enough information, end your response with:
[BRIEF READY]
And then provide a structured tailor brief with these sections:
Garment, Silhouette, Neckline, Sleeves, Length, Fabric, Fit, Special Instructions`

function AITailor() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Good day. I'm The Tailor — your personal fashion consultant.\n\nI'm here to help you refine your design and prepare a brief your tailor will understand perfectly.\n\nTell me — what are you looking to create?"
    }
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [brief, setBrief] = useState(null)

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
            { role: "system", content: SYSTEM_PROMPT },
            ...updatedMessages
          ],
          max_tokens: 500
        })
      })
      const data = await response.json()
      const reply = data.choices[0].message.content

      if (reply.includes("[BRIEF READY]")) {
        const parts = reply.split("[BRIEF READY]")
        setMessages([...updatedMessages, { role: "assistant", content: parts[0].trim() }])
        setBrief(parts[1].trim())
      } else {
        setMessages([...updatedMessages, { role: "assistant", content: reply }])
      }
    } catch (err) {
      setMessages([...updatedMessages, { role: "assistant", content: "I apologise — something went wrong. Please try again." }])
    }
    setLoading(false)
  }

  return (
    <div className="tailor">
      <div className="tailor-header">
        <h2 className="tailor-title">✦ The Tailor</h2>
        <p className="tailor-subtitle">Your personal fashion consultant</p>
      </div>
      <div className="tailor-chat">
        {messages.map((msg, index) => (
          <div key={index} className={`tailor-message ${msg.role}`}>
            <p>{msg.content}</p>
          </div>
        ))}
        {loading && (
          <div className="tailor-message assistant">
            <p>The Tailor is thinking...</p>
          </div>
        )}
      </div>
      {brief && (
        <div className="tailor-brief">
          <h3>✦ Tailor Brief</h3>
          <pre>{brief}</pre>
        </div>
      )}
      <div className="tailor-input-area">
        <input
          className="tailor-input"
          type="text"
          placeholder="Describe your vision..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="tailor-btn" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  )
}

export default AITailor

