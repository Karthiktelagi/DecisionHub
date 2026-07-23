import { useState, useEffect } from 'react';
import { decisions } from '../services/api';
import toast from 'react-hot-toast';

export const useDecisions = (filters = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDecisions = async () => {
      try {
        setLoading(true);
        const response = await decisions.getAll(filters);
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch decisions');
        toast.error('Failed to load decisions');
      } finally {
        setLoading(false);
      }
    };

    fetchDecisions();
  }, [JSON.stringify(filters)]);

  return { data, loading, error };
};

export const useDecision = (id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    
    const fetchDecision = async () => {
      try {
        setLoading(true);
        const response = await decisions.getById(id);
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch decision');
        toast.error('Failed to load decision details');
      } finally {
        setLoading(false);
      }
    };

    fetchDecision();
  }, [id]);

  return { data, loading, error };
};

export const useMyDecisions = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyDecisions = async () => {
      try {
        setLoading(true);
        const response = await decisions.getMyDecisions();
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch your decisions');
      } finally {
        setLoading(false);
      }
    };

    fetchMyDecisions();
  }, []);

  return { data, loading, error };
};
