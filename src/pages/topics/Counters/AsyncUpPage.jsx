import React from 'react';
import StubTopicPage from '../../../components/StubTopicPage';

export default function AsyncUpPage() {
  return (
    <StubTopicPage
      title="Asynchronous (Ripple) Up Counter"
      description="Each flip-flop is clocked by the output of the previous; count ripples upward."
      parentPath="/topics/counters"
      parentTitle="Counters"
      subtopics={[]}
    />
  );
}
