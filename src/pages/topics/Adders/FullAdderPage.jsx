import React from 'react';
import StubTopicPage from '../../../components/StubTopicPage';

export default function FullAdderPage() {
  return (
    <StubTopicPage
      title="Full Adder"
      description="Adds three bits (A, B, Cin). Outputs: Sum and Carry-out."
      parentPath="/topics/adders"
      parentTitle="Adders"
      subtopics={[]}
    />
  );
}
