import React from 'react';
import StubTopicPage from '../../../components/StubTopicPage';

export default function DeMorganPage() {
  return (
    <StubTopicPage
      title="De Morgan's Theorems"
      description="Two fundamental rules for simplifying Boolean expressions involving NOT of AND and OR."
      parentPath="/topics/boolean-algebra"
      parentTitle="Boolean Algebra"
      subtopics={[]}
    />
  );
}
