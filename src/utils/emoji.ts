export const getTrendingEmoji = (genre: string): string => {
  const emojiMap: Record<string, string> = {
    'Trending': '🔥',
    'Mindset': '🧠',
    'Entrepreneurship': '🚀',
    'Wealth': '💰',
    'Technology': '💻',
    'AI & Tech': '🤖',
    'Web3': '⛓️',
    'Ecommerce': '🛍️',
    'Business': '💼',
    'Personal Growth': '🌱',
    'Motivation': '⚡',
    'Entertainment': '🎭'
  };
  
  return emojiMap[genre] || '';
};