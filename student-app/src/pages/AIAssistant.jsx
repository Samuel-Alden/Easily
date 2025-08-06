import AppLayout from '../components/AppLayout';
import { useState } from 'react';

function AIAssistant() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const callAI = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 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',
    'HTTP-Referer': 'http://localhost:5173', // replace this with your domain when deployed
    'X-Title': 'StudentHelperApp' // your app name
  },
  body: JSON.stringify({
    model: 'mistralai/mistral-7b-instruct', // or other free model
    messages: [{ role: 'user', content: input }]
  })
});
      const data = await res.json();
      console.log(data);
      setResponse(data.choices?.[0]?.message?.content || 'No response');
    } catch (err) {
      console.error(err);
      setResponse('Error contacting AI.');
    }

    setLoading(false);
  };

  return (
    <AppLayout>
      <h2>🤖 AI Assistant</h2>
      <textarea
        placeholder="Ask me anything..."
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={4}
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />
      <br />
      <button onClick={callAI} disabled={loading}>
        {loading ? 'Thinking...' : 'Ask'}
      </button>
      <div style={{ marginTop: '20px', whiteSpace: 'pre-wrap' }}>
        <strong>Response:</strong>
        <p>{response}</p>
      </div>
    </AppLayout>
  );
}

export default AIAssistant;
