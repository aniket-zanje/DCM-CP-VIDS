import React from 'react';
import StubTopicPage from '../../../components/StubTopicPage';

export default function TPage() {
  return (
    <StubTopicPage
      title="T Flip-Flop"
      description="Toggle flip-flop that changes state on each clock edge when T=1."
      parentPath="/topics/flip-flops"
      parentTitle="Flip-Flops"
      subtopics={[]}
    />
  );
}
