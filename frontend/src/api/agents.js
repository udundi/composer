export async function generateIdea({ profession, topic }) {
  const res = await fetch('/api/agents/ideate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ profession, topic })
  });
  return (await res.json()).idea;
}

export async function generateCopy({ idea, tone, jobCategory }) {
  const res = await fetch('/api/agents/copy', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idea, tone, jobCategory })
  });
  return (await res.json()).text;
}

export async function suggestMedia({ idea, copy }) {
  const res = await fetch('/api/agents/media', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idea, copy })
  });
  return (await res.json()).mediaType;
}

export async function scorePost({ idea, copy, mediaType }) {
  const res = await fetch('/api/agents/score', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idea, copy, mediaType })
  });
  return (await res.json()).score;
}