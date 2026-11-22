import React from 'react';
import StubTopicPage from '../../../components/StubTopicPage';

export default function FullSubPage() {
  return (
    <StubTopicPage
      title="Full Subtractor"
      description="Subtracts three bits (A, B, Bin). Outputs: Difference and Borrow-out."
      parentPath="/topics/subtractors"
      parentTitle="Subtractors"
      subtopics={[]}
    />
  );
}
