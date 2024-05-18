import axios from 'axios';
import { useState } from 'react';
import './App.css';

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  async function generateAnswer() {
    setAnswer("Loading...");
    try {
      const response = await axios.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyD7rSksN9lWtkqaDER3vcT50dPbEUYg5Ys", {
        contents: [
          { parts: [{ text: question }] }
        ]
      });
      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error("Error fetching answer:", error);
    }
  }

  return (
    <div className="app-container">
      <h1>Doctor-Patient Chatbot</h1>
      <div className="chat">
        <div className="message patient-message">
          <p className="text">Hello Doctor, I have a question...</p>
        </div>
        <div className="message doctor-message">
          <p className="text">Sure, go ahead and ask.</p>
        </div>
        {/* Display previous messages here */}
      </div>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type your question here..."
      ></textarea>
      <button onClick={generateAnswer}>Ask</button>
      <div className="answer-container">
        <p className="answer">{answer}</p>
      </div>
    </div>
  );
}

export default App;
