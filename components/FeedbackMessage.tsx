import { useRouter } from 'next/router';

export function FeedbackMessage() {
  const router = useRouter();
  const feedback = router.query.feedback;

  //TODO use snackbar
  if (feedback) {
    return (
      <div className="feedback">
        <p>{feedback}</p>
      </div>
    );
  }

  return null;
}
