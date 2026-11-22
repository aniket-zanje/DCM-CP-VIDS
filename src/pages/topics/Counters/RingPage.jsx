import React from 'react';
import StubTopicPage from '../../../components/StubTopicPage';

export default function RingPage() {
  return (
    <StubTopicPage
      title="Ring Counter"
      description="Single HIGH bit circulates through flip-flops on each clock pulse."
      parentPath="/topics/counters"
      parentTitle="Counters"
      subtopics={[]}
    />
  );
}
