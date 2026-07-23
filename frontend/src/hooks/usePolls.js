import { useState, useEffect } from 'react';
import { polls } from '../services/api';
import toast from 'react-hot-toast';

export const usePolls = (decisionId) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        setLoading(true);
        // If decisionId is provided, get polls for that decision, else get all active
        const response = decisionId 
          ? await polls.getByDecision(decisionId)
          : await polls.getActive();
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch polls');
        toast.error('Failed to load polls');
      } finally {
        setLoading(false);
      }
    };

    fetchPolls();
  }, [decisionId]);

  return { data, loading, error };
};

export const usePollResults = (pollId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pollId) return;
    
    const fetchResults = async () => {
      try {
        setLoading(true);
        const response = await polls.getResults(pollId);
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch poll results');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [pollId]);

  return { data, loading, error };
};
