import React from 'react';
import StubTopicPage from '../../../components/StubTopicPage';

export default function HalfSubPage() {
  return (
    <StubTopicPage
      title="Half Subtractor"
      description="Subtracts two bits. Outputs: Difference = A ⊕ B, Borrow = A'B."
      parentPath="/topics/subtractors"
      parentTitle="Subtractors"
      subtopics={[]}
    />
  );
}
