import { useEffect, useState } from 'react';

export function useSession() {
    const [sessionId, setSessionId] = useState<string>();

    useEffect(() => {
        const existingSession = localStorage.getItem('guest_session_id');

        if (existingSession) {
            setSessionId(existingSession);
        } else {
            fetch('/api/guest-session')
                .then(res => res.json())
                .then(data => {
                    localStorage.setItem('guest_session_id', data.sessionId);
                    setSessionId(data.sessionId);
                });
        }
    }, []);

    return sessionId;
}