import React from 'react';
import StubTopicPage from '../../../components/StubTopicPage';

export default function MasterSlavePage() {
  return (
    <StubTopicPage
      title="Master-Slave Flip-Flop"
      description="Two cascaded flip-flops eliminating the race-around condition."
      parentPath="/topics/flip-flops"
      parentTitle="Flip-Flops"
      subtopics={[]}
    />
  );
}
