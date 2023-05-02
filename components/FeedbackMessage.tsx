import { FEEDBACKS, isFeedbackKey } from '@/lib/feedback';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import React from 'react';

export function FeedbackMessage() {
  const router = useRouter();
  const feedbackKey = router.query.feedback;

  React.useEffect(() => {
    if (isFeedbackKey(feedbackKey)) {
      const feedback = FEEDBACKS[feedbackKey];
      enqueueSnackbar(feedback.text, {
        variant: feedback.type,
      });

      // Remove the 'feedback' query parameter
      const newQuery = { ...router.query };
      delete newQuery.feedback;
      const newUrl = {
        pathname: router.pathname,
        query: newQuery,
      };
      router.replace(newUrl, undefined, { shallow: true });
    }
  }, [feedbackKey, router]);

  return null;
}
