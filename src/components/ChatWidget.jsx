
import { useState } from 'react'

const replies = [
  {
    words: ['price', 'cost', 'cheap'],
    answer: 'Check the Products page to find prices.'
  },
  {
    words: ['shipping', 'delivery'],
    answer: 'Free shipping is available for orders above ₹4,000.'
  },
  {
    words: ['warranty'],
    answer: 'You can check the warranty in product details.'
  },
  {
    words: ['return', 'refund', 'replace'],
    answer: 'This demo provides a 7-day replacement.'
  },
  {
    words: ['compare'],
    answer: 'Select up to 3 products to compare them.'
  },
  {
    words: ['hello', 'hi', 'hey'],
    answer: 'Hello! How can I help you?'
  }
]

function getReply(text) {
  const message = text.toLowerCase()

  for (const item of replies) {
    for (const word of item.words) {
      if (message.includes(word)) {
        return item.answer
      }
    }
  }

  return 'Please ask about price, delivery, warranty or compare.'
}

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [inputText, setInputText] = useState('')
  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: 'Hi! I am a demo shop assistant.'
    }
  ])

  function handleSend(event) {
    event.preventDefault()

    const text = inputText.trim()

    if (!text) return

    const userMessage = {
      from: 'user',
      text
    }

    const botMessage = {
      from: 'bot',
      text: getReply(text)
    }

    setMessages([...messages, userMessage, botMessage])
    setInputText('')
  }

  return (
    <div className="chat-widget">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div>
              <strong>Electronics Shop Assistant</strong>
              <small>Demo Assistant</small>
            </div>

            <button onClick={() => setIsOpen(false)}>
              ✕
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chat-msg ${message.from}`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <form className="chat-form" onSubmit={handleSend}>
            <input
              type="text"
              placeholder="Type a message..."
              value={inputText}
              onChange={(event) => setInputText(event.target.value)}
            />

            <button type="submit">Send</button>
          </form>
        </div>
      )}

      <button
        className="chat-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        💬
      </button>
    </div>
  )
}

export default ChatWidget
