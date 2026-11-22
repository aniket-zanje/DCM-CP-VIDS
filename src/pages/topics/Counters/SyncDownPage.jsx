import React from 'react';
import StubTopicPage from '../../../components/StubTopicPage';

export default function SyncDownPage() {
  return (
    <StubTopicPage
      title="Synchronous Down Counter"
      description="All flip-flops are clocked simultaneously; count decreases on each clock."
      parentPath="/topics/counters"
      parentTitle="Counters"
      subtopics={[]}
    />
  );
}
