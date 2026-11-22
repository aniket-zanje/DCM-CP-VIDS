import React from 'react';
import StubTopicPage from '../../../components/StubTopicPage';

export default function SyncUpPage() {
  return (
    <StubTopicPage
      title="Synchronous Up Counter"
      description="All flip-flops are clocked simultaneously; count increases on each clock."
      parentPath="/topics/counters"
      parentTitle="Counters"
      subtopics={[]}
    />
  );
}
