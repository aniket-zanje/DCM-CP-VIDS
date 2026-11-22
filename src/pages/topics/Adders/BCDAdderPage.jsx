import React from 'react';
import StubTopicPage from '../../../components/StubTopicPage';

export default function BCDAdderPage() {
  return (
    <StubTopicPage
      title="BCD Adder"
      description="Adds two BCD digits and corrects invalid sums by adding 6."
      parentPath="/topics/adders"
      parentTitle="Adders"
      subtopics={[]}
    />
  );
}
