import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '../components/auth/AuthContext';

export default function Index() {
  const { session } = useAuth();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {

    if ((!isMounted)) return;

    if (session) {
      router.replace('/movies');
    } else {
      router.replace('/login');
    }
  }, [session, isMounted, router]);

  return null;
}
