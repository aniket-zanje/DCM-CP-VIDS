import React from 'react';
import StubTopicPage from '../../../components/StubTopicPage';

export default function SyncUpDownPage() {
  return (
    <StubTopicPage
      title="Synchronous Up-Down Counter"
      description="Can count in both directions controlled by an Up/Down select input."
      parentPath="/topics/counters"
      parentTitle="Counters"
      subtopics={[]}
    />
  );
}
