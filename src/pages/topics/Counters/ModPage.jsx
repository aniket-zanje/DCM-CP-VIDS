import React from 'react';
import StubTopicPage from '../../../components/StubTopicPage';

export default function ModPage() {
  return (
    <StubTopicPage
      title="Mod Counter (Modulo Counter)"
      description="A counter that resets after a specified modulus count."
      parentPath="/topics/counters"
      parentTitle="Counters"
      subtopics={[]}
    />
  );
}
