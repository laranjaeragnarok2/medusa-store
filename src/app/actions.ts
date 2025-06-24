'use server';

import { getWaitlistCount } from '@/services/firebase';

export async function getInitialCount() {
    try {
        return await getWaitlistCount();
    } catch (error) {
        console.error("Failed to get initial count from Firestore:", error);
        return 0;
    }
}
