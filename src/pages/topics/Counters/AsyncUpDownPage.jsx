import React from 'react';
import StubTopicPage from '../../../components/StubTopicPage';

export default function AsyncUpDownPage() {
  return (
    <StubTopicPage
      title="Asynchronous Up-Down Counter"
      description="Ripple counter that can count both up and down."
      parentPath="/topics/counters"
      parentTitle="Counters"
      subtopics={[]}
    />
  );
}
