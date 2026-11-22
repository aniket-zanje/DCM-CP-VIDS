import React from 'react';
import StubTopicPage from '../../../components/StubTopicPage';

export default function HalfAdderPage() {
  return (
    <StubTopicPage
      title="Half Adder"
      description="Adds two single bits. Outputs: Sum = A ⊕ B, Carry = A · B."
      parentPath="/topics/adders"
      parentTitle="Adders"
      subtopics={[]}
    />
  );
}
