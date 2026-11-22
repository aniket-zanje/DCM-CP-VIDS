import React from 'react';
import StubTopicPage from '../../../components/StubTopicPage';

export default function AsyncDownPage() {
  return (
    <StubTopicPage
      title="Asynchronous (Ripple) Down Counter"
      description="Ripple counter that counts downward from a preset value."
      parentPath="/topics/counters"
      parentTitle="Counters"
      subtopics={[]}
    />
  );
}
