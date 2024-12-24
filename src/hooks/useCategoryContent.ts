import { useState, useCallback } from 'react';
import { getCategoryContent } from '../services/knowledge';
import type { KnowledgeSummary, KnowledgeHighlight, KnowledgeTopic, KnowledgeNote } from '../types/knowledge';

export const useCategoryContent = (categoryId: string) => {
  const [summaries, setSummaries] = useState<KnowledgeSummary[]>([]);
  const [highlights, setHighlights] = useState<KnowledgeHighlight[]>([]);
  const [topics, setTopics] = useState<KnowledgeTopic[]>([]);
  const [notes, setNotes] = useState<KnowledgeNote[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadContent = useCallback(async () => {
    if (!categoryId) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const { summaries: s, highlights: h, topics: t, notes: n } = await getCategoryContent(categoryId);
      setSummaries(s);
      setHighlights(h);
      setTopics(t);
      setNotes(n);
    } catch (error) {
      console.error('Error loading category content:', error);
      setError('Failed to load content');
    } finally {
      setIsLoading(false);
    }
  }, [categoryId]);

  return {
    summaries,
    highlights,
    topics,
    notes,
    isLoading,
    error,
    loadContent
  };
};

export default useCategoryContent;